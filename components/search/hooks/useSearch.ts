import React from "react";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));
export const searchQuery = async (query: string, session: any) => {
    delay(2000);

    if (!session) {
        const { data, error } = await supabase.from("profiles").select().ilike("email", `${query}%`);
        if (error) {
            return { success: false, error };
        }

        return data.map(result => ({ ...result, created_at: new Date(result.created_at) }));
    }

    const { data, error } = await supabase.from("profiles").select().neq("id", session?.user.id).ilike("email", `${query}%`);
    if (error) {
        return { success: false, error };
    }

    return data.map(result => ({ ...result, created_at: new Date(result.created_at) }));
};

export const useSearch = (query: string, searchFunction: any, session: any) => {
    return useQuery(
        ["search", query],
        async () => {
            return searchFunction(query, session);
        },
        {
            refetchOnWindowFocus: false,
            enabled: !!query,
        }
    );
};
