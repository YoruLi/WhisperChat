import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import React, { useState } from "react";
import PostAuthorActions from "./post-author-options";

import { motion } from "framer-motion";
import PostVisitorActions from "./post-visitor-actions";
import { Session } from "@supabase/auth-helpers-nextjs";
import { PostResponse } from "@/types/contexts/data";

export default function PostOptions({
    post,
    session,
    queryKey,
    isReply,
}: {
    post: PostResponse;
    session?: Session | null;
    queryKey: string[];
    isReply: boolean;
}) {
    const [modalOptionsOpen, setModalOptionsOpen] = useState(false);
    const closeModal = () => setModalOptionsOpen(false);
    const container = {
        hidden: {
            y: 0,
        },

        show: {
            y: 0,

            transition: { delayChildren: 0.3, staggerChildren: 0.2 },
        },
    };

    return (
        <div
            onKeyDown={e => {
                e.stopPropagation();
            }}
            onClick={e => {
                e.stopPropagation();
            }}
            className="relative select-none"
        >
            <SvgButton
                aria-expanded={modalOptionsOpen}
                aria-haspopup="menu"
                viewBox={svgs.options.viewBox}
                path={svgs.options.path}
                className="rotate-90 chill:fill-slate-400 dark:fill-slate-400 light:fill-slate-500 hover:fill-current hover:stroke-current"
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setModalOptionsOpen(prev => !prev);
                }}
            />

            {modalOptionsOpen && (
                <div className="z-[9999]">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={container}
                        exit="hidden"
                        className="absolute top-2 right-1.5  z-[999] overflow-hidden rounded-xl font-semibold dark:bg-black light:bg-white chill:bg-[rgb(14,14,18)] border-slate-700 border"
                        onClick={e => e.stopPropagation()}
                    >
                        {post.profile_id === session?.user.id ? (
                            <PostAuthorActions post={post} closeModal={closeModal} queryKey={queryKey} isReply={isReply} />
                        ) : (
                            <PostVisitorActions post={post} queryKey={queryKey} session={session} />
                        )}
                    </motion.div>

                    <div
                        onClick={e => {
                            e.stopPropagation();
                            setModalOptionsOpen(false);
                        }}
                        className="fixed top-0 left-0 w-full h-full z-[998] cursor-default bg-transparent "
                    ></div>
                </div>
            )}
        </div>
    );
}
