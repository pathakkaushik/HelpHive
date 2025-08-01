import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken 
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
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);


export default router;