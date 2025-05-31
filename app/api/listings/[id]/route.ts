import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  handleAPIError,
  createSuccessResponse,
  NotFoundError,
  ValidationError,
  APIError,
} from "@/utils/api-error";
import { auth } from "@clerk/nextjs/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

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

    if (!userId) {
      throw new ValidationError("User not authenticated", [
        {
          message: "User not authenticated",
          code: "User_Not_Authenticated",
        },
      ]);
    }

    const listingId = params.id;

    const { data, error } = await supabase
      .from("listings")
      .delete()
      .eq("id", listingId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new NotFoundError(
        "Listing not found or you do not have permission to delete it"
      );
    }

    return createSuccessResponse(data, "Listing deleted successfully");
  } catch (error) {
    console.error("API Error:", error);
    return handleAPIError(error);
  }
}
