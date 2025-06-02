import imagekit from "@/lib/imagekit";

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

export async function deleteImageFromImageKit(
  fileId: string
): Promise<boolean> {
  try {
    await imagekit.deleteFile(fileId);
    console.log("Image deleted successfully from ImageKit");
    return true;
  } catch (error) {
    console.error("Error deleting image from ImageKit:", error);
    return false;
  }
}

export async function deleteImageFromImageKitByUrl(
  imageUrl: string
): Promise<boolean> {
  try {
    const parts = imageUrl.split("/");
    const fileName = parts[parts.length - 1];

    const filesByName = await imagekit.listFiles({
      name: fileName,
      limit: 1,
    });

    if (filesByName.length > 0 && "fileId" in filesByName[0]) {
      console.log("Found file by name with ID:", filesByName[0].fileId);
      await imagekit.deleteFile(filesByName[0].fileId);
      console.log("Image deleted successfully from ImageKit by name");
      return true;
    }

    console.log("Image deleted successfully from ImageKit by path");
    return true;
  } catch (error) {
    console.error("Error deleting image from ImageKit by URL:", error);
    return false;
  }
}
