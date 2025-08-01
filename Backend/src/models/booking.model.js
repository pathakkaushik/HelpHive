import mongoose, { Schema } from "mongoose";

export const BookingStatusEnum = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    REJECTED: "REJECTED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED", // Added for future use
};

const bookingSchema = new Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        helper: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        message: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: Object.values(BookingStatusEnum),
            default: BookingStatusEnum.PENDING,
            required: true,
        },
        review: {
            type: Schema.Types.ObjectId,
            ref: "Review",
            default: null, // Link to the review once it's created
        },
    },
    { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);