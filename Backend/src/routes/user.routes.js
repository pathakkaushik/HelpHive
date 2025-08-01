import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken,
    updateWorkerProfile, // Add this import
    getCurrentUser
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Registration route: uses multer to handle file uploads
router.route("/register").post(
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    // Add other fields like this e.g., for id proof
    // {
    //   name: "idProof",
    //   maxCount: 1,
    // }
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured Routes
router.use(verifyJWT); // Apply verifyJWT to all routes below

router.route("/logout").post(logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/me").get(getCurrentUser); // Route to get current user details

// Route for a worker to update their profile
router.route("/me/profile").patch(
    upload.fields([{ name: "galleryImages", maxCount: 5 }]), // Allow up to 5 gallery images
    updateWorkerProfile
);

export default router;