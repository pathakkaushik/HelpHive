import mongoose from "mongoose";
import { Booking, BookingStatusEnum } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserRolesEnum } from "../constants.js";

const createBooking = asyncHandler(async (req, res) => {
    // The user creating the booking is the client (from verifyJWT)
    const clientId = req.user._id;
    const { helperId, bookingDate, message } = req.body;

    if (!helperId || !bookingDate) {
        throw new ApiError(400, "Helper ID and booking date are required");
    }

    if (!mongoose.isValidObjectId(helperId)) {
        throw new ApiError(400, "Invalid Helper ID format");
    }

    // Check if the helper exists and is actually a worker
    const helper = await User.findById(helperId);
    if (!helper || helper.role !== UserRolesEnum.WORKER) {
        throw new ApiError(404, "Helper not found or is not a valid worker");
    }

    // Prevent booking oneself
    if (clientId.equals(helper._id)) {
        throw new ApiError(400, "You cannot book an interview with yourself");
    }

    // Optional: Check for existing pending/confirmed bookings for the same helper to prevent duplicates
    const existingBooking = await Booking.findOne({
        client: clientId,
        helper: helperId,
        status: { $in: [BookingStatusEnum.PENDING, BookingStatusEnum.CONFIRMED] },
    });

    if (existingBooking) {
        throw new ApiError(409, "You already have an active booking request with this helper.");
    }

    const booking = await Booking.create({
        client: clientId,
        helper: helperId,
        bookingDate,
        message,
    });

    if (!booking) {
        throw new ApiError(500, "Something went wrong while creating the booking");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, booking, "Booking request sent successfully"));
});

const updateBookingStatus = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body; // Expecting 'CONFIRMED' or 'REJECTED'

    if (!Object.values(BookingStatusEnum).includes(status)) {
        throw new ApiError(400, "Invalid booking status");
    }

    if (!mongoose.isValidObjectId(bookingId)) {
        throw new ApiError(400, "Invalid Booking ID format");
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Only the helper can confirm/reject. The client can cancel.
    // For now, we only implement the helper's action.
    if (!booking.helper.equals(req.user._id)) {
        throw new ApiError(403, "You are not authorized to update this booking's status");
    }

    if (booking.status !== BookingStatusEnum.PENDING) {
        throw new ApiError(400, `Booking is already ${booking.status.toLowerCase()} and cannot be changed.`);
    }

    booking.status = status;
    await booking.save({ validateBeforeSave: true });

    return res
        .status(200)
        .json(new ApiResponse(200, booking, "Booking status updated successfully"));
});


const getBookingsWithDetails = async (matchStage) => {
    return await Booking.aggregate([
        {
            $match: matchStage
        },
        {
            $lookup: {
                from: "users",
                localField: "client",
                foreignField: "_id",
                as: "clientDetails",
                pipeline: [
                    { $project: { fullName: 1, profileImage: 1, email: 1 } }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "helper",
                foreignField: "_id",
                as: "helperDetails",
                pipeline: [
                    { $project: { fullName: 1, profileImage: 1, email: 1, primaryService: 1 } }
                ]
            }
        },
        {
            $addFields: {
                client: { $first: "$clientDetails" },
                helper: { $first: "$helperDetails" }
            }
        },
        {
            $project: {
                clientDetails: 0,
                helperDetails: 0,
            }
        },
        {
            $sort: { createdAt: -1 }
        }
    ]);
};


// For clients to see bookings they have made
const getSentBookings = asyncHandler(async (req, res) => {
    const clientId = req.user._id;
    const bookings = await getBookingsWithDetails({ client: clientId });

    if (!bookings) {
        throw new ApiError(500, "Failed to retrieve sent bookings");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, bookings, "Sent bookings fetched successfully"));
});

// For helpers to see bookings they have received
const getReceivedBookings = asyncHandler(async (req, res) => {
    if (req.user.role !== UserRolesEnum.WORKER) {
        throw new ApiError(403, "Only workers can view received bookings");
    }

    const helperId = req.user._id;
    const bookings = await getBookingsWithDetails({ helper: helperId });

     if (!bookings) {
        throw new ApiError(500, "Failed to retrieve received bookings");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, bookings, "Received bookings fetched successfully"));
});


export {
    createBooking,
    updateBookingStatus,
    getSentBookings,
    getReceivedBookings,
};