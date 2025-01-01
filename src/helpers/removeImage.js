import { v2 as cloudinary } from "cloudinary";

export const getFileName = (url) => {
  const parts = url.split("/");
  const folder = parts[parts.length - 2];
  const imageName = parts[parts.length - 1].split(".")[0];
  return folder + "/" + imageName;
};

export const removeImage = (fileName) => {
  cloudinary.uploader.destroy(fileName);
};
