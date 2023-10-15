"use client";

import React from "react";

import svgs from "@/data/svgs";

import { supabase } from "@/utils/supabase";
import SvgIcon from "@/components/SvgIcon";

export default function AuthProviderButtons() {
  const signInWithProvider = async (provider: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        className="hover:bg-[#0c080f] bg-black p-3 rounded-md transition-colors duration-500 flex text-white items-center justify-center gap-2 "
        onClick={() => signInWithProvider("google")}
      >
        <SvgIcon
          viewBox={svgs.googleProvider.viewBox}
          path={svgs.googleProvider.path}
          className="stroke-none"
        />
        Google
      </button>
      <button
        className="hover:bg-[#0c080f] bg-black p-3 rounded-md transition-colors duration-500 text-white flex items-center justify-center gap-2 "
        onClick={() => signInWithProvider("github")}
      >
        <SvgIcon
          viewBox={svgs.gitHubProvider.viewBox}
          path={svgs.gitHubProvider.path}
          className="stroke-none"
        />
        GitHub
      </button>
    </div>
  );
}
