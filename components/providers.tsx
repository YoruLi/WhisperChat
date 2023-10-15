"use client";
import React from "react";
import { SupabaseProvider } from "@/context/SupabaseContext/SupabaseProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthFormProvider } from "@/context/AuthFormContext/AuthFormProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SupabaseProvider>
      <AuthFormProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthFormProvider>
    </SupabaseProvider>
  );
}
