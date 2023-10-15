import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollow = (type: boolean) => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ follower_id, following_id }: { follower_id: string; following_id: string }) => {
            return type ? follow(follower_id, following_id) : unfollow(follower_id, following_id);
        },

        {
            onSuccess: () => {
                console.log("success");
            },

            onError: () => {
                console.log("error");
            },

            onSettled: () => {
                queryClient.invalidateQueries(["users"]);
            },
        }
    );
};

export const follow = async (follower_id: string, following_id: string) => {
    const { data, error } = await supabase
        .from("followers")
        .insert({
            follower_id,
            following_id,
        })
        .select();

    if (error) {
        return { success: false, error };
    }
    console.log(data);

    return data;
};

export const unfollow = async (follower_id: string, following_id: string) => {
    const { data, error } = await supabase.from("followers").delete().eq("follower_id", follower_id).eq("following_id", following_id);
    if (error) {
        return { success: false, error };
    }
    console.log(data);

    return data;
};
