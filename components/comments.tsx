import React from "react";
import { useInfiniteComments } from "@/hooks/usePosts";

import { Post } from "@/context/types";
import Loading from "./ui/Loading";
import { Session } from "@supabase/auth-helpers-nextjs";
import { InfinitePosts } from "./posts/components/infinite-posts";

export default function Comments({ post, session, userId }: { post?: Post; session: Session | null; userId?: string }) {
    const queryKey = post === undefined ? ["comments", userId] : ["comments", post.id];

    const {
        data: commentsData,
        isError,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        isSuccess,
        hasNextPage,
    } = useInfiniteComments({ queryKey: queryKey as string[], postId: post?.id, userId: userId });

    if (isError) {
        return <strong className="text-center text-slate-600 ">Error al cargar los comentarios</strong>;
    }
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <InfinitePosts
                queryKey={queryKey as string[]}
                session={session}
                isReply={true}
                posts={commentsData}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isSuccess={isSuccess}
                hasNextPage={hasNextPage}
            />
        </>
    );
}
