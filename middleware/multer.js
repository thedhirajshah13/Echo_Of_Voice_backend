import { v2 } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // load .env variables
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "media-uploads",
    resource_type: "auto",
  },
});

const uploadMedia = multer({ storage });

export default uploadMedia;