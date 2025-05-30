import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  handleAPIError,
  createSuccessResponse,
  NotFoundError,
  ValidationError,
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
import { auth } from "@clerk/nextjs/server";

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
    const body = await validateRequest(request, CreateListingSchema);
    const { userId } = await auth();

    // Insert the new listing into the database
    const { data, error } = await supabase
      .from("listings")
      .insert({
        ...body,
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
    return handleAPIError(error);
  }
}
