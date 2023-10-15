"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "./get-user";
import { supabase } from "@/utils/supabase";

export const useUser = ({ userId, initialUser }: { userId: string; initialUser?: any }) => {
    const queryClient = useQueryClient();
    return useQuery(
        ["users", userId],
        async () => {
            return getUser({ userId });
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                queryClient.setQueryData(["users", userId], data);
            },
            initialData: initialUser ?? undefined,
        }
    );
};

const userSuggestions = async (id: string | undefined) => {
    const { data, error } = await supabase.rpc("getusersuggestions", {
        userid: id,
    });
    if (error) {
        return {
            success: false,
            error,
        };
    }

    return data;
};

export const useUserSuggestions = ({ userId }: { userId: string }) => {
    const queryClient = useQueryClient();
    return useQuery(
        ["suggestions", userId],
        async () => {
            return userSuggestions(userId);
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                queryClient.setQueryData(["suggestions", userId], data);
            },
        }
    );
};
