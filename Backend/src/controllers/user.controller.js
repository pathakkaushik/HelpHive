import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { UserRolesEnum, WorkerAvailabilityEnum } from "../constants.js";
import { validateDocumentWithAI } from "../utils/aiDocumentScanner.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // 1. Destructure all new fields from the body
    const { 
        fullName, email, password, role, phone,
        street, city, state, zipCode, // Address fields
        primaryService, experience 
    } = req.body;
  
    // 2. Update validation
    if (
        [fullName, email, password, role, phone, street, city, state, zipCode].some((field) => field === undefined || field === null || String(field).trim() === "")
    ) {
      throw new ApiError(400, "All required fields must be filled: Name, Email, Password, Role, Phone, and full Address.");
    }
  
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(409, "User with this email already exists");
    }
  
    const profileImageLocalPath = req.files?.profileImage?.[0]?.path;
    let profileImage = null;
    if (profileImageLocalPath) {
      profileImage = await uploadOnCloudinary(profileImageLocalPath);
    }
  
    const isWorker = role === UserRolesEnum.WORKER;
  
    // 3. Construct the create payload with the new address object
    const createPayload = {
      fullName,
      email,
      password,
      role,
      phone,
      address: { street, city, state, zipCode },
      profileImage: profileImage?.url || "", 
      
      // Worker specific fields
      primaryService: isWorker ? primaryService : undefined,
      experience: isWorker ? experience : undefined,
      availability: isWorker ? WorkerAvailabilityEnum.AVAILABLE : undefined,
      galleryImages: [],
    };
  
    const user = await User.create(createPayload);
  
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
  
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, "Email and password are required");
  
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User does not exist");
  
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
  
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully"));
});
  
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true });
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");
    
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user) throw new ApiError(401, "Invalid refresh token");
        if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh token is expired or used");

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options)
          .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User details fetched successfully"));
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { 
        fullName, tagline, description, skills, availability,
        street, city, state, zipCode,
        rate, per
    } = req.body;
    const userId = req.user._id;

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
        throw new ApiError(404, "User not found");
    }

    // --- Universal Fields (for both USER and WORKER) ---
    if (fullName) userToUpdate.fullName = fullName;

    if (street && city && state && zipCode) {
        userToUpdate.address = { street, city, state, zipCode };
    }

    if (req.files?.profileImage?.[0]) {
        const newProfileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
        if (newProfileImage?.url) {
            userToUpdate.profileImage = newProfileImage.url;
        }
    }

    // --- Worker-Only Fields ---
    if (userToUpdate.role === UserRolesEnum.WORKER) {
        // Allow setting optional fields to an empty string
        if (tagline !== undefined) userToUpdate.tagline = tagline;
        if (description !== undefined) userToUpdate.description = description;

        if (typeof skills === 'string') {
            userToUpdate.skills = skills.split(',').map(skill => skill.trim()).filter(Boolean);
        }
        if (typeof availability === 'string' && Object.values(WorkerAvailabilityEnum).includes(availability)) {
            userToUpdate.availability = availability;
        }

        // Allow clearing the price
        if (rate !== undefined && per !== undefined) {
            userToUpdate.pricing = { rate: Number(rate) || 0, per };
        }

        if (req.files && req.files.galleryImages) {
            const existingImages = Array.isArray(userToUpdate.galleryImages) ? userToUpdate.galleryImages : [];
            const maxAllowed = 5 - existingImages.length;
            if (maxAllowed <= 0) {
                // Skip uploading — already at max
            } else {
                const filesToUpload = req.files.galleryImages.slice(0, maxAllowed);
                const uploadedImageUrls = [];
                for (const file of filesToUpload) {
                    const uploadedImage = await uploadOnCloudinary(file.path);
                    if (uploadedImage) uploadedImageUrls.push(uploadedImage.url);
                }
                userToUpdate.galleryImages = [...existingImages, ...uploadedImageUrls];
            }
        }
    }
    
    await userToUpdate.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(userId).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

// Add the new controller for verification documents
const updateVerificationDocuments = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (req.user.role !== UserRolesEnum.WORKER) {
        throw new ApiError(403, "Only workers can upload verification documents.");
    }

    const worker = await User.findById(userId);
    if (!worker) {
        throw new ApiError(404, "Worker not found");
    }

    if (!worker.verificationDocuments) {
        worker.verificationDocuments = {};
    }

    // Handle ID Proof upload
    if (req.files?.idProof?.[0]) {
        const file = req.files.idProof[0];
        const aiCheck = await validateDocumentWithAI(file.path, file.originalname, "ID Proof (Aadhaar / Voter ID)");
        if (!aiCheck.isValid) {
            throw new ApiError(400, `AI Scanner Rejected ID Proof: ${aiCheck.reason}`);
        }
        const idProofUpload = await uploadOnCloudinary(file.path);
        if (idProofUpload?.url) {
            worker.verificationDocuments.idProof = idProofUpload.url;
        }
    }

    // Handle Police Verification upload
    if (req.files?.policeVerification?.[0]) {
        const file = req.files.policeVerification[0];
        const aiCheck = await validateDocumentWithAI(file.path, file.originalname, "Police Verification Certificate");
        if (!aiCheck.isValid) {
            throw new ApiError(400, `AI Scanner Rejected Police Certificate: ${aiCheck.reason}`);
        }
        const policeUpload = await uploadOnCloudinary(file.path);
        if (policeUpload?.url) {
            worker.verificationDocuments.policeVerification = policeUpload.url;
        }
    }

    // Handle PAN Card upload
    if (req.files?.panCard?.[0]) {
        const file = req.files.panCard[0];
        const aiCheck = await validateDocumentWithAI(file.path, file.originalname, "PAN Card");
        if (!aiCheck.isValid) {
            throw new ApiError(400, `AI Scanner Rejected PAN Card: ${aiCheck.reason}`);
        }
        const panUpload = await uploadOnCloudinary(file.path);
        if (panUpload?.url) {
            worker.verificationDocuments.panCard = panUpload.url;
        }
    }

    await worker.save({ validateBeforeSave: false });
    const updatedWorker = await User.findById(userId).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedWorker, "Documents uploaded successfully."));
});

// Delete a specific gallery image
const deleteGalleryImage = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { imageUrl } = req.body;

    if (!imageUrl) {
        throw new ApiError(400, "Image URL is required.");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const existingImages = Array.isArray(user.galleryImages) ? user.galleryImages : [];
    const filteredImages = existingImages.filter(img => img !== imageUrl);

    if (filteredImages.length === existingImages.length) {
        throw new ApiError(404, "Image not found in your gallery.");
    }

    user.galleryImages = filteredImages;
    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(userId).select("-password -refreshToken");
    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Gallery image deleted successfully."));
});

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser, 
    updateUserProfile,
    updateVerificationDocuments,
    deleteGalleryImage,
};