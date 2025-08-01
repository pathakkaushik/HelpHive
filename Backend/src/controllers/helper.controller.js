import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserRolesEnum } from "../constants.js";

// Controller to fetch all helpers with filtering
const getAllHelpers = asyncHandler(async (req, res) => {
  // Extract filters from query parameters
  const { searchTerm, locationTerm, service, verified, availability } = req.query;

  // Start with a base query to only find users with the 'WORKER' role
  const query = { role: UserRolesEnum.WORKER };

  // Build the query dynamically based on the filters provided
  if (searchTerm) {
    // Search in both name and primary service (role)
    query.$or = [
      { fullName: { $regex: searchTerm, $options: "i" } },
      { primaryService: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (locationTerm) {
    query.city = { $regex: locationTerm, $options: "i" };
  }

  if (service && service.toLowerCase() !== "all") {
    query.primaryService = service;
  }

  if (verified && verified.toString() === "true") {
    query["isVerified.id"] = true;
    query["isVerified.police"] = true;
  }
  
  // Add the new availability filter logic
  if (availability && availability !== 'All') {
    query.availability = availability;
  }
  
  // To implement pagination, you would use req.query for page and limit,
  // then use .limit() and .skip() methods on the Mongoose query.
  // Example: const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;
  // const skip = (page - 1) * limit;
  // const helpers = await User.find(query).skip(skip).limit(limit);

  // Fetch helpers from the database
  const helpers = await User.find(query).select(
    "-password -refreshToken"
  );

  // You might want to aggregate review data here in a more complex app
  // For now, this is sufficient to populate the cards

  return res
    .status(200)
    .json(new ApiResponse(200, helpers, "Helpers fetched successfully"));
});

// Controller to fetch a single helper's profile by ID
const getHelperProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid helper ID");
    }

    // Use an aggregation pipeline to fetch the helper and their review stats
    const helperProfilePipeline = [
        // Stage 1: Match the specific helper by ID
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
                role: UserRolesEnum.WORKER,
            },
        },
        // Stage 2: Join with the reviews collection
        {
            $lookup: {
                from: "reviews", // the name of the reviews collection in MongoDB
                localField: "_id",
                foreignField: "helper",
                as: "reviews",
            },
        },
        // Stage 3: Calculate average rating and review count
        {
            $addFields: {
                averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
                reviewCount: { $size: "$reviews" },
            },
        },
        // Stage 4: Project the fields we want to send to the frontend
        {
            $project: {
                // Exclude sensitive data
                password: 0,
                refreshToken: 0,
                // Include all other fields from the User model and the new calculated fields
                fullName: 1,
                profileImage: 1,
                introVideo: 1,
                coverImage: 1,
                primaryService: 1,
                experience: 1,
                city: 1,
                tagline: 1,
                description: 1,
                skills: 1,
                isVerified: 1,
                averageRating: 1,
                reviewCount: 1,
                reviews: 1, // You could also project and shape the reviews here
            }
        }
    ];

    const helperProfile = await User.aggregate(helperProfilePipeline);

    if (!helperProfile || helperProfile.length === 0) {
        throw new ApiError(404, "Helper profile not found");
    }

    // The aggregation returns an array, we need the first element
    return res.status(200).json(
        new ApiResponse(200, helperProfile[0], "Helper profile fetched successfully")
    );
});


export { getAllHelpers, getHelperProfile };