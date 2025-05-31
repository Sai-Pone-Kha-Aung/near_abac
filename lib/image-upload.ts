export interface ImageUploadResult {
  url: string;
  fileId: string;
  name: string;
}

export async function uploadImageToImageKit(
  file: File,
  fileName?: string
): Promise<ImageUploadResult> {
  try {
    const authResponse = await fetch("/api/imagekit-auth");
    const authParams = await authResponse.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "fileName",
      fileName || `listing_${Date.now()}_${file.name}`
    );
    formData.append("folder", "/listings"); // Organize images in a folder
    formData.append("token", authParams.token);
    formData.append("expire", authParams.expire);
    formData.append("signature", authParams.signature);
    formData.append(
      "publicKey",
      process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string
    );

    // Upload to ImageKit
    const uploadResponse = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image to ImageKit");
    }

    const result = await uploadResponse.json();

    return {
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    };
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
    throw new Error("Image upload failed");
  }
}
