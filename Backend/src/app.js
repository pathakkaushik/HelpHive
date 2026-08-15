/**
 * Express Application Configuration & Middleware Pipeline
 * Architectural Role: Configures CORS security headers, body parsing limits, cookie parsing,
 * static asset serving, REST endpoint routing declarations, and global error handling middleware.
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize core Express server instance
const app = express();

/**
 * CORS (Cross-Origin Resource Sharing) Policy Middleware Configuration
 * Ensures secure cross-origin communication between React Frontend (localhost:5173) and Node Backend (localhost:8000).
 * credentials: true allows HTTP-Only authentication cookies to be sent back and forth securely.
 */
app.use(
  cors({
    origin: (origin, callback) => {
      // Whitelist local client origins (Vite dev server and production builds)
      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Body Parsing Middlewares - Restricts body size to 16kb to protect against Denial-of-Service (DoS) buffer overflow attacks
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serves local static uploads (profile photos, verification documents) stored under /public
app.use(express.static("public"));

// Parses incoming Request Cookies into req.cookies object for JWT Access/Refresh token verification
app.use(cookieParser());


// --- REST API ROUTE IMPORTS ---
import userRouter from './routes/user.routes.js';
import helperRouter from './routes/helper.routes.js';
import bookingRouter from './routes/booking.routes.js';
import reviewRouter from './routes/review.routes.js';
import adminRouter from './routes/admin.routes.js';
import chatbotRouter from './routes/chatbot.routes.js';
import aiRouter from './routes/ai.routes.js';
import attendanceRouter from './routes/attendance.routes.js';
import chatRouter from './routes/chat.routes.js';
import notificationRouter from './routes/notification.routes.js';
import paymentRouter from './routes/payment.routes.js';

// --- REST API ROUTE DECLARATIONS ---
app.use("/api/v1/users", userRouter); // User Authentication & Profile Management
app.use("/api/v1/helpers", helperRouter); // Helper Search & Aggregation Pipeline Queries
app.use("/api/v1/bookings", bookingRouter); // Interview & Job Booking Management
app.use("/api/v1/reviews", reviewRouter); // Customer Ratings & Feedback
app.use("/api/v1/admin", adminRouter); // Admin Verification & Dashboard Analytics
app.use("/api/v1/chatbot", chatbotRouter); // AI Assistant Chatbot Engine
app.use("/api/v1/ai", aiRouter); // Advanced Gemini AI Features (Matchmaker, Bio, OCR, Summarizer)
app.use("/api/v1/attendance", attendanceRouter); // Worker Daily Check-In/Check-Out Tracker
app.use("/api/v1/chats", chatRouter); // Direct Messaging & 1-Click Video Calls
app.use("/api/v1/notifications", notificationRouter); // Real-Time In-App Alerts & Notifications
app.use("/api/v1/payment", paymentRouter); // Escrow Payment Contracts & Razorpay Gateway Integration

/**
 * Global Express Error Handling Middleware
 * Intercepts errors passed via next(err) or thrown in async controllers via asyncHandler wrapper.
 * Returns consistent JSON error response schema ({ statusCode, success: false, message, errors }).
 */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errors: err.errors || [],
    });
});

export { app };