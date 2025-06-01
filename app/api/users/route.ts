import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  handleAPIError,
  createSuccessResponse,
  NotFoundError,
  ValidationError,
  APIError,
} from "@/utils/api-error";
import { currentUser } from "@clerk/nextjs/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new ValidationError("User not authenticated", [
        {
          message: "User not authenticated",
          code: "UNAUTHENTICATED",
        },
      ]);
    }
    if (user.publicMetadata?.role === "moderator") {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id);
      if (error) {
        throw new APIError(500, error.message, "FETCH_USERS_ERROR");
      }
      if (!data || data.length === 0) {
        throw new NotFoundError("No users found");
      }
      return createSuccessResponse(data);
    }

    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      throw new APIError(500, error.message, "FETCH_USERS_ERROR");
    }
    if (!data || data.length === 0) {
      throw new NotFoundError("No users found");
    }
    return createSuccessResponse(data);
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();

    if (user?.publicMetadata?.role !== "admin") {
      throw new ValidationError("You are not authorized to delete users", [
        {
          message: "User not authorized",
          code: "UNAUTHORIZED",
        },
      ]);
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      throw new ValidationError("User ID is required", [
        {
          message: "User ID is required",
          code: "MISSING_USER_ID",
        },
      ]);
    }

    const { error } = await supabase.from("users").delete().eq("id", userId);
    if (error) {
      throw new APIError(500, error.message, "DELETE_USER_ERROR");
    }

    return createSuccessResponse({ message: "User deleted successfully" });
  } catch (error) {
    return handleAPIError(error);
  }
}
