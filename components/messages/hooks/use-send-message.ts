import { postMedia } from "@/components/posts/hooks/post-media";
import { Chat } from "@/context/types";
import { ChatInfo, InfiniteMessages, MessageData } from "@/types/contexts/data";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));
const sendMessageToChat = async ({
    sender_profile_id,
    receiver_profile_id,
    chat,
    message,
    files,
}: {
    sender_profile_id: string | undefined;
    receiver_profile_id: string | undefined;
    chat: Chat;
    message: string;
    files: File[] | undefined;
}): Promise<any> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user === null) return;
    try {
        let mediaInfo: string[] = [];
        if (files) {
            mediaInfo = await postMedia(files, supabase);
        }

        const { data, error } = await supabase
            .rpc("send_message_to_chat", {
                sender_profile_id: sender_profile_id,
                receiver_profile_id: receiver_profile_id,
                chat: chat,
                message: message,
                files: mediaInfo,
            })
            .single();
        if (error) {
            toast.error("Error al enviar el mensaje!", {
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
            return { success: false, error };
        }

        const { created_chat, inserted_message } = data as { created_chat: Chat; inserted_message: MessageData };
        const last_message = {
            ...inserted_message,
            created_at: inserted_message ? new Date(inserted_message.created_at) : null,
        };

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const useCreateMessage = ({ setText, setChoosenImages }: { setText: any; setChoosenImages?: any }) => {
    const queryClient = useQueryClient();

    return useMutation(
        ({
            sender_profile_id,
            receiver_profile_id,
            chat,
            message,
            files,
        }: {
            sender_profile_id: string | undefined;
            receiver_profile_id: string | undefined;
            chat: Chat;
            message: string;
            files: File[] | undefined;
        }) => {
            return sendMessageToChat({
                chat: chat,
                files: files,
                message: message,
                receiver_profile_id: receiver_profile_id,
                sender_profile_id: sender_profile_id,
            });
        },

        {
            onMutate: data => {
                queryClient.setQueryData(["messages"], (oldData: InfiniteMessages<MessageData> | undefined): InfiniteMessages<MessageData> => {
                    const { pages } = oldData || { pages: [] };
                    const lastPage = (pages && pages[pages?.length - 1]) || [];
                    const matchingMessage = pages?.map(page => page.find(item => item.profile_id === data.sender_profile_id)).filter(Boolean); // Filtrar para eliminar los valores undefined
                    const image = data?.files && data.files.length !== 0 ? URL.createObjectURL(data.files[0]) : null;

                    const newMessage = matchingMessage && { ...matchingMessage[0], content: data.message, image_url: image ? [image] : null };
                    const messageToAdd = structuredClone(newMessage);
                    messageToAdd!.preview = true;
                    const updatedLastPage = [...lastPage, messageToAdd];

                    // Clona la estructura existente y actualiza la última página
                    const updatedData = {
                        ...oldData,
                        pages: pages ? [...pages.slice(0, -1), updatedLastPage] : [updatedLastPage],
                    };

                    return updatedData as InfiniteMessages<MessageData>;
                });
            },

            onSuccess: async data => {
                queryClient.invalidateQueries(["messages"]);
            },

            onError: error => {
                console.error("error", error);
                toast.error("Ha ocurrido un error", {
                    style: {
                        backgroundColor: "#181920",
                        border: "1px solid rgb(185 28 28)",
                        color: "rgb(185 28 28)",
                    },
                });
            },

            onSettled: () => {
                setText("");
            },
        }
    );
};
