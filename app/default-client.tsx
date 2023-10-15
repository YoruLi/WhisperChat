import React from "react";
import FaqSection from "@/components/faq-section";
import NewUserRegisterForm from "@/components/auth/components/new-user-register-form";
import Posts from "@/components/posts/Posts";
import TitleWhisper from "@/components/ui/title-whisper";

export default function DefaultClient() {
  return (
    <>
      <main className="flex flex-col xl:flex-row max-h-[calc(100dvh-56px)] h-full lg:max-h-screen w-full xl:gap-0  py-7  gap-3  ">
        <div className="xl:hidden block w-full flex-1 shrink-0 ">
          <NewUserRegisterForm />
        </div>

        <div className=" max-w-xl mx-auto h-full w-full flex flex-col [&>*:nth-child(2)]:mt-3 flex-1  shrink-0   ">
          <TitleWhisper />
          {/* @ts-expect-error Server Component */}
          <Posts queryKey={["posts"]} session={null} type={"user_posts"} />
        </div>
      </main>
    </>
  );
}
