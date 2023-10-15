import { Chat, LastMessage } from "@/context/types";
import { Profile } from "@/types/schemas";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const getChats = async (profileId: string | undefined) => {
    const { data: chats, error } = await supabase.rpc("get_profile_chats", {
        p_id: profileId,
    });

    if (error) {
        console.error(error);
        return { success: false, error };
    }

    return chats.map(({ chat, last_message, profile }: { chat: Chat; last_message: LastMessage; profile: Profile }) => ({
        ...chat,
        last_message: { ...last_message, created_at: new Date(last_message.created_at) },
        profile,
    }));
};
export const useGetChats = (profileId: string | undefined) => {
    return useQuery(
        ["chats", profileId],
        async () => {
            return getChats(profileId);
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};
