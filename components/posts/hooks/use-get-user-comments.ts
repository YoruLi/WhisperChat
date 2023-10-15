"use client";
import { getPost } from "@/components/posts/hooks/get-single-post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserComments } from "./get-comments";

export const useGetUserComments = (userId: string) => {
    const queryClient = useQueryClient();

    return useQuery(
        ["comments", userId],

        async () => {
            return getUserComments(userId);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                queryClient.setQueryData(["posts", userId], data);
            },
        }
    );
};
