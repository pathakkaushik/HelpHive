import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { UserRolesEnum } from "../constants.js";

// Helper function to generate tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const {
    fullName,
    email,
    password,
    role, // This will be 'USER' or 'WORKER'
    phone,
    primaryService,
    experience,
  } = req.body;

  // Basic validation
  if ([fullName, email, password, role].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All required fields must be filled");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Handle file upload for worker profile image
  let profileImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profileImage) &&
    req.files.profileImage.length > 0
  ) {
    profileImageLocalPath = req.files.profileImage[0].path;
  }
  
  // Note: For simplicity, we are handling one image. Your worker signup form has one for 'id-upload'.
  // You would name it accordingly in multer and handle it here.
  // Example for ID proof: const idProofLocalPath = req.files.idProof[0].path;

  const profileImage = profileImageLocalPath
    ? await uploadOnCloudinary(profileImageLocalPath)
    : null;

  // Create user object
  const user = await User.create({
    fullName,
    email,
    password,
    role,
    profileImage: profileImage?.url || "",
    // Worker specific fields
    phone: role === UserRolesEnum.WORKER ? phone : undefined,
    primaryService:
      role === UserRolesEnum.WORKER ? primaryService : undefined,
    experience: role === UserRolesEnum.WORKER ? experience : undefined,
  });

  // Remove password and refreshToken from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    // We get req.user from the verifyJWT middleware
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request: No refresh token");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                { accessToken, refreshToken: newRefreshToken }, 
                "Access token refreshed"
            )
        );

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const getCurrentUser = asyncHandler( async (req, res) => {
    // req.user is available from the verifyJWT middleware
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User details fetched successfully"));
});

const updateWorkerProfile = asyncHandler(async (req, res) => {
    const { fullName, tagline, description, skills, availability } = req.body;
    const userId = req.user._id;

    if (req.user.role !== UserRolesEnum.WORKER) {
        throw new ApiError(403, "Only workers can update their profile.");
    }

    const worker = await User.findById(userId);
    if (!worker) {
        throw new ApiError(404, "Worker not found");
    }

    // Update text fields if they are provided
    if (fullName) worker.fullName = fullName;
    if (tagline) worker.tagline = tagline;
    if (description) worker.description = description;

    // Skills should be sent as a comma-separated string from the form
    if (skills) {
        worker.skills = skills.split(',').map(skill => skill.trim());
    }

    if (availability && Object.values(WorkerAvailabilityEnum).includes(availability)) {
        worker.availability = availability;
    }
    
    // Handle gallery image uploads
    if (req.files && req.files.galleryImages) {
        const galleryImageFiles = req.files.galleryImages;
        const uploadedImageUrls = [];

        for (const file of galleryImageFiles) {
            const uploadedImage = await uploadOnCloudinary(file.path);
            if (uploadedImage) {
                uploadedImageUrls.push(uploadedImage.url);
            }
        }

        // Add new images to the existing gallery
        worker.galleryImages = [...worker.galleryImages, ...uploadedImageUrls];
    }
    
    await worker.save({ validateBeforeSave: false });

    const updatedWorker = await User.findById(userId).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedWorker, "Profile updated successfully"));
});

export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser, // Export new function
    updateWorkerProfile, // Export new function
};