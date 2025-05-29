"use client";

import { APIResponse, Listing } from "@/types/types";
import { useState, useEffect, useCallback } from "react";

export function useListings(fetchAll: boolean = false) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = fetchAll ? `/api/listings?fetchAll=true` : `/api/listings`;
      const response = await fetch(url);
      const result: APIResponse<Listing[]> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch listings");
      }

      if (!result.data) {
        throw new Error("No listings found");
      }

      setListings(result.data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const refetch = useCallback(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, loading, error, refetch };
}

export function useListingsById(id: string | null) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListingById = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/listings?id=${encodeURIComponent(id)}`
      );
      const result: APIResponse<Listing> = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Failed to fetch listing with id: ${id}`
        );
      }

      if (!result.data) {
        throw new Error("Listing not found");
      }

      setListing(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching listing by ID:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchListingById();
  }, [fetchListingById]);

  const refetch = useCallback(() => {
    fetchListingById();
  }, [fetchListingById]);

  return { listing, loading, error, refetch };
}
