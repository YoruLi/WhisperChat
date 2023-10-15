"use client";
import React, { useState } from "react";
import { useFollow } from "./profile/components/hooks/use-follow";

import { useJoinWhisperModal } from "./auth/stores/use-join-whisper-modal";
import { Profile } from "@/types/schemas";
import { useUser } from "./profile/components/hooks/use-get-user";
import { Followers } from "@/types/contexts/data";

export default function FollowButton({ user_id, session_id }: { user_id: Profile["id"]; session_id: string | undefined }) {
    const { data: user, isError, isLoading } = useUser({ userId: user_id });
    const initialFollow = user ? user?.following?.some((follower: Followers) => follower.follower_id === session_id) : false;
    const [text, setText] = useState(initialFollow);
    const JoinWhisperModal = useJoinWhisperModal(state => state.setData);
    const isFollowing = text ? "siguiendo" : "seguir";
    const mutation = useFollow(!initialFollow);

    return (
        <div className="flex self-end ">
            <button
                className={` ${
                    text ? " w-32 hover:border-red-700 hover:shadow-red-600/30" : ""
                } bg-transparent rounded-full border-[1px] px-3 text-sm py-1 capitalize hover:shadow-current hover:text-current  text-slate-500 chill:border-slate-700 dark:border-slate-700 light:border-slate-300  hover:shadow-inner transition-shadow group/follow `}
                onClick={() => {
                    if (!session_id) {
                        return JoinWhisperModal({
                            isModalOpen: true,
                            action: "follow",
                        });
                    }
                    mutation.mutate({
                        follower_id: session_id,
                        following_id: user_id,
                    });

                    setText(!text);
                }}
            >
                <span className={`${text ? "group-hover/follow:hidden  text-current " : ""} block`}>{isFollowing}</span>
                <span className={`${text ? "group-hover/follow:block text-red-700" : ""} hidden`}>Dejar de seguir</span>
            </button>
        </div>
    );
}
