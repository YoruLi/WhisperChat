"use client";
import React from "react";

import svgs from "@/data/svgs";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import SvgButton from "@/components/SvgButton";
export default function AuthButton({ session }: { session: Session | null }) {
    const router = useRouter();

    const logOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            {!session ? (
                <>
                    <SvgButton
                        ariaLabel={svgs.logInIcon.ariaLabel}
                        title={svgs.logInIcon.title}
                        path={svgs.logInIcon.path}
                        viewBox={svgs.logInIcon.viewBox}
                        className="stroke-[0.4px]"
                        onClick={() => router.push("/auth")}
                    />
                </>
            ) : (
                <SvgButton
                    ariaLabel={svgs.logOutIcon.ariaLabel}
                    title={svgs.logOutIcon.title}
                    path={svgs.logOutIcon.path}
                    viewBox={svgs.logOutIcon.viewBox}
                    className="stroke-[0.4px]"
                    onClick={logOut}
                />
            )}
        </>
    );
}
