"use client";
import { motion } from "framer-motion";
import Spinner from "../../spinner";
import Post from "./Post";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostgrestError, Session } from "@supabase/supabase-js";
import { PostResponse } from "@/types/contexts/data";
import { InfiniteData } from "@tanstack/react-query";
import { container, variants } from "@/utils/framer/infinite-data";

interface Props {
    posts: InfiniteData<PostResponse[] | { success: boolean; error: PostgrestError }> | undefined;
    isSuccess: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    session?: Session | null;
    hasNextPage: boolean | undefined;
    isReply: boolean;
    queryKey: string[];
}

export const InfinitePosts = ({ posts, isFetchingNextPage, isSuccess, fetchNextPage, hasNextPage, isReply, session, queryKey }: Props) => {
    if (isSuccess && posts?.pages && Array.isArray(posts.pages[0]) && posts.pages[0].length === 0) {
        return <span className="text-center block text-xs my-4 text-slate-400">{isReply ? "No hay comentarios." : "No hay posts"}</span>;
    }

    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <>
            {isSuccess && (
                <motion.div variants={container} initial="hidden" animate="show">
                    {posts?.pages?.map(
                        (page, pageIndex) =>
                            Array.isArray(page) &&
                            page?.map((post: PostResponse, index: number) => {
                                return (
                                    <motion.div
                                        ref={index === page.length - 1 ? ref : undefined}
                                        variants={variants}
                                        custom={index}
                                        animate="show"
                                        initial="hidden"
                                        key={post.id}
                                        className={` light:border-slate-300 dark:border-slate-700 chill:border-slate-700  ${
                                            isReply ? " border-b" : " border-b-0 last:border-b "
                                        } last:mb-3 border`}
                                    >
                                        <Post post={post} isReply={isReply} session={session} queryKey={queryKey} />
                                    </motion.div>
                                );
                            })
                    )}
                </motion.div>
            )}

            {isFetchingNextPage && <Spinner />}
        </>
    );
};
