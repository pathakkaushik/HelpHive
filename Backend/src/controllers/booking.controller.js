import mongoose from "mongoose";
import { Booking, BookingStatusEnum } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserRolesEnum, WorkerAvailabilityEnum } from "../constants.js";

const createBooking = asyncHandler(async (req, res) => {
    const clientId = req.user._id;
    const { helperId, bookingDate, bookingTime, message } = req.body;

    if (!helperId || !bookingDate || !bookingTime) {
        throw new ApiError(400, "Helper ID, booking date, and time are required");
    }

    if (!mongoose.isValidObjectId(helperId)) {
        throw new ApiError(400, "Invalid Helper ID format");
    }

    const helper = await User.findById(helperId);
    if (!helper || helper.role !== UserRolesEnum.WORKER) {
        throw new ApiError(404, "Helper not found or is not a valid worker");
    }

    if (helper.availability === WorkerAvailabilityEnum.UNAVAILABLE) {
        throw new ApiError(400, "This helper is currently not available for new bookings.");
    }

    if (clientId.equals(helper._id)) {
        throw new ApiError(400, "You cannot book an interview with yourself");
    }

    const existingBooking = await Booking.findOne({
        client: clientId,
        helper: helperId,
        status: { $in: [BookingStatusEnum.PENDING, BookingStatusEnum.CONFIRMED, BookingStatusEnum.COMPLETED] },
    });

    if (existingBooking) {
        // Provide a more specific message based on the status
        if (existingBooking.status === BookingStatusEnum.PENDING || existingBooking.status === BookingStatusEnum.CONFIRMED) {
            throw new ApiError(409, "You already have an active booking request with this helper.");
        }
        if (existingBooking.status === BookingStatusEnum.COMPLETED) {
            throw new ApiError(409, "You have already completed a job with this helper. You can book again if you need a new service.");
            // Note: Business logic could be changed here to allow re-booking. For now, we restrict it.
        }
    }
    const booking = await Booking.create({
        client: clientId,
        helper: helperId,
        bookingDate,
        bookingTime,
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
    const { status: newStatus } = req.body;

    if (!Object.values(BookingStatusEnum).includes(newStatus)) {
        throw new ApiError(400, "Invalid booking status provided");
    }

    if (!mongoose.isValidObjectId(bookingId)) {
        throw new ApiError(400, "Invalid Booking ID format");
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    const currentUser = req.user;
    const currentStatus = booking.status;

    if (currentUser._id.equals(booking.helper)) {
        if (currentStatus === BookingStatusEnum.PENDING && (newStatus === BookingStatusEnum.CONFIRMED || newStatus === BookingStatusEnum.REJECTED)) {
            booking.status = newStatus;
        } 
        else if (currentStatus === BookingStatusEnum.CONFIRMED && newStatus === BookingStatusEnum.COMPLETED) {
            booking.status = newStatus;
        } 
        else {
            throw new ApiError(400, `Cannot change status from ${currentStatus} to ${newStatus} for this booking.`);
        }
    } 
    else if (currentUser._id.equals(booking.client)) {
        throw new ApiError(403, "Clients are not currently permitted to change booking status.");
    }
    else {
        throw new ApiError(403, "You are not authorized to update this booking.");
    }

    await booking.save({ validateBeforeSave: true });

    return res
        .status(200)
        .json(new ApiResponse(200, booking, "Booking status updated successfully"));
});

const getBookingsWithDetails = async (matchStage) => {
    return await Booking.aggregate([
        { $match: matchStage },
        {
            $lookup: {
                from: "users",
                localField: "client",
                foreignField: "_id",
                as: "clientDetails",
                pipeline: [{ $project: { fullName: 1, profileImage: 1, email: 1, phone: 1, address: 1 } }]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "helper",
                foreignField: "_id",
                as: "helperDetails",
                pipeline: [{ $project: { fullName: 1, profileImage: 1, email: 1, primaryService: 1 } }]
            }
        },
        { $addFields: { client: { $first: "$clientDetails" }, helper: { $first: "$helperDetails" } } },
        { $match: { client: { $ne: null }, helper: { $ne: null } } },
        {
            // --- CORRECTED INCLUSION PROJECTION ---
            // We are now building the final document shape field by field.
            $project: {
                // Keep all the original booking fields
                _id: 1,
                status: 1,
                bookingDate: 1,
                bookingTime: 1,
                message: 1,
                review: 1,
                createdAt: 1,
                updatedAt: 1,
                
                // Keep the populated helper object
                helper: 1,
                
                // Build the new client object with conditional fields
                client: {
                    _id: "$client._id",
                    fullName: "$client.fullName",
                    profileImage: "$client.profileImage",
                    email: {
                        $cond: { if: { $eq: ["$status", BookingStatusEnum.PENDING] }, then: "[details hidden]", else: "$client.email" }
                    },
                    phone: {
                        $cond: { if: { $eq: ["$status", BookingStatusEnum.PENDING] }, then: "[details hidden]", else: "$client.phone" }
                    },
                    address: {
                        $cond: { if: { $eq: ["$status", BookingStatusEnum.PENDING] }, then: "[details hidden]", else: "$client.address" }
                    }
                }
            }
        },
        { $sort: { createdAt: -1 } }
    ]);
};

const getSentBookings = asyncHandler(async (req, res) => {
    const clientId = req.user._id;
    const bookings = await getBookingsWithDetails({ client: clientId });
    return res.status(200).json(new ApiResponse(200, bookings, "Sent bookings fetched successfully"));
});

const getReceivedBookings = asyncHandler(async (req, res) => {
    if (req.user.role !== UserRolesEnum.WORKER) {
        throw new ApiError(403, "Only workers can view received bookings");
    }
    const helperId = req.user._id;
    const bookings = await getBookingsWithDetails({ helper: helperId });
    return res.status(200).json(new ApiResponse(200, bookings, "Received bookings fetched successfully"));
});

const cancelBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const currentUser = req.user;

    if (!mongoose.isValidObjectId(bookingId)) {
        throw new ApiError(400, "Invalid Booking ID format");
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    // Only the client who made the booking OR the helper who received it can cancel
    const isClient = currentUser._id.equals(booking.client);
    const isHelper = currentUser._id.equals(booking.helper);

    if (!isClient && !isHelper) {
        throw new ApiError(403, "You are not authorized to cancel this booking.");
    }
    
    // A booking can only be cancelled if it is PENDING or CONFIRMED
    if (booking.status !== BookingStatusEnum.PENDING && booking.status !== BookingStatusEnum.CONFIRMED) {
        throw new ApiError(400, `A booking that is already ${booking.status.toLowerCase()} cannot be cancelled.`);
    }

    booking.status = BookingStatusEnum.CANCELLED;
    await booking.save({ validateBeforeSave: true });
    
    // TODO: In a real app, you would send a notification to the other party.

    return res
        .status(200)
        .json(new ApiResponse(200, booking, "Booking has been cancelled."));
});

export {
    createBooking,
    updateBookingStatus,
    getSentBookings,
    getReceivedBookings,
    cancelBooking, // Add new export
};