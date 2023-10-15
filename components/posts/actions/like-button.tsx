import React from "react";
import SvgButton from "@/components/SvgButton";
import { likesPost } from "@/context/types";
import svgs from "@/data/svgs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "@supabase/auth-helpers-nextjs";

import { useJoinWhisperModal } from "@/components/auth/stores/use-join-whisper-modal";

import { cn } from "@/utils/cn";

import { InfinitePosts, PostResponse } from "@/types/contexts/data";
import { useToggleLike } from "./hooks/use-toggle-like";

export default function LikeButton({ post, session, queryKey }: { post: PostResponse; session: Session | null; queryKey: string[] }) {
    const JoinWhisperModal = useJoinWhisperModal(state => state.setData);

    const useLike = ({ post_id, profile_id }: { post_id: string; profile_id: string | undefined }) => {
        const queryClient = useQueryClient();

        return useMutation(
            ({ post_id, profile_id }: { post_id: string; profile_id: string }) => {
                return useToggleLike({ post_id, profile_id });
            },
            {
                onMutate: async ({ post_id }) => {
                    const prevData: InfinitePosts<PostResponse> | undefined = queryClient.getQueryData(queryKey);

                    if (prevData && !prevData.pages) {
                        const alreadyLiked = post.likesPost.some(like => like.profile_id === session?.user.id);
                        if (alreadyLiked) {
                            return {
                                ...post,
                                likesPost: post.likesPost.filter(like => like.profile_id !== profile_id),
                            };
                        } else {
                            // Add the like
                            return {
                                ...post,
                                likesPost: [...post.likesPost, { profile_id }],
                            };
                        }
                    }
                    const updatedData = {
                        ...prevData,
                        pages: prevData?.pages?.map(page =>
                            page.map(post => {
                                if (post.id === post_id) {
                                    const alreadyLiked = post.likesPost.some(like => like.profile_id === session?.user.id);
                                    if (alreadyLiked) {
                                        return {
                                            ...post,
                                            likesPost: post.likesPost.filter(like => like.profile_id !== profile_id),
                                        };
                                    } else {
                                        // Add the like
                                        return {
                                            ...post,
                                            likesPost: [...post.likesPost, { profile_id }],
                                        };
                                    }
                                }
                                return post;
                            })
                        ),
                    };

                    queryClient.setQueryData(queryKey, updatedData);

                    return { prevData, context: { post_id } };
                },

                onSettled: (data, error, variables, context) => {
                    if (!context?.prevData) {
                        return queryClient.invalidateQueries(queryKey);
                    }
                },

                onError: (error, variables, context) => {
                    // Rollback to the previous state in case of an error
                    queryClient.setQueryData(queryKey, context?.prevData);
                    console.log("error");
                    console.error(error);
                },
            }
        );
    };

    const hasLiked = post?.likesPost?.some((like: likesPost) => like.profile_id === session?.user.id);
    const mutation = useLike({ post_id: post?.id, profile_id: session?.user.id });

    return (
        <div className="flex flex-row ">
            <SvgButton
                path={svgs.likeIcon.path}
                viewBox={svgs.likeIcon.viewBox}
                aria-label={hasLiked ? "Unlike" : "Like"}
                data-title={hasLiked ? "Unlike" : "Like"}
                onClick={(e: any) => {
                    e.stopPropagation();
                    if (!session) {
                        JoinWhisperModal({
                            isModalOpen: true,
                            action: "like",
                        });
                    } else {
                        mutation.mutate({ post_id: post?.id, profile_id: session?.user?.id });
                    }
                }}
                className={cn(` stroke-[2px] likeButton  hover:stroke-inherit`, {
                    "like !text-inherit": hasLiked,
                    "!fill-transparent stroke-slate-500": !hasLiked,
                })}
                size="w-5 h-5"
            />
            <span className="text-sm font-serif inline-flex min-w-[30px] light:text-black chill:text-current dark:text-current ">{`${
                post?.likesPost?.length > 0 ? `${post.likesPost.length}` : ""
            } `}</span>
        </div>
    );
}
