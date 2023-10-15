import SvgButton from "@/components/SvgButton";
import { useJoinWhisperModal } from "@/components/auth/stores/use-join-whisper-modal";

import { Post } from "@/context/types";
import svgs from "@/data/svgs";

import { useCreatePostModal } from "@/components/posts/stores/use-create-post";
import { Session } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { PostResponse } from "@/types/contexts/data";

export default function CommentButton({ post, session }: { post: PostResponse; session: Session | null }) {
    const openModal = useCreatePostModal(state => state.openModal);
    const setParentPost = useCreatePostModal(state => state.setParentPost);
    const setStatusId = useCreatePostModal(state => state.setStatusId);
    const setPlaceholder = useCreatePostModal(state => state.setPlaceholder);
    const JoinWhisperModal = useJoinWhisperModal(state => state.setData);

    return (
        <div className="flex flex-row">
            <SvgButton
                path={svgs.commentsIcon.path}
                ariaLabel={svgs.commentsIcon.ariaLabel}
                viewBox={svgs.commentsIcon.viewBox}
                onClick={(e: any) => {
                    e.stopPropagation();
                    if (!session) {
                        JoinWhisperModal({
                            isModalOpen: true,
                            action: "comment",
                        });
                    } else {
                        setParentPost(post);
                        setPlaceholder("Responder");
                        openModal();
                        setStatusId(post.id);
                    }
                }}
                className={`hover:stroke-current !fill-transparent stroke-[2px] focus:stroke-current `}
                size="w-5 h-5"
            />
            <span className="text-sm font-serif leading-none light:text-black dark:text-current chill:text-current  inline-flex  min-w-[30px]">{`${
                post?.comments?.length > 0 ? `${post.comments.length}` : ""
            } `}</span>
        </div>
    );
}
