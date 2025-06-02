import { APIResponse, Listing } from "@/types/types";
import { useState, useEffect, useCallback } from "react";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PaginatedListingsResponse {
  listings: Listing[];
  pagination: PaginationInfo;
}

interface UsePaginationListingsResult {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  setPage: (page: number) => void;
  setSearchTerm: (search: string) => void;
  searchTerm: string;
}

export function usePaginationListings(
  category?: string,
  limit: number = 12
): UsePaginationListingsResult {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category) {
        params.append("category", category);
      }

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await fetch(`/api/listings?${params}`);
      const result: APIResponse<PaginatedListingsResponse> =
        await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      if (!result.data) {
        throw new Error("No listings found");
      }

      setListings(result.data.listings);
      setPagination(result.data.pagination);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [category, limit, page, searchTerm]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Reset to first page when search term changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchTerm, category]);

  const handleSetSearchTerm = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  return {
    listings,
    loading,
    error,
    pagination,
    setPage,
    setSearchTerm: handleSetSearchTerm,
    searchTerm,
  };
}
export function usePaginationListingsByUserId(
  userId: string,
  initialPage: number = 1,
  initialLimit: number = 12
) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(
    async (page: number, limit: number) => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        const searchParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        const response = await fetch(`/api/listings/${userId}?${searchParams}`);
        const result: APIResponse<PaginatedListingsResponse> =
          await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch listings");
        }

        if (!result.data) {
          throw new Error("No data received");
        }

        setListings(result.data.listings);
        setPagination(result.data.pagination);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching paginated listings:", err);
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchListings(pagination.page, pagination.limit);
  }, [fetchListings, pagination.page, pagination.limit]);

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: prev.hasNext ? prev.page + 1 : prev.page,
    }));
  }, []);

  const previousPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: prev.hasPrev ? prev.page - 1 : prev.page,
    }));
  }, []);

  const updateLimit = useCallback((newLimit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing limit
    }));
  }, []);

  const refetch = useCallback(() => {
    fetchListings(pagination.page, pagination.limit);
  }, [fetchListings, pagination.page, pagination.limit]);

  return {
    listings,
    pagination,
    loading,
    error,
    goToPage,
    nextPage,
    previousPage,
    updateLimit,
    refetch,
  };
}
