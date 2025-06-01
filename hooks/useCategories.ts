import { APIResponse, Category, Listing } from "@/types/types";
import { useState, useEffect, useCallback } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/categories");
      const result: APIResponse<Category[]> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch categories");
      }

      if (!result.data) {
        throw new Error("No categories found");
      }

      setCategories(result.data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const refetch = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch };
}

export function useCategoryListings(category: string | null) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    if (!category) return;

    async function fetchListings() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/categories?category=${encodeURIComponent(category!)}`
        );
        const result: APIResponse<Listing[]> = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        setListings(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [category]);
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const refetch = useCallback(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, loading, error, refetch };
}

export function useCategoryCounts() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryCounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/categories/count");

      if (!response.ok) {
        throw new Error("Failed to fetch category counts");
      }
      const result: APIResponse<Record<string, number>> = await response.json();
      if (!result.data) {
        throw new Error("No category counts found");
      }

      setCategoryCounts(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching category counts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategoryCounts();
  }, [fetchCategoryCounts]);

  const refetch = useCallback(() => {
    fetchCategoryCounts();
  }, [fetchCategoryCounts]);

  return { categoryCounts, loading, error, refetch };
}
