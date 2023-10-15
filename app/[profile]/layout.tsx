import NewUserRegisterForm from "@/components/auth/components/new-user-register-form";
import { getUser } from "@/components/profile/components/hooks/get-user";

import ProfileInfoCard from "@/components/profile/components/profile-info-card-";
import ProfilePosts from "@/components/profile/components/profile-posts";
import SuggestedForYou from "@/components/suggested-for-you";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Metadata } from "next";
import { cookies } from "next/headers";

import React from "react";

export async function generateMetadata({
  params,
}: {
  params: {
    profile: string;
  };
}): Promise<Metadata> {
  const user = await getUser({
    userId: params.profile,
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `${user?.email?.split(" ")[0]} (@${user?.email?.split("@")[0]})`,
    description: user?.status,
  };
}

export default async function LayoutProfilePage({
  params,
  children,
}: {
  params: { profile: string };
  children: React.ReactNode;
}) {
  const userId = params.profile;
  const user = await getUser({
    userId: params.profile,
  });

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <ProfileInfoCard id={userId} initialUser={user} session={session} />

      <div className=" h-[100dvh] w-full max-h-[calc(100dvh)] lg:max-h-screen">
        <div className="flex flex-col xl:flex-row justify-around px-0 lg:px-4">
          <div className="xl:hidden block w-full">
            {session ? (
              <SuggestedForYou session={session} />
            ) : (
              <NewUserRegisterForm />
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
