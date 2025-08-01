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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid helper ID format");
    }
    
    // Convert the string ID to a MongoDB ObjectId
    const helperId = new mongoose.Types.ObjectId(id);

    const helperProfilePipeline = [
        {
            $match: {
                _id: helperId, // Use the ObjectId for matching
                role: UserRolesEnum.WORKER,
            },
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "helper",
                as: "reviews",
            },
        },
        {
            $addFields: {
                averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
                reviewCount: { $size: "$reviews" },
            },
        },
        {
            $project: {
                password: 0,
                refreshToken: 0,
                reviews: 0, // We don't need to send all reviews here, just the stats
            }
        }
    ];

    const helperProfileArray = await User.aggregate(helperProfilePipeline);

    if (!helperProfileArray || helperProfileArray.length === 0) {
        throw new ApiError(404, "Helper profile not found");
    }

    return res.status(200).json(
        new ApiResponse(200, helperProfileArray[0], "Helper profile fetched successfully")
    );
});


export { getAllHelpers, getHelperProfile };