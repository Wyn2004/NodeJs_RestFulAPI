import { v2 as cloudinary } from "cloudinary";

export const removeImage = (fileName) => {
  cloudinary.uploader.destroy(fileName);
};
