import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = async (fileName) => {
  try {
    if (!fileName) return "File path does'nt exist.!";

    const response = await cloudinary.uploader.upload(fileName);
    console.log("File upload successfully in cloudinary.");
    fs.unlinkSync(fileName);
    return response;
  } catch (error) {
    console.log("Cloudinary upload error: ", error);
    return error.message;
  }
};
