import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { 
    AvailableServiceTypes,
    AvailableUserRoles,
    ServiceTypesEnum,
    UserRolesEnum, 
} from "../constants.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      // Not required for regular users
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    refreshToken: {
      type: String,
    },

    // Worker-specific fields
    profileImage: {
      type: String, // Cloudinary URL
    },
    introVideo: {
        type: String, // Cloudinary URL
    },
    coverImage: { // For the video thumbnail
        type: String, // Cloudinary URL
    },
    primaryService: {
      type: String,
      enum: AvailableServiceTypes,
    },
    experience: {
      type: Number,
      default: 0,
    },
    city: {
      type: String,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    isVerified: {
        id: { type: Boolean, default: false },
        police: { type: Boolean, default: false },
    },
    // reviews: [ // We will handle this in the Review model
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Review",
    //     }
    // ]
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


export const User = mongoose.model("User", userSchema);