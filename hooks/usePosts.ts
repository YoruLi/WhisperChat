import { getUserComments } from "@/components/posts/hooks/get-comments";
import { getUserPosts } from "@/components/posts/hooks/get-user-posts";
import { POST_PER_PAGE } from "@/constants";
import { Comments } from "@/types/schemas";
import { supabase } from "@/utils/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const getPosts = async ({ pageParam }: { pageParam: number }) => {
    const { data: posts, error } = await supabase
        .from("posts")
        .select(`*, profiles:profile_id(*),  likesPost(*),  comments(*, profiles:profile_id(*))`)
        .order("created_at", { ascending: false })
        .range(pageParam - 10, pageParam);

    if (error) {
        console.log("error", error);
        toast.error("Error al cargar los posts");
        return {
            success: false,
            error,
        };
    }

    // Filtrar los comentarios que tengan parent_comment_id en null
    const filteredPosts = posts?.map(post => ({
        ...post,
        comments: post.comments.filter((comment: Comments) => comment.parent_comment_id === null),
    }));

    return filteredPosts;
};

export const useInfinitePosts = ({ queryKey, userId, type }: { queryKey: string[]; userId?: string; type: string }) => {
    const data = useInfiniteQuery(
        queryKey,
        ({ pageParam = 1 }) =>
            userId !== undefined
                ? getUserPosts({ pageParam: pageParam * POST_PER_PAGE, profileId: userId, type: type })
                : getPosts({ pageParam: pageParam * 10 }),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (Array.isArray(lastPage)) {
                    if (lastPage.length < POST_PER_PAGE) return;

                    return lastPage.length === 0 ? undefined : allPages.length + 1;
                }
                return undefined;
            },
            refetchOnWindowFocus: false,
        }
    );

    return data;
};

const getComments = async ({ postId, pageParam }: { postId: string; pageParam: number }) => {
    const { data: commentsData, error } = await supabase
        .from("comments")
        .select(`*, profiles:profile_id(*)`)
        .eq(`${postId.hasOwnProperty("parent_comment_id") ? "parent_comment_id" : "post_id"}`, postId)
        .order("created_at", { ascending: false })
        .range(pageParam - 10, pageParam);

    if (error) {
        console.error(error);
        return {
            success: false,
            error,
        };
    }

    const commentsWithReplies = await Promise.all(
        commentsData.map(async comment => {
            const { data: replies, error: replyError } = await supabase
                .from("comments")
                .select("*, profiles:profile_id(*)")
                .eq("parent_comment_id", comment.id)
                .order("created_at", { ascending: false });

            return {
                ...comment,
                comments: replies || [],
            };
        })
    );

    const parentComments = commentsWithReplies.filter(comment => !comment.parent_comment_id);
    const childComments = commentsWithReplies.filter(comment => comment.parent_comment_id);

    return parentComments.length === 0 && childComments.length > 0 ? childComments : parentComments;
};

export const useInfiniteComments = ({ queryKey, postId, userId }: { queryKey: string[]; postId: string | undefined; userId?: string | undefined }) => {
    const data = useInfiniteQuery(
        queryKey,
        ({ pageParam = 1 }) => (postId === undefined ? getUserComments(userId) : getComments({ postId: postId, pageParam: pageParam * POST_PER_PAGE })),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (Array.isArray(lastPage)) {
                    if (lastPage.length < POST_PER_PAGE) return;

                    return lastPage.length === 0 ? undefined : allPages.length + 1;
                }
                return undefined;
            },
            refetchOnWindowFocus: false,
        }
    );

    return data;
};
