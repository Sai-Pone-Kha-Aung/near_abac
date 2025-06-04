import { uploadImageToImageKit } from "@/lib/image-upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateListingData } from "./useCreateListing";

export interface UpdateListingData extends CreateListingData {
  id: string;
}

interface UpdateListingResponse {
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

async function updateListing(
  data: UpdateListingData
): Promise<UpdateListingResponse> {
  let imageUrl = "";
  let imageFileId = "";

  if (data.img_url && data.img_url instanceof File) {
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
    formDataToSubmit.append("img_url", imageUrl);
  }

  const response = await fetch(`/api/listings/${data.id}`, {
    method: "PUT",
    body: formDataToSubmit,
  });

  if (!response.ok) {
    throw new Error("Failed to update listing");
  }

  const responseData = await response.json();
  return {
    data: responseData.data,
    message: responseData.message,
  };
}

export function useUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateListing,
    onSuccess: (data) => {
      // Update the specific listing cache
      queryClient.setQueryData(["listing", data.data.id], data.data);

      // Update listings array cache
      queryClient.setQueryData(["listings"], (old: any[] = []) =>
        old.map((listing) =>
          listing.id === data.data.id ? data.data : listing
        )
      );

      // Invalidate related queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Invalidate paginated queries
      queryClient.invalidateQueries({ queryKey: ["listings", "paginated"] });
      queryClient.invalidateQueries({ queryKey: ["listings", "user"] });
    },
    onError: (error) => {
      console.error("Failed to update listing:", error);
    },
  });
}

async function deleteListing(id: string): Promise<void> {
  const response = await fetch(`/api/listings/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete listing");
  }
}

export function useDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListing,
    onSuccess: (_, deletedId) => {
      // Invalidate the specific listing cache
      queryClient.removeQueries({ queryKey: ["listing", deletedId] });

      // Update listings array cache
      queryClient.setQueryData(["listings"], (old: any[] = []) =>
        old.filter((listing) => listing.id !== deletedId)
      );

      // Invalidate related queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Invalidate paginated queries
      queryClient.invalidateQueries({ queryKey: ["listings", "paginated"] });
      queryClient.invalidateQueries({ queryKey: ["listings", "user"] });
    },
    onError: (error) => {
      console.error("Failed to delete listing:", error);
    },
  });
}
