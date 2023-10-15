import { supabase } from "@/utils/supabase";

export const getUser = async ({ userId }: { userId: string }) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*, followers!follower_id(*), following:followers!following_id(*)")
        .eq("id", userId)
        .single();

    if (error) {
        return { success: false, error };
    }

    return data;
};
