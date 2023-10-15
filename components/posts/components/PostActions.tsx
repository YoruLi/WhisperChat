import React from "react";
import CommentButton from "../actions/comment-button";
import LikeButton from "../actions/like-button";
import RepostButton from "../actions/repost-button";
import ShareButton from "../actions/share-button";
import { cn } from "@/utils/cn";
import { PostResponse } from "@/types/contexts/data";

export default function PostActions({
    post,
    isReply = false,
    className,
    session,
    queryKey,
}: {
    post: PostResponse;
    isReply?: boolean;
    className?: any;
    session?: any;
    queryKey: string[];
}) {
    return (
        <div
            className={cn(
                `flex w-full  justify-between items-center  gap-4  [&>span]:text-xs [&>div]:flex [&>div]:whitespace-nowrap  p-2  [&>div]:items-center [&>div]:gap-1 `,
                className
            )}
            onKeyDown={e => {
                e.stopPropagation();
            }}
            role="group"
        >
            <CommentButton post={post} session={session} />
            <LikeButton post={post} session={session} queryKey={queryKey} />
            {!isReply && (
                <>
                    <RepostButton />
                    <ShareButton />
                </>
            )}
        </div>
    );
}
