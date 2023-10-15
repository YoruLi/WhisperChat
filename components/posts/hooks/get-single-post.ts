import { supabase } from "@/utils/supabase";

export const getPost = async (postId: string) => {
    const { data: post, error } = await supabase
        .from("posts")
        .select(`*, profiles:profile_id(*),  likesPost(*),  comments(*, profiles:profile_id(*))`)
        .eq("id", postId)
        .filter("comments.parent_comment_id", "is", null)
        .single();
    if (error) {
        console.error(error);
        return {
            success: false,
            error,
        };
    }

    return post;
};
