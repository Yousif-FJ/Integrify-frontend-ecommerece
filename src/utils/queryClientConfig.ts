import { QueryClient } from "@tanstack/react-query";

export const queryClientConfig = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 3,
        refetchOnReconnect: true
      },
      mutations: {
        retry: 3,
        retryDelay: 1000
      }
    }
  })