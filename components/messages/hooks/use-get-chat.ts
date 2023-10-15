"use client ";
import { MESSAGES } from "@/constants";
import { supabase } from "@/utils/supabase";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const getChat = async (profile_id: string) => {
  const { data, error } = await supabase.rpc("get_single_chat_info", {
    user_id: profile_id,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
};

export const useGetChat = (id: string) => {
  return useQuery(
    ["chats", id],
    async () => {
      return getChat(id);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

const getMessages = async ({
  chatroomId,
  pageParam,
}: {
  chatroomId: string;
  pageParam: number;
}) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*, author:profile_id(*)")
    .eq("chatroom_id", chatroomId)
    .order("created_at", { ascending: false })
    .range(pageParam - MESSAGES, pageParam - 1);

  if (error) {
    toast.error("Error al cargar los mensajes");
    return {
      success: false,
      error,
    };
  }

  return [...data].reverse();
};

export const useInfiniteMessages = ({ chatroomId }: { chatroomId: string }) => {
  const data = useInfiniteQuery(
    ["messages", chatroomId],
    ({ pageParam = 1 }) =>
      getMessages({ chatroomId: chatroomId, pageParam: pageParam * MESSAGES }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (Array.isArray(lastPage)) {
          if (lastPage.length < MESSAGES) return;

          return lastPage.length === 0 ? undefined : allPages.length + 1;
        }
        return undefined;
      },

      refetchOnWindowFocus: false,
    }
  );

  return data;
};
