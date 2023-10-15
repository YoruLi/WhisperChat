import { POST_PER_PAGE } from "@/constants";
import { Comments } from "@/types/schemas";

import { supabase } from "@/utils/supabase";

import toast from "react-hot-toast";

export const getUserPosts = async ({ pageParam, profileId, type }: { pageParam: number; profileId: string; type: string }) => {
    let filter = {
        ...(type === "user_posts" && {
            column: "profile_id",
            operator: "eq",
            value: profileId,
        }),

        ...(type === "user_media" && {
            column: "media",
            operator: "not.is",
            value: null,
        }),

        ...(type === "user_likes" && {
            column: "likesPost",
            operator: "not.is",
            value: null,
        }),
    };

    const { data: posts, error } = await supabase
        .from("posts")
        .select(`*, profiles:profile_id(*),  likesPost(*),  comments(*, profiles:profile_id(*))`)
        .eq(`${type !== "user_likes" ? "profile_id" : "likesPost.profile_id"}`, profileId)
        .order("created_at", { ascending: false })
        .filter(filter.column!, filter.operator!, filter.value)
        .range(pageParam - POST_PER_PAGE, pageParam);

    if (error) {
        toast.error("Error al cargar los posts");
        return {
            success: false,
            error,
        };
    }
    // Filtrar los comentarios que tengan parent_comment_id en null
    const filteredPosts = posts?.map(post => ({
        ...post,
        comments: post.comments.filter((comment: Comments) => comment.parent_comment_id === null),
    }));

    return filteredPosts;
};
