import { client } from "@/sanity/lib/client";

export const uploadImageToSanity = async (
  fileOrUrl: File | string
): Promise<string> => {
  let file: File;

  if (typeof fileOrUrl === "string") {
    // If the input is a URL, fetch the image and convert it to a File object
    const response = await fetch(fileOrUrl);
    const blob = await response.blob();
    file = new File([blob], "image.jpg", { type: blob.type });
  } else {
    // If the input is already a File object, use it directly
    file = fileOrUrl;
  }

  // Upload the file to Sanity and return the asset ID
  const asset = await client.assets.upload("image", file);
  return asset._id;
};
