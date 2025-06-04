import { APIResponse, Listing } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

async function fetchListings(fetchAll: boolean = false): Promise<Listing[]> {
  try {
    const url = fetchAll ? `/api/listings?fetchAll=true` : `/api/listings`;
    const response = await fetch(url);
    const result: APIResponse<Listing[]> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch listings");
    }

    if (!result.data) {
      throw new Error("No listings found");
    }

    return result.data || [];
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching listings:", errorMessage);
    throw new Error(errorMessage);
  }
}

export function useListings(fetchAll: boolean = false) {
  return useQuery({
    queryKey: ["listings"],
    queryFn: () => fetchListings(fetchAll),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// export function useListings(fetchAll: boolean = false) {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchListings = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const url = fetchAll ? `/api/listings?fetchAll=true` : `/api/listings`;
//       const response = await fetch(url);
//       const result: APIResponse<Listing[]> = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to fetch listings");
//       }

//       if (!result.data) {
//         throw new Error("No listings found");
//       }

//       setListings(result.data || []);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An error occurred";
//       setError(errorMessage);
//       console.error("Error fetching listings:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchAll]);

//   useEffect(() => {
//     fetchListings();
//   }, [fetchListings]);

//   const refetch = useCallback(() => {
//     fetchListings();
//   }, [fetchListings]);

//   return { listings, loading, error, refetch };
// }

async function fetchListingById(id: string): Promise<Listing> {
  try {
    if (!id) {
      throw new Error("Listing ID is required");
    }
    const response = await fetch(`/api/listings?id=${encodeURIComponent(id)}`);
    const result: APIResponse<Listing> = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || `Failed to fetch listing with id: ${id}`
      );
    }

    if (!result.data) {
      throw new Error("Listing not found");
    }
    return result.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching listing by ID:", err);
    throw new Error(errorMessage);
  }
}

export function useListingsById(id: string) {
  return useQuery({
    queryKey: ["listingById", id],
    queryFn: () => fetchListingById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
// export function useListingsById(id: string | null) {
//   const [listing, setListing] = useState<Listing | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchListingById = useCallback(async () => {
//     if (!id) return;

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         `/api/listings?id=${encodeURIComponent(id)}`
//       );
//       const result: APIResponse<Listing> = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.message || `Failed to fetch listing with id: ${id}`
//         );
//       }

//       if (!result.data) {
//         throw new Error("Listing not found");
//       }

//       setListing(result.data);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An error occurred";
//       setError(errorMessage);
//       console.error("Error fetching listing by ID:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchListingById();
//   }, [fetchListingById]);

//   const refetch = useCallback(() => {
//     fetchListingById();
//   }, [fetchListingById]);

//   return { listing, loading, error, refetch };
// }

// export function useListingsByUserId(userId: string) {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchListingsByUserId = useCallback(async () => {
//     if (!userId) return;

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`/api/listings/${userId}`);
//       const result: APIResponse<Listing[]> = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.message || `Failed to fetch listings for user: ${userId}`
//         );
//       }

//       if (!result.data) {
//         throw new Error("No listings found for this user");
//       }

//       setListings(result.data);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "An error occurred";
//       setError(errorMessage);
//       console.error("Error fetching listings by user ID:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchListingsByUserId();
//   }, [fetchListingsByUserId]);

//   return { listings, loading, error };
// }

async function fetchListingByUserId(userId: string): Promise<Listing[]> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const response = await fetch(`/api/listings/${userId}`);
    const result: APIResponse<Listing[]> = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || `Failed to fetch listings for user: ${userId}`
      );
    }

    if (!result.data) {
      throw new Error("No listings found for this user");
    }

    return result.data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching listings by user ID:", err);
    throw new Error(errorMessage);
  }
}

export function useListingsByUserId(userId: string) {
  return useQuery({
    queryKey: ["listingsByUserId", userId],
    queryFn: () => fetchListingByUserId(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
