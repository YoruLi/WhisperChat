import { usePost } from "@/hooks/usePost";

export const useSinglePost = (postId: string) => {
    return usePost(postId);
};
