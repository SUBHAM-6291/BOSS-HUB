import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResult {
  secure_url: string;
  [key: string]: any;
}

export const uploadToCloudinary = async (buffer: Buffer, publicId: string): Promise<string | null> => {
  try {
    const result = await new Promise<CloudinaryResult | undefined>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "employee_profiles", public_id: publicId }, (error, result) =>
          error ? reject(error) : resolve(result)
        )
        .end(buffer);
    });
    return result?.secure_url || null;
  } catch {
    return null;
  }
};

export async function handleImageUpload(
  file: File | null,
  sessionImage: string | null,
  employeeId: string
): Promise<string | null> {
  const timestamp = Date.now();

  if (file) {
    return uploadToCloudinary(Buffer.from(await file.arrayBuffer()), `${employeeId}-${timestamp}`);
  }

  if (sessionImage) {
    const response = await fetch(sessionImage);
    return uploadToCloudinary(Buffer.from(await response.arrayBuffer()), `${employeeId}-session-${timestamp}`);
  }

  return null;
}