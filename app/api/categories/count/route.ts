import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function GET() {
  try {
    // Get the count of listings in each category
    const { data, error } = await supabase
      .from("listings")
      .select("category")
      .not("category", "is", null);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "No listings found for this category" },
        { status: 404 }
      );
    }

    //Count Categories
    const categoryCounts = data.reduce(
      (acc: Record<string, number>, { category }) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {}
    );

    return NextResponse.json({ data: categoryCounts });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
