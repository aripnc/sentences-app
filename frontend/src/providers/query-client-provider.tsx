"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
