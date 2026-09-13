import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Payment } from "../models/payment.model.js";
import { Booking } from "../models/booking.model.js";
import { Notification } from "../models/notification.model.js";
import crypto from "crypto";

// 1. Process Advance Booking Deposit Escrow Payment (Direct)
const createEscrowPayment = asyncHandler(async (req, res) => {
    const { bookingId, amount, paymentMethod } = req.body;
    const clientId = req.user._id;

    const booking = await Booking.findById(bookingId).populate("helper client");
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (!booking.client._id.equals(clientId)) {
        throw new ApiError(403, "Only the client who booked can make an advance payment.");
    }

    const transactionId = `HH_ESCROW_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    const payment = await Payment.create({
        client: clientId,
        helper: booking.helper._id,
        booking: booking._id,
        amount: amount || 500,
        status: 'HELD_IN_ESCROW',
        paymentMethod: paymentMethod || 'UPI / Direct',
        transactionId
    });

    await Notification.create({
        user: booking.helper._id,
        title: "🛡️ Advance Escrow Deposit Held",
        message: `Client ${booking.client.fullName} deposited ₹${amount || 500} in Escrow for your job request.`,
        type: 'PAYMENT'
    });

    await Notification.create({
        user: clientId,
        title: "💳 Escrow Payment Successful",
        message: `Your advance deposit of ₹${amount || 500} is held safely in HelpHive Escrow (Txn: ${transactionId}).`,
        type: 'PAYMENT'
    });

    return res
        .status(201)
        .json(new ApiResponse(201, payment, "Advance deposit held in Escrow successfully"));
});

// 2. Fetch Escrow Payment Details for Booking
const getBookingPayment = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    const payment = await Payment.findOne({ booking: bookingId })
        .populate("client", "fullName email phone address")
        .populate("helper", "fullName primaryService address pricing");

    if (!payment) {
        return res.status(200).json(new ApiResponse(200, null, "No escrow payment found for this booking"));
    }

    return res.status(200).json(new ApiResponse(200, payment, "Payment details fetched successfully"));
});

// 3. Release or Refund Escrow Payment
const updateEscrowStatus = asyncHandler(async (req, res) => {
    const { paymentId } = req.params;
    const { action } = req.body; // 'RELEASE' or 'REFUND'

    const payment = await Payment.findById(paymentId);
    if (!payment) {
        throw new ApiError(404, "Payment transaction not found");
    }

    if (action === 'RELEASE') {
        payment.status = 'RELEASED_TO_WORKER';
        await Notification.create({
            user: payment.helper,
            title: "💰 Escrow Funds Released!",
            message: `₹${payment.amount} has been released to your bank account / UPI for Txn ${payment.transactionId}.`,
            type: 'PAYMENT'
        });
    } else if (action === 'REFUND') {
        payment.status = 'REFUNDED_TO_CLIENT';
        await Notification.create({
            user: payment.client,
            title: "🔄 Escrow Refund Processed",
            message: `₹${payment.amount} has been refunded to your original payment account for Txn ${payment.transactionId}.`,
            type: 'PAYMENT'
        });
    }

    await payment.save();

    return res.status(200).json(new ApiResponse(200, payment, `Payment status updated to ${payment.status}`));
});

export {
    createEscrowPayment,
    getBookingPayment,
    updateEscrowStatus
};
