"use client";
import { QueryClient } from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2, // Retry failed requests once
        refetchOnWindowFocus: false,
      },
    },
  });
};

let browserQueryClient: QueryClient | null = null;
export const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};
