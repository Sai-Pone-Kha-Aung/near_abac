import { uploadImageToImageKit } from "@/lib/image-upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateListingData {
  name: string;
  category: string;
  address: string;
  description: string;
  phone?: string;
  facebook_url?: string;
  instagram_url?: string;
  google_map_link?: string;
  line_id?: string;
  img_url?: File | null;
  distance?: string;
}

interface CreateListingResponse {
  data: {
    id: string;
    name: string;
    category: string;
    address: string;
    description: string;
    phone?: string;
    facebook_url?: string;
    instagram_url?: string;
    google_map_link?: string;
    line_id?: string;
    img_url?: string | null;
    distance?: string;
  };
  message: string;
}

async function createListing(
  data: CreateListingData
): Promise<CreateListingResponse> {
  let imageUrl = "";
  let imageFileId = "";

  if (data.img_url) {
    const uploadResult = await uploadImageToImageKit(data.img_url);
    imageUrl = uploadResult.url;
    imageFileId = uploadResult.fileId;
  }

  const formDataToSubmit = new FormData();
  formDataToSubmit.append("name", data.name);
  formDataToSubmit.append("category", data.category);
  formDataToSubmit.append("address", data.address);
  formDataToSubmit.append("description", data.description);

  if (data.phone) formDataToSubmit.append("phone", data.phone);
  if (data.facebook_url)
    formDataToSubmit.append("facebook_url", data.facebook_url);
  if (data.instagram_url)
    formDataToSubmit.append("instagram_url", data.instagram_url);
  if (data.google_map_link)
    formDataToSubmit.append("google_map_link", data.google_map_link);
  if (data.line_id) formDataToSubmit.append("line_id", data.line_id);
  if (data.distance) formDataToSubmit.append("distance", data.distance);

  if (imageUrl) {
    if (data.img_url) formDataToSubmit.append("img_url", imageUrl);
  }

  const response = await fetch("/api/listings", {
    method: "POST",
    body: formDataToSubmit,
  });

  if (!response.ok) {
    throw new Error("Failed to create listing");
  }

  const responseData = await response.json();
  return {
    data: responseData.data,
    message: responseData.message,
  };
}

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListing,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      queryClient.setQueryData(["listing", data.data.id], data.data);
    },
    onError: (error) => {
      console.error("Error creating listing:", error);
    },
  });
}
