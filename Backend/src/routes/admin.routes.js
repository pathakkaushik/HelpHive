import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
    getAllUsers,
    getWorkerVerificationRequests,
    updateWorkerVerification,
} from "../controllers/admin.controller.js"; // We will create this next

const router = Router();

// Apply JWT and Admin verification to all routes in this file
router.use(verifyJWT, verifyAdmin);

router.route("/users").get(getAllUsers);
router.route("/verification-requests").get(getWorkerVerificationRequests);
router.route("/verify-worker/:workerId").patch(updateWorkerVerification);


export default router;