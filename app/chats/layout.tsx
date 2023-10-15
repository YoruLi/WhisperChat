import Chats from "@/components/messages/components/chats";
import WithOutChats from "@/components/ui/with-out-chats";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="relative flex w-full min-h-screen  ">
      <Chats session={session} />
      <WithOutChats />
      {children}
    </div>
  );
}
