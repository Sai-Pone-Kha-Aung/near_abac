import { NextRequest } from "next/server";
import { z } from "zod";
import { ValidationError } from "@/utils/api-error";

export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError("Validation failed", error.errors);
    }
    throw error;
  }
}

export function validateSearchParams<T>(
  searchParams: URLSearchParams,
  schema: z.ZodSchema<T>
): T {
  try {
    const params = Object.fromEntries(searchParams.entries());
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError("Validation failed", error.errors);
    }
    throw error;
  }
}

export function validateParams<T>(
  params: Record<string, string>,
  schema: z.ZodSchema<T>
): T {
  try {
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError("Validation failed", error.errors);
    }
    throw error;
  }
}
