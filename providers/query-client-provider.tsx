"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryClientProviderWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Create QueryClient inside the Client Component using useState
  // This ensures it's only created once per component instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
