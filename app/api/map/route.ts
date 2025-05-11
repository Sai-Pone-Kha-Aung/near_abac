import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mapURL = searchParams.get("url");

  if (!mapURL) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(mapURL, {
      maxRedirects: 5,
      validateStatus: null,
    });

    const finalURL = response.request.res.responseUrl || "";
    const match = finalURL.match(/@(-?\d+\.\d+),(-?\d+\.\d+),/);

    if (match && match.length >= 3) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);

      return NextResponse.json({
        success: true,
        coordinates: {
          lat,
          lng,
        },
      });
    } else {
      return NextResponse.json(
        {
          error: "Could not extract coordinates",
          finalUrl: finalURL,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching map data:", error);
    return NextResponse.json(
      { error: "Failed to fetch map data" },
      { status: 500 }
    );
  }
}
