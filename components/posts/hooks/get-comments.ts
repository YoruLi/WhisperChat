import { supabase } from "@/utils/supabase";

export const getUserComments = async (profileId: string | undefined) => {
    const { data: comments, error } = await supabase
        .from("comments")
        .select(`*, profiles:profile_id(*), posts:posts(*, author:profile_id(*))`)
        .eq("profile_id", profileId);

    if (error) {
        console.error(error);
        return {
            success: false,
            error,
        };
    }

    return comments;
};
