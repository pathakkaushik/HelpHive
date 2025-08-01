import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // File has been uploaded successfully
    
    // Check if file exists before unlinking
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    
    return response;
  } catch (error) {
    // Check if file exists before trying to unlink in case of an error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    }
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export { uploadOnCloudinary };