import React from "react";

import FollowButton from "@/components/follow-button";
import ProfilePicture from "@/components/profile-picture";
import GoBack from "@/components/ui/go-back";
import { Profile } from "@/types/schemas";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function page() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const userSuggestions = async (id: string | undefined) => {
        const { data, error } = await supabase.rpc("getusersuggestions", {
            userid: id,
        });
        if (error) {
            return {
                success: false,
                error,
            };
        }

        return data;
    };
    const data: Profile[] = await userSuggestions(session?.user.id);

    return (
        <div className="relative flex flex-col mx-auto items-center justify-center max-w-2xl w-full h-full">
            <div className="flex items-center w-full">
                <GoBack />
                <h2 className="my-4 mx-auto text-center text-clamp-paragraph-header-title text-whisper font-semibold">Sugeridos para ti</h2>
            </div>
            {data.map(({ id, email, full_name, profile_picture }) => {
                return (
                    <div key={id} className="flex flex-shrink-0  gap-4 justify-between items-center w-full ">
                        <div className="flex gap-4 items-center w-full">
                            <div className="">
                                <ProfilePicture email={email} profile_picture={profile_picture} />
                            </div>
                            <div className="overflow-hidden w-full">
                                <p className="text-base font-medium text-slate-200 truncate">{full_name ?? "@" + email.split("@")[0]}</p>
                                <p className="text-sm font-medium text-slate-500  truncate">{email}</p>
                            </div>
                            <div>
                                <FollowButton session_id={session?.user.id} user_id={id} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
