import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  handleAPIError,
  createSuccessResponse,
  NotFoundError,
  ValidationError,
} from "@/utils/api-error";
import { auth, currentUser } from "@clerk/nextjs/server";
import { deleteImageFromImageKitByUrl } from "@/lib/image-upload";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new ValidationError("User not authenticated", [
        {
          message: "User not authenticated",
          code: "User_Not_Authenticated",
        },
      ]);
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // Validate pagination parameters
    if (page < 1) {
      throw new ValidationError("Page must be greater than 0", [
        {
          message: "Page must be greater than 0",
          code: "Invalid_Page",
        },
      ]);
    }

    if (limit < 1 || limit > 100) {
      throw new ValidationError("Limit must be between 1 and 100", [
        {
          message: "Limit must be between 1 and 100",
          code: "Invalid_Limit",
        },
      ]);
    }

    const userId = params.id;
    const isAdmin = user.publicMetadata.role === "admin";

    // Check if user can access these listings
    if (!isAdmin && userId !== user.id) {
      throw new ValidationError("Access denied", [
        {
          message: "You can only view your own listings",
          code: "Access_Denied",
        },
      ]);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query without search
    const { data, error, count } = await supabase
      .from("listings")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return createSuccessResponse({
      listings: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return handleAPIError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new ValidationError("User not authenticated", [
        {
          message: "User not authenticated",
          code: "User_Not_Authenticated",
        },
      ]);
    }

    const listingId = params.id;

    const { data: existingListing, error: fetchError } = await supabase
      .from("listings")
      .select("*")
      .eq("id", listingId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !existingListing) {
      throw new NotFoundError(
        "Listing not found or you do not have permission to edit it"
      );
    }

    const formData = await request.formData();

    // Extract form fields
    const fields = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const { name, category, address, description, ...optionalFields } = fields;

    // Validate required field
    if (!name || !category || !address || !description) {
      throw new Error(
        "Missing required fields: name, category, address, and description are required"
      );
    }

    const { data, error } = await supabase
      .from("listings")
      .update({
        name,
        category,
        address,
        description,
        ...optionalFields,
        updated_at: new Date().toISOString(),
      })
      .eq("id", listingId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return createSuccessResponse(data, "Listing updated successfully");
  } catch (error) {
    console.error("API Error:", error);
    return handleAPIError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      throw new ValidationError("User not authenticated", [
        {
          message: "User not authenticated",
          code: "User_Not_Authenticated",
        },
      ]);
    }

    const listingId = params.id;
    const isAdmin = user?.publicMetadata.role === "admin";

    const { data: existingListing, error: fetchError } = await supabase
      .from("listings")
      .select("*")
      .eq("id", listingId)
      .single();

    if (fetchError || !existingListing) {
      throw new NotFoundError(
        "Listing not found or you do not have permission to delete it"
      );
    }

    if (!isAdmin && existingListing.user_id !== userId) {
      throw new ValidationError(
        "You do not have permission to delete this listing",
        [
          {
            message: "You do not have permission to delete this listing",
            code: "Permission_Denied",
          },
        ]
      );
    }

    const imageUrl = existingListing.img_url;

    // Delete image from ImageKit if it exists
    if (imageUrl) {
      console.log("Deleting image from ImageKit:", imageUrl);
      const imageDeleted = await deleteImageFromImageKitByUrl(imageUrl);
      if (!imageDeleted) {
        console.error(
          "Failed to delete image from ImageKit, but continuing with listing deletion"
        );
        throw new Error(
          "Failed to delete image from ImageKit, but continuing with listing deletion"
        );
        // Don't throw error here - we still want to delete the listing even if image deletion fails
      }
    }

    // Delete the listing from Supabase
    const { data, error } = await supabase
      .from("listings")
      .delete()
      .eq("id", listingId)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return createSuccessResponse(data, "Listing deleted successfully");
  } catch (error) {
    console.error("API Error:", error);
    return handleAPIError(error);
  }
}
