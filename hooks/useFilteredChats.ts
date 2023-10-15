import { Chat } from "@/context/types";
import React, { useMemo, useState } from "react";

export default function useFilteredChats(chats: Chat[]) {
    const filteredChats = useMemo(() => {
        console.log(chats);
        if (!chats || chats.length === 0) return;

        return chats?.sort((a, b) => b.last_message.created_at - a.last_message.created_at);
    }, [chats]);

    return {
        filteredChats,
    };
}
