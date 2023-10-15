"use client";
import { getPost } from "@/components/posts/hooks/get-single-post";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const usePost = (postId: string) => {
    const queryClient = useQueryClient();

    return useQuery(
        ["posts", postId],

        async () => {
            return getPost(postId);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                queryClient.setQueryData(["posts", postId], data);
            },
        }
    );
};
