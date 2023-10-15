import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

export const useToggleLike = async ({ post_id, profile_id }: { post_id: string; profile_id: string }) => {
    const { data: like, error } = await supabase.from("likesPost").select().eq("post_id", post_id).eq("profile_id", profile_id);
    if (error) {
        console.log(error);
        return;
    }

    if (like.length > 0) {
        const { data: likeDeleted, error: likeDeletedError } = await supabase.from("likesPost").delete().eq("post_id", post_id).eq("profile_id", profile_id);

        if (likeDeletedError) {
            console.log(likeDeletedError);
            return;
        }

        return likeDeleted;
    }
    const { data: isLiked, error: isLikedError } = await supabase
        .from("likesPost")
        .insert({
            post_id: post_id,
            profile_id: profile_id,
        })
        .select()
        .single();

    if (isLikedError) {
        toast.error("Ups, ocurrió un error. Por favor, inténtalo nuevamente.", {
            style: {
                border: "1px solid rgb(185 28 28)",
                color: "rgb(185 28 28)",
                backgroundColor: "#181920",
            },
            icon: "❤",
            iconTheme: {
                primary: "rgb(185 28 28)",
                secondary: "#FFFAEE",
            },
        });
        return { success: false, error };
    }

    toast.success("Me gusta agregado!", {
        style: {
            border: "1px solid rgb(64 245 200)",
            color: "rgb(64 245 200)",
            backgroundColor: "#181920",
        },
        icon: "❤",
        iconTheme: {
            primary: "rgb(64 245 200)",
            secondary: "#FFFAEE",
        },
    });
    return isLiked;
};
