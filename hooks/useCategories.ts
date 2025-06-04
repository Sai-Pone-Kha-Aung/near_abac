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

// export function useCategories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch("/api/categories");
//       const result: APIResponse<Category[]> = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to fetch categories");
//       }

//       if (!result.data) {
//         throw new Error("No categories found");
//       }

//       setCategories(result.data || []);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An error occurred";
//       setError(errorMessage);
//       console.error("Error fetching categories:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const refetch = useCallback(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   return { categories, loading, error, refetch };
// }

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

// export function useCategoryListings(category: string | null) {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchListings = useCallback(async () => {
//     if (!category) return;

//     async function fetchListings() {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `/api/categories?category=${encodeURIComponent(category!)}`
//         );
//         const result: APIResponse<Listing[]> = await response.json();

//         if (!response.ok) {
//           throw new Error("Failed to fetch listings");
//         }

//         setListings(result.data || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchListings();
//   }, [category]);
//   useEffect(() => {
//     fetchListings();
//   }, [fetchListings]);

//   const refetch = useCallback(() => {
//     fetchListings();
//   }, [fetchListings]);

//   return { listings, loading, error, refetch };
// }

// export function useCategoryCounts() {
//   const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
//     {}
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategoryCounts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch("/api/categories/count");

//       if (!response.ok) {
//         throw new Error("Failed to fetch category counts");
//       }
//       const result: APIResponse<Record<string, number>> = await response.json();
//       if (!result.data) {
//         throw new Error("No category counts found");
//       }

//       setCategoryCounts(result.data);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An error occurred";
//       setError(errorMessage);
//       console.error("Error fetching category counts:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategoryCounts();
//   }, [fetchCategoryCounts]);

//   const refetch = useCallback(() => {
//     fetchCategoryCounts();
//   }, [fetchCategoryCounts]);

//   return { categoryCounts, loading, error, refetch };
// }
