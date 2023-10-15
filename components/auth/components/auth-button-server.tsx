import React from "react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import AuthButton from "./auth-button";

export default async function AuthButtonServer() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <div className=" lg:last:absolute lg:last:bottom-10 grid place-content-center p-4 transition-all duration-300 ease-linear w-full [&>button>svg]:hover:fill-current [&>button>svg]:hover:stroke-current dark:hover:bg-black/50 light:hover:bg-gray-400 chill:hover:bg-[#1e1f27]">
            <AuthButton session={session} />
        </div>
    );
}
