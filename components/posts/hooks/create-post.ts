import { toast } from "react-hot-toast";
import { postMedia } from "./post-media";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InfinitePosts, PostResponse } from "@/types/contexts/data";
import { Session } from "@supabase/auth-helpers-nextjs";

export const insertPost = async ({ text, files }: { text: string; files: any[] }) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user === null) return;
    try {
        let media: string[] = [];
        if (files) {
            media = await postMedia(files, supabase);
        }

        const { data: post, error: postError } = await supabase
            .from("posts")
            .insert({
                text: text,
                media: media.length > 0 ? media : null,
                profile_id: user?.id,
            })

            .select("*, profiles:profile_id(id, email, profile_picture, full_name), likesPost(*)")
            .single();

        if (postError) {
            return toast.error("Error al insertar post!", {
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
        }

        toast.success("Post insertada exitosamente!", {
            style: {
                border: "1px solid rgb(64 245 200)",
                color: "rgb(64 245 200)",
                backgroundColor: "#181920",
            },
            icon: "🎉",
            iconTheme: {
                primary: "rgb(64 245 200)",
                secondary: "#FFFAEE",
            },
        });
        return post;
    } catch (error) {
        console.error(error);
    }
};

export const createPost = (session: Session | null) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: insertPost,
        onMutate: async data => {
            const previousPosts: PostResponse | undefined = queryClient.getQueryData(["posts"]);

            queryClient.setQueryData(["posts"], (oldData: InfinitePosts<PostResponse> | undefined): InfinitePosts<PostResponse> => {
                const { pages } = oldData || { pages: [] };
                const lastPage = (pages && pages[pages?.length - 1]) || [];

                const postInfo = pages?.map(page => page?.find(p => p?.profile_id === session?.user.id));
                let newPost;
                if (postInfo && postInfo[0] !== undefined) {
                    newPost = {
                        id: crypto.randomUUID(),
                        text: data.text,
                        media: data.files,
                        profiles: postInfo[0].profiles,
                        preview: false,
                        likesPost: [],
                        parent_comment_id: "",
                    };
                } else {
                    newPost = {
                        id: crypto.randomUUID(),
                        text: data.text,
                        media: data.files,
                        profiles: {
                            email: session?.user.email || "",
                            profile_picture: session?.user.user_metadata.profile_picture,
                            created_at: "",
                            full_name: null,
                            id: "",
                            last_seen: null,
                            status: null,
                        },
                        preview: false,
                        likesPost: [],
                        parent_comment_id: "",
                    };
                }

                const newPostToADD = structuredClone(newPost);
                newPostToADD.preview = true;

                const updatedLastPage = [newPostToADD, ...lastPage];
                const updatedData = {
                    ...oldData,
                    pages: pages ? [...pages.slice(0, -1), updatedLastPage] : [updatedLastPage],
                };

                return updatedData as InfinitePosts<PostResponse>;
            });

            return {
                previousPosts,
            };
        },

        onError: (error, variables, context) => {
            // // Rollback to the previous state in case of an error
            queryClient.setQueryData(["posts"], context?.previousPosts);
            console.log(error);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        },
    });
};
