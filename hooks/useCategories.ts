import { APIResponse, Category, Listing } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";

async function fetchCategory(): Promise<Category[]> {
  try {
    const response = await fetch("/api/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch category counts");
    }
    const result: APIResponse<Category[]> = await response.json();
    if (!result.data) {
      throw new Error("No category counts found");
    }
    return result.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching category counts:", errorMessage);
    throw new Error(errorMessage);
  }
}

export function useCategories() {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}

async function fetchCategoryListings(
  category: string | null
): Promise<Listing[]> {
  try {
    const response = await fetch(
      `/api/categories?category=${encodeURIComponent(category!)}`
    );
    const result: APIResponse<Listing[]> = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    return result.data || [];
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching category counts:", errorMessage);
    throw new Error(errorMessage);
  }
}

export function useCategoryListings(category: string | null) {
  return useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchCategoryListings(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}
