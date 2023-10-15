"use client";

import React, { useEffect } from "react";

import TryAgain from "@/components/ui/TryAgain";

import Loading from "@/components/ui/Loading";
import { supabase } from "@/utils/supabase";
import { InfinitePosts } from "./infinite-posts";
import { useInfinitePosts } from "@/hooks/usePosts";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function PostsClient({ queryKey, userId, session, type }: { queryKey: string[]; userId?: string; session: Session | null; type: string }) {
    const {
        data: posts,
        isError,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        isSuccess,
        hasNextPage,
        refetch,
    } = useInfinitePosts({ queryKey: queryKey, userId, type });

    useEffect(() => {
        const messageSubscription = supabase
            .channel("posts")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "INSERT",
                    table: "posts",
                    // filter: `chatroom_id=in.(${conversationData?.chats?.map(({ chatroom_id }) => chatroom_id).join(",")})`,
                },
                ({ new: message }) => {
                    refetch();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(messageSubscription);
        };
    }, []);

    if (isError) {
        return <TryAgain />;
    }
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {posts !== undefined ? (
                <InfinitePosts
                    queryKey={queryKey}
                    isReply={false}
                    session={session}
                    posts={posts}
                    fetchNextPage={fetchNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isSuccess={isSuccess}
                    hasNextPage={hasNextPage}
                />
            ) : (
                <span>No se pudo cargar los posts</span>
            )}
        </>
    );
}
