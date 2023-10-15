"use client";
import React from "react";

import svgs from "@/data/svgs";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import SvgIcon from "@/components/SvgIcon";

export default function newUserRegisterForm() {
  const router = useRouter();
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
    <div className="min-w-[360px] max-w-lg max-h-[221px] h-full border-[1px] light:border-slate-300 dark:border-slate-700 chill:border-slate-700  [box-shadow:_1px_1px_10px_1px_rgba(0,0,0,0.1)]  rounded-none lg:rounded-md px-3 py-3 sticky top-0 right-0 mx-auto">
      <div className="flex flex-col gap-2.5  px-4 w-full">
        <div className="flex flex-col w-full gap-2">
          <h2 className="inline-block text-lg font-semibold dark:text-current chill:text-current light:text-slate-800">
            Eres nuevo en Whisper?
          </h2>
          <span className="text-xs text-slate-500">
            Registrate para disfrutar con tus amigos!
          </span>

          <div className="flex flex-col gap-1.5 w-full mx-auto">
            <button
              className="hover:bg-[#0c080f] bg-black py-2 pl-6 text-slate-300 rounded-full transition-colors duration-500 flex items-center  gap-2 "
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
              className="hover:bg-[#0c080f] bg-black py-2 pl-6 text-slate-300 rounded-full transition-colors duration-500 flex items-center  gap-2 "
              onClick={() => signInWithProvider("github")}
            >
              <SvgIcon
                viewBox={svgs.gitHubProvider.viewBox}
                path={svgs.gitHubProvider.path}
                className="stroke-none"
              />
              GitHub
            </button>

            <button
              className="hover:bg-[#0c080f] bg-black py-2 pl-6 text-slate-300 rounded-full transition-colors duration-500 flex items-center  gap-2 "
              onClick={() => router.push("/auth")}
            >
              Crea tu cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
