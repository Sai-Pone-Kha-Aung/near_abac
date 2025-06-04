// app/api/categories/route.ts (Enhanced version)
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  handleAPIError,
  createSuccessResponse,
  NotFoundError,
} from "@/utils/api-error";
import { CategoryQuerySchema } from "@/utils/validation/schema";
import { validateSearchParams } from "@/utils/validation/middleware";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = validateSearchParams(searchParams, CategoryQuerySchema);

    if (query.category) {
      // Fetch listings for specific category
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("category", query.category);

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        throw new NotFoundError("Listings for this category");
      }

      return createSuccessResponse(data);
    }

    // Fetch all unique categories
    const { data, error } = await supabase
      .from("listings")
      .select("category")
      .not("category", "is", null);

    if (error) {
      throw error;
    }

    const categoryMap = new Map<string, number>();
    data.forEach((item) => {
      const category = item.category;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const uniqueCategories = Array.from(categoryMap.entries()).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    return createSuccessResponse(uniqueCategories);
  } catch (error) {
    return handleAPIError(error);
  }
}
