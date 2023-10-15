"use client";
import React from "react";
import SuggestedForYou from "../suggested-for-you";
import { Session } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import NewUserRegisterForm from "../auth/components/new-user-register-form";

export default function Aside({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const utilsRoutes = ["/chats", "/configs", "/auth", `/suggested`];
  const isDynamicChatRoute = /\/chats/.test(pathname);

  return (
    <aside className="top-0 self-start hidden xl:block right-0 sticky h-full max-w-sm lg:h-[100dvh] py-6 px-4 ">
      {session && !utilsRoutes.includes(pathname) && !isDynamicChatRoute ? (
        <>
          <SuggestedForYou session={session} />
        </>
      ) : null}
      {!session && <NewUserRegisterForm />}
    </aside>
  );
}
