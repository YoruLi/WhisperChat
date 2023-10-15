import { useCreateMessage } from "@/components/messages/hooks/use-send-message";

import { MutableRefObject, useRef, useState } from "react";

interface Props {
    senderId?: string;
    reiceverId?: string;
    conversation?: any;
    imageUrl?: File[];
    textCursor?: React.RefObject<HTMLInputElement>;
}
export default function useMessage({ senderId, reiceverId, conversation, imageUrl, textCursor }: Props) {
    const { messages, chat } = conversation || {};
    const [text, setText] = useState<string | "">("");
    const lastMessageRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    const {
        mutate,
        isError,
        isLoading: isSending,
        isSuccess,
    } = useCreateMessage({
        setText,
    });

    const handleSubmitMessage = () => {
        if (text !== "" || (imageUrl?.length && imageUrl?.length > 0)) {
            mutate({
                sender_profile_id: senderId,
                receiver_profile_id: reiceverId,
                chat: chat ?? null,
                message: text,
                files: imageUrl,
            });
            setText("");
            textCursor?.current?.focus();
        }
    };

    return { text, handleSubmitMessage, setText, lastMessageRef, isError, isSending, isSuccess };
}
