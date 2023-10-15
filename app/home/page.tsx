import CreatePost from "@/components/create-post";
import Posts from "@/components/posts/Posts";
import FaqSection from "@/components/faq-section";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import React from "react";
import SuggestedForYou from "@/components/suggested-for-you";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <div className="  inline top-0 lg:sticky left-0 h-full w-full py-6 pl-6">
        <FaqSection />
      </div>
      <main className="flex flex-col xl:flex-row max-h-[calc(100dvh-175px)] h-full lg:max-h-screen w-full  xl:gap-0  lg:p-7   ">
        <div className="2xl:hidden relative w-full flex-1 shrink-0 ">
          <SuggestedForYou session={session} />
        </div>
        <div className=" max-w-xl mx-auto h-full w-full flex flex-col [&>*:nth-child(2)]:mt-3 flex-1  shrink-0   ">
          <CreatePost session={session} />
          {/* @ts-expect-error Server Component */}
          <Posts queryKey={["posts"]} session={session} type={"user_posts"} />
        </div>
      </main>
    </>
  );
}
