import { APIResponse } from "@/types/types";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends APIError {
  constructor(message: string, public errors: any[]) {
    super(400, message, "ValidationError");
    this.errors = errors;
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string) {
    super(404, `${resource} not found`, "NotFoundError");
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string = "Unauthorized") {
    super(401, message, "UnauthorizedError");
  }
}
export class ForbiddenError extends APIError {
  constructor(message: string = "Forbidden") {
    super(403, message, "ForbiddenError");
  }
}

export class ConflictError extends APIError {
  constructor(message: string = "Conflict") {
    super(409, message, "ConflictError");
  }
}

export function handleAPIError(error: unknown): NextResponse {
  console.error("API Error:", error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json<APIResponse>(
      {
        error: "Validation failed",
        code: "Validation_Error",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          code: err.code,
        })),
      },
      { status: 400 }
    );
  }

  // Handle custom API errors
  if (error instanceof APIError) {
    const response: APIResponse = {
      error: error.message,
      code: error.code || "API_Error",
    };

    if (error instanceof ValidationError) {
      response.errors = error.errors;
    }

    return NextResponse.json(response, { status: error.statusCode });
  }
  // Handle supabase errors
  if (error && typeof error === "object" && "code" in error) {
    const supabaseError = error as { code: string; message: string };
    return NextResponse.json<APIResponse>(
      {
        error: supabaseError.message || "Database error",
        code: supabaseError.code,
      },
      { status: 500 }
    );
  }

  return NextResponse.json<APIResponse>(
    {
      error: "Internal server error",
      code: "Internal_Server_Error",
    },
    { status: 500 }
  );
}

export function createSuccessResponse<T>(
  data: T,
  message: string = "Success"
): NextResponse {
  return NextResponse.json<APIResponse<T>>(
    {
      data,
      message,
    },
    { status: 200 }
  );
}
