import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload BASE64 image (Gemini output)
export const uploadBase64Image = async (base64Image) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "course-images",
      resource_type: "image",
    });

    return uploadResponse.secure_url; // ✅ PUBLIC CDN URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed");
  }
};
