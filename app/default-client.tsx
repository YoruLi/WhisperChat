import React from "react";
import FaqSection from "@/components/faq-section";
import NewUserRegisterForm from "@/components/auth/components/new-user-register-form";
import Posts from "@/components/posts/Posts";

export default function DefaultClient() {
  return (
    <>
      <div className="inline top-0 lg:sticky left-0 h-full w-full py-6 pl-6">
        <FaqSection />
      </div>
      <main className="flex flex-col xl:flex-row max-h-[calc(100dvh-175px)] h-full lg:max-h-screen w-full xl:gap-0  lg:p-7  gap-3  ">
        <div className="xl:hidden block w-full flex-1 shrink-0 ">
          <NewUserRegisterForm />
        </div>
        <div className=" max-w-xl mx-auto h-full w-full flex flex-col [&>*:nth-child(2)]:mt-3 flex-1  shrink-0   ">
          {/* @ts-expect-error Server Component */}
          <Posts queryKey={["posts"]} session={null} type={"user_posts"} />
        </div>
      </main>
    </>
  );
}
