import React, { Suspense } from "react";
import { supabase } from "@/utils/supabase";

import Loading from "../loading";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Chat from "@/components/messages/components/chat";

export async function generateMetadata({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  return { title: `${chatId} | chat` };
}

interface PageProps {
  params: {
    chatId: string;
  };
}

// obtener pre info al abrir el chat

export default async function page({ params: { chatId } }: PageProps) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return null;
  }
  return <Chat senderId={session?.user.id} receiverId={chatId} />;
}
