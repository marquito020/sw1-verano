import { configCloudinary } from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(configCloudinary);

const uploadImage = async (filePath: string, withWatermark: boolean) => {
  // marca de agua: ® 
  const transformation = [
    {
      color: "#FFFFFF",
      overlay: {
        font_family: "helvetica",
        font_size: 28,
        font_weight: "bold",
        text: "Marco David Toledo",
      },
    },
    { y: 40, gravity: "center" },
  ];

  //withWatermark ? transformation : []
  const imageCloudinary = await cloudinary.uploader.upload(filePath, {
    folder: "exam1-software",
    transformation: [],
  });

  return imageCloudinary;
};

const deleteImage = async (public_id: string) => {
  const deletedImage = await cloudinary.uploader.destroy(public_id);
  return deletedImage;
};

export { uploadImage, deleteImage };
