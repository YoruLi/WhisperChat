"use client";
import React from "react";
import { useInfinitePosts } from "@/hooks/usePosts";

export default function usePostPerPage({ queryKey, userId, type }: { queryKey: string[]; userId?: string; type: any }) {
    const {
        data: posts,
        isError,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        isSuccess,
        hasNextPage,
        refetch,
    } = useInfinitePosts({ queryKey: queryKey, userId, type });

    return {
        posts,
        isError,
        isLoading,
        fetchNextPage,
        isSuccess,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    };
}
