import { Post } from "@/context/types";
import svgs from "@/data/svgs";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const insertComment = async ({ text, parent_comment_id, post_id }: { text: string; parent_comment_id: any; post_id: Post["id"] }) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user === null) return;

    const { data: comment, error: postError } = await supabase
        .from("comments")
        .insert({
            text: text,
            parent_comment_id: parent_comment_id ?? null,
            post_id: post_id,
            profile_id: user?.id,
        })
        .select()
        .single();

    if (postError) {
        console.log(postError);
        toast.error("Ha ocurrido un error!", {
            style: {
                border: "1px solid rgb(185 28 28)",
                color: "rgb(185 28 28)",
                backgroundColor: "#181920",
            },
            icon: "🗨",
            iconTheme: {
                primary: "rgb(185 28 28)",
                secondary: "#FFFAEE",
            },
        });

        return;
    }

    toast.success("Comentario insertado exitosamente!", {
        style: {
            border: "1px solid rgb(64 245 200)",
            color: "rgb(64 245 200)",
            backgroundColor: "#181920",
        },
        icon: "🗨",
        iconTheme: {
            primary: "rgb(64 245 200)",
            secondary: "#FFFAEE",
        },
    });
    return comment;
};

export const createComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: insertComment,
        onMutate: async (newComment: any) => {
            await queryClient.cancelQueries({
                queryKey: ["comments"],
            });

            const previousComment = queryClient.getQueryData(["comments"]);

            queryClient.setQueryData(["comment"], (oldData?: any[]): any[] => {
                const newCommentToAdd = structuredClone(newComment);

                if (oldData == null) return [newCommentToAdd];

                return [...oldData, newCommentToAdd];
            });

            return { previousComment };
        },

        onError: (error, variables, context) => {
            console.error(error);
            if (context?.previousComment != null) {
                queryClient.setQueryData(["comments"], context.previousComment);
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries(["posts"]);
        },

        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        retry: 3,
    });
};
