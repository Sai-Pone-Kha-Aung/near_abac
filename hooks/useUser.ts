import { APIResponse, User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(): Promise<User[]> {
  try {
    const response = await fetch("/api/users");
    const result: APIResponse<User[]> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch users");
    }
    if (!result.data || result.data.length === 0) {
      throw new Error("No users found");
    }
    return result.data || [];
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching users:", err);
    throw new Error(errorMessage);
  }
}

export function useUsers(enabled: boolean = true) {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: enabled, // Add conditional loading
  });
}
