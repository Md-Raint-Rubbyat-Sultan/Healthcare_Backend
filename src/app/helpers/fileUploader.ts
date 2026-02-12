import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { envVars } from "../config/env";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const uploadImageToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUD_NAME,
    api_key: envVars.CLOUDINARY.API_KEY,
    api_secret: envVars.CLOUDINARY.API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      public_id: file.filename,
    });

    // ✅ Remove file after successful upload
    await fs.unlink(file.path);

    return result;
  } catch (error) {
    console.log("Cloudinary upload error:", error);

    // Optional: remove file even if upload fails
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.log("File delete error:", err);
    }
  }
};

export const fileUploader = {
  upload,
  uploadImageToCloudinary,
};
