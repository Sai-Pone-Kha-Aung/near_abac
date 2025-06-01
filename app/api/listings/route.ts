import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  handleAPIError,
  createSuccessResponse,
  NotFoundError,
  ValidationError,
  APIError,
} from "@/utils/api-error";
import {
  ListingQuerySchema,
  CreateListingSchema,
  IdParamSchema,
} from "@/utils/validation/schema";
import {
  validateSearchParams,
  validateRequest,
} from "@/utils/validation/middleware";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Listing } from "@/types/types";
import { getUploadAuthParams } from "@imagekit/next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // @ts-ignore
    const query = validateSearchParams(searchParams, ListingQuerySchema);

    if (query.id) {
      // Fetch a specific listing by ID
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", query.id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new NotFoundError("Listing not found");
      }

      return createSuccessResponse(data);
    }

    if (query.fetchAll) {
      // Fetch all listings without pagination
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      return createSuccessResponse(data);
    }

    let queryBuilder = supabase
      .from("listings")
      .select("*", { count: "exact" });

    if (query.category) {
      queryBuilder = queryBuilder.eq("category", query.category);
    }

    if (query.search) {
      queryBuilder = queryBuilder.or(
        `name.ilike.%${query.search}%,description.ilike.%${query.search}%`
      );
    }

    //Apply pagination
    const from = (query.page - 1) * query.limit;
    const to = from + query.limit - 1;

    const { data, error, count } = await queryBuilder
      .range(from, to)
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    const totalPages = Math.ceil((count || 0) / query.limit);

    return createSuccessResponse({
      listings: data,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: count || 0,
        totalPages,
        hasNext: query.page < totalPages,
        hasPrev: query.page > 1,
      },
    });
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse FormData instead of JSON
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

    const { userId } = await auth();

    if (!userId) {
      throw new ValidationError("User not authenticated", [
        {
          message: "User not authenticated",
          code: "User_Not_Authenticated",
        },
      ]);
    }

    // Insert the new listing into the database
    const { data, error } = await supabase
      .from("listings")
      .insert({
        name,
        category,
        address,
        description,
        ...optionalFields,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return createSuccessResponse(data, "Listing created successfully");
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
