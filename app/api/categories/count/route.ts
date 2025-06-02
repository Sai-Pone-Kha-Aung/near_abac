import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  createSuccessResponse,
  handleAPIError,
  NotFoundError,
} from "@/utils/api-error";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Get the count of listings in each category
    const { data, error } = await supabase
      .from("listings")
      .select("category")
      .not("category", "is", null);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      throw new NotFoundError("No listings found for this category");
    }

    //Count Categories
    const categoryCounts = data.reduce(
      (acc: Record<string, number>, { category }) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {}
    );

    return createSuccessResponse(
      categoryCounts,
      "Category counts retrieved successfully"
    );
  } catch (error) {
    return handleAPIError(error);
  }
}
