import { APIResponse, Listing } from "@/types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  setDistance: (distance: string) => void;
  distance: string | undefined;
}

async function fetchPaginatedListings({
  page,
  limit,
  category,
  search,
  distance,
}: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  distance?: string;
}): Promise<APIResponse<PaginatedListingsResponse>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (category) {
    params.append("category", category);
  }

  if (search?.trim()) {
    params.append("search", search.trim());
  }

  if (distance?.trim()) {
    params.append("distance", distance.trim());
  }

  const response = await fetch(`/api/listings?${params}`);
  const result: APIResponse<PaginatedListingsResponse> = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch listings");
  }
  if (!result.data) {
    throw new Error("No listings found");
  }
  return result;
}

export function usePaginationListings(
  category?: string,
  limit: number = 12
): UsePaginationListingsResult {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [distance, setDistance] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "listings",
      "paginated",
      { page, limit, category, search: searchTerm, distance },
    ],
    queryFn: () =>
      fetchPaginatedListings({
        page,
        limit,
        category,
        search: searchTerm,
        distance,
      }),
    placeholderData: keepPreviousData, // Keeps previous data while loading new page
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleSetSearchTerm = useCallback((search: string) => {
    setSearchTerm(search);
    setPage(1);
  }, []);

  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when changing page
  }, []);

  const handleSetDistance = useCallback((distance: string) => {
    setDistance(distance);
    setPage(1); // Reset to first page when distance changes
  }, []);

  return {
    listings: data?.data?.listings || [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    pagination: data?.data?.pagination || {
      page: 1,
      limit,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    setPage: handleSetPage,
    setSearchTerm: handleSetSearchTerm,
    setDistance: handleSetDistance,
    distance,
    searchTerm,
  };
}

// export function usePaginationListings(
//   category?: string,
//   limit: number = 12
// ): UsePaginationListingsResult {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [pagination, setPagination] = useState<PaginationInfo>({
//     page: 1,
//     limit,
//     total: 0,
//     totalPages: 0,
//     hasNext: false,
//     hasPrev: false,
//   });

//   const fetchListings = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//       });

//       if (category) {
//         params.append("category", category);
//       }

//       if (searchTerm.trim()) {
//         params.append("search", searchTerm.trim());
//       }

//       const response = await fetch(`/api/listings?${params}`);
//       const result: APIResponse<PaginatedListingsResponse> =
//         await response.json();

//       if (!response.ok) {
//         throw new Error("Failed to fetch listings");
//       }

//       if (!result.data) {
//         throw new Error("No listings found");
//       }

//       setListings(result.data.listings);
//       setPagination(result.data.pagination);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An error occurred";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }, [category, limit, page, searchTerm]);

//   useEffect(() => {
//     fetchListings();
//   }, [fetchListings]);

//   // Reset to first page when search term changes
//   useEffect(() => {
//     if (page !== 1) {
//       setPage(1);
//     }
//   }, [searchTerm, category]);

//   const handleSetSearchTerm = useCallback((search: string) => {
//     setSearchTerm(search);
//   }, []);

//   return {
//     listings,
//     loading,
//     error,
//     pagination,
//     setPage,
//     setSearchTerm: handleSetSearchTerm,
//     searchTerm,
//   };
// }

// export function usePaginationListingsByUserId(
//   userId: string,
//   initialPage: number = 1,
//   initialLimit: number = 12
// ) {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [pagination, setPagination] = useState<PaginationInfo>({
//     page: initialPage,
//     limit: initialLimit,
//     total: 0,
//     totalPages: 0,
//     hasNext: false,
//     hasPrev: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchListings = useCallback(
//     async (page: number, limit: number) => {
//       if (!userId) return;

//       try {
//         setLoading(true);
//         setError(null);

//         const searchParams = new URLSearchParams({
//           page: page.toString(),
//           limit: limit.toString(),
//         });

//         const response = await fetch(`/api/listings/${userId}?${searchParams}`);
//         const result: APIResponse<PaginatedListingsResponse> =
//           await response.json();

//         if (!response.ok) {
//           throw new Error(result.message || "Failed to fetch listings");
//         }

//         if (!result.data) {
//           throw new Error("No data received");
//         }

//         setListings(result.data.listings);
//         setPagination(result.data.pagination);
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : "An error occurred";
//         setError(errorMessage);
//         console.error("Error fetching paginated listings:", err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [userId]
//   );

//   useEffect(() => {
//     fetchListings(pagination.page, pagination.limit);
//   }, [fetchListings, pagination.page, pagination.limit]);

//   const goToPage = useCallback((page: number) => {
//     setPagination((prev) => ({ ...prev, page }));
//   }, []);

//   const nextPage = useCallback(() => {
//     setPagination((prev) => ({
//       ...prev,
//       page: prev.hasNext ? prev.page + 1 : prev.page,
//     }));
//   }, []);

//   const previousPage = useCallback(() => {
//     setPagination((prev) => ({
//       ...prev,
//       page: prev.hasPrev ? prev.page - 1 : prev.page,
//     }));
//   }, []);

//   const updateLimit = useCallback((newLimit: number) => {
//     setPagination((prev) => ({
//       ...prev,
//       limit: newLimit,
//       page: 1, // Reset to first page when changing limit
//     }));
//   }, []);

//   const refetch = useCallback(() => {
//     fetchListings(pagination.page, pagination.limit);
//   }, [fetchListings, pagination.page, pagination.limit]);

//   return {
//     listings,
//     pagination,
//     loading,
//     error,
//     goToPage,
//     nextPage,
//     previousPage,
//     updateLimit,
//     refetch,
//   };
// }

async function fetchUserListings({
  userId,
  page = 1,
  limit = 12,
}: {
  userId: string;
  page?: number;
  limit?: number;
}): Promise<APIResponse<PaginatedListingsResponse>> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/listings/${userId}?${searchParams}`);
  const result: APIResponse<PaginatedListingsResponse> = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch user listings");
  }

  return result;
}

export function usePaginationListingsByUserId(
  userId: string,
  initialPage: number = 1,
  initialLimit: number = 12
) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["listings", "user", userId, { page, limit }],
    queryFn: () => fetchUserListings({ userId, page, limit }),
    enabled: !!userId, // Only run query if userId exists
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const nextPage = useCallback(() => {
    if (data?.data?.pagination.hasNext) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [data?.data?.pagination.hasNext]);

  const previousPage = useCallback(() => {
    if (data?.data?.pagination.hasPrev) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [data?.data?.pagination.hasPrev]);

  const updateLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  return {
    listings: data?.data?.listings || [],
    pagination: data?.data?.pagination || {
      page: 1,
      limit: initialLimit,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
    loading: isLoading || isFetching,
    error: error ? (error as Error).message : null,
    goToPage,
    nextPage,
    previousPage,
    updateLimit,
    refetch,
  };
}
