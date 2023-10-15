"use client";
import React from "react";
import { SupabaseProvider } from "@/context/SupabaseContext/SupabaseProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <SupabaseProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SupabaseProvider>
    );
}
