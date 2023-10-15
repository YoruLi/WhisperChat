"use client";
import React from "react";
import Post from "./Post";
import Comments from "@/components/comments";
import { usePost } from "@/hooks/usePost";
import TryAgain from "@/components/ui/TryAgain";
import { Session } from "@supabase/auth-helpers-nextjs";
import Spinner from "@/components/spinner";

export default function SinglePostWithComments({ postId, session }: { postId: string; session: Session | null }) {
    const { data: post, isError, isLoading, isSuccess } = usePost(postId);

    if (isError) {
        return <TryAgain />;
    }

    if (isLoading) {
        return <Spinner />;
    }
    return (
        isSuccess && (
            <div className=" md:max-w-xl  mx-auto h-full w-full  ">
                <div className=" pb-8 flex flex-col gap-3">
                    <div className=" border chill:border-slate-700 dark:border-slate-700 light:border-slate-300 rounded-lg">
                        <Post post={post} session={session} queryKey={["posts", postId]} />
                    </div>

                    <span className="text-slate-400">Comentarios</span>
                    <div className=" border chill:border-slate-700 dark:border-slate-700 light:border-slate-300  rounded-lg">
                        <Comments post={post} session={session} />
                    </div>
                </div>
            </div>
        )
    );
}
