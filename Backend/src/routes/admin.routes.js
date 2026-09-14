import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
    getAllUsers,
    getWorkerVerificationRequests,
    updateWorkerVerification,
    rejectWorkerDocument,
    getWorkerDetails,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.route("/users").get(getAllUsers);
router.route("/verification-requests").get(getWorkerVerificationRequests);
router.route("/worker/:workerId").get(getWorkerDetails);
router.route("/verify-worker/:workerId").patch(updateWorkerVerification);
router.route("/reject-document/:workerId").patch(rejectWorkerDocument);

export default router;