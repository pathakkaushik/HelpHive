import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// --- ROUTES IMPORT ---
import userRouter from './routes/user.routes.js';
import helperRouter from './routes/helper.routes.js';
import bookingRouter from './routes/booking.routes.js';
import reviewRouter from './routes/review.routes.js';
import adminRouter from './routes/admin.routes.js';

// --- ROUTES DECLARATION ---
app.use("/api/v1/users", userRouter);
app.use("/api/v1/helpers", helperRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/admin", adminRouter);

// Simple route for testing
app.get("/", (req, res) => {
    res.send("HelpHive API is running...");
});


export { app };