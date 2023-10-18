"use client";
import React from "react";
import Search from "../../search/components/search";
import ChatList from "./chats-list";
import useFilteredChats from "@/hooks/useFilteredChats";
import { searchQuery } from "../../search/hooks/useSearch";
import { useGetChats } from "../hooks/use-get-chats";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function Chats({ session }: { session: Session | null }) {
  const {
    data: chats,
    isError,
    isLoading: chatsLoading,
  } = useGetChats(session?.user.id);

  const { filteredChats } = useFilteredChats(chats);

  return (
    <div
      className={` border-r-[1px] light:border-slate-300 border-slate-700 w-full h-full overflow-hidden lg:max-w-[330px] whitespace-nowrap z-20 `}
    >
      <div className="flex flex-col justify-center py-4 ">
        <h1
          className={` text-current font-anima mt-2 text-clamp-paragraph-header-title text-center `}
        >
          Whisper
        </h1>
        <Search
          placeholder="Busca un chat o inicia uno nuevo."
          searchFunction={searchQuery}
          session={session}
          variant="chats"
        />
      </div>
      <section className="overflow-y-auto  overflow-hidden min-h-[calc(100vh-210px)] max-h-[calc(100vh-210px)] ">
        <div
          {...(filteredChats?.length === 0 && {
            className:
              "grid place-items-center w-full min-h-[calc(100vh-210px)]",
          })}
        >
          {filteredChats?.length === 0 ? (
            <div>
              <h1 className="text-center font-bold text-sm text-current/70">
                Parece que aún no tienes ningún chat.
              </h1>
              <span className="text-center font-normal text-xs text-slate-400">
                ¡Inicia una conversación y conéctate con alguien hoy!
              </span>
            </div>
          ) : (
            <ChatList chats={filteredChats} isLoading={chatsLoading} />
          )}
        </div>
      </section>
    </div>
  );
}
