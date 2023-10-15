import React from "react";
import AsideIcons from "./aside/AsideIcons";

import Modals from "./Modals";
import AuthButtonServer from "./auth/components/auth-button-server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function SideBar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <aside className="chill:bg-[#181920] dark:bg-black light:bg-white fixed z-[51] bottom-0 left-0 lg:max-w-[71px] lg:min-w-[71px] w-full flex lg:sticky lg:top-0 lg:flex lg:flex-col  lg:border-r-[1px] lg:border-t-[0] border-t-[1px]  chill:border-slate-700 dark:border-slate-700 light:border-slate-300 lg:h-screen">
        <div className="flex lg:flex-col items-center w-full lg:h-full lg:py-16 dark:bg-black chill:bg-[#181920] light:bg-white">
          <div className="lg:py-14 flex lg:flex-col  justify-evenly items-center w-full">
            <AsideIcons session={session} />
            {/* @ts-expect-error Server Component */}
            <AuthButtonServer />
          </div>
        </div>
      </aside>
      <Modals session={session} />
    </>
  );
}
// bg-[rgb(14,14,18)]
