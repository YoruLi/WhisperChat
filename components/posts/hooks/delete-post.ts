import { InfinitePosts, PostResponse } from "@/types/contexts/data";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deletePost = async (postId: string) => {
    const { data: post, error: postError } = await supabase.from("posts").delete().eq("id", postId);

    if (postError) {
        console.error(postError);

        toast.error("Error al eliminar post!", {
            style: {
                border: "1px solid rgb(185 28 28)",
                color: "rgb(185 28 28)",
                backgroundColor: "#181920",
            },
            icon: "✖",
            iconTheme: {
                primary: "rgb(185 28 28)",
                secondary: "#FFFAEE",
            },
        });
        return { success: false, error: postError };
    }

    return { success: true };
};

const deleteComment = async (commentId: string) => {
    const { data: comment, error: commentError } = await supabase.from("comments").delete().eq("id", commentId);

    if (commentError) {
        console.error(commentError);

        toast.error("Error al eliminar post!", {
            style: {
                border: "1px solid rgb(185 28 28)",
                color: "rgb(185 28 28)",
                backgroundColor: "#181920",
            },
            icon: "✖",
            iconTheme: {
                primary: "rgb(185 28 28)",
                secondary: "#FFFAEE",
            },
        });
        return { success: false, error: commentError };
    }

    return { success: true };
};

export const useDeletePost = (closeModal: () => void, queryKey: string[], isReply: boolean) => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id }: { id: string }) => {
            return isReply ? deleteComment(id) : deletePost(id);
        },

        {
            onMutate: ({ id }) => {
                const prevData: InfinitePosts<PostResponse | undefined> | undefined = queryClient.getQueryData(queryKey);

                if (prevData && !prevData.pages) {
                    return (window.location.href = "/home");
                }
                const updatedData = {
                    ...prevData,
                    pages: prevData?.pages?.map(page => page.filter(post => post?.id !== id)),
                };

                queryClient.setQueryData(queryKey, updatedData);

                return { prevData, context: { id } };
            },
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(queryKey);
            },

            onError: error => {
                console.error(error);
            },

            onSettled: () => {
                closeModal();
            },
        }
    );
};
