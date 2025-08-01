import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // This is a temporary storage on our server
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // We can add a unique suffix later if needed, but for now, the original name is fine
    // as it will be deleted right after upload to cloudinary.
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});