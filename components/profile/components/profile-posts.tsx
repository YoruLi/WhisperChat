import Posts from "@/components/posts/Posts";
import React from "react";
import ProfileNavigation from "./profile-navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileComments from "./profile-comments";

export default async function ProfilePosts({
  userId,
  type,
  queryKey,
}: {
  userId: string;
  type: string;
  queryKey: string[];
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="max-w-full order-2 lg:w-[36rem] w-full mx-auto min-h-[calc(100dvh+275px)] lg:min-h-screen   flex flex-col  ">
      <div className=" sticky top-0 left-0 py-4 backdrop-blur-sm  w-full dark:bg-black light:bg-white  chill:bg-[#181920f4] z-30 ">
        <ProfileNavigation id={userId} />
      </div>

      <div className="h-full">
        {type !== "comments" ? (
          <>
            {/* @ts-ignore*/}
            <Posts
              userId={userId}
              type={type}
              queryKey={queryKey}
              session={session}
            />
          </>
        ) : (
          <ProfileComments userId={userId} session={session} />
        )}
      </div>
    </div>
  );
}
