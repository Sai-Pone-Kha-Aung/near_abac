import { APIResponse, User } from "@/types/types";
import { useState, useEffect, useCallback } from "react";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/users");
      const result: APIResponse<User[]> = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch users");
      }
      if (!result.data || result.data.length === 0) {
        throw new Error("No users found");
      }
      setUsers(result.data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refetch = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch,
  };
}
