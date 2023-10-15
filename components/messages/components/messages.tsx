import React, { useEffect, useRef, useState } from "react";
import Message from "./message";
import { useInfiniteMessages } from "../hooks/use-get-chat";
import Spinner from "@/components/spinner";
import { Chat } from "@/context/types";

export default function Messages({
    setShowImageModal,
    chat,
    profileId,
    containerRef,
}: {
    setShowImageModal: (data: unknown) => void;
    chat: Chat;
    containerRef: React.RefObject<HTMLElement>;
    profileId: string;
}) {
    const { data: messages, isLoading, isSuccess, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteMessages({ chatroomId: chat.chatroom_id });
    const [scrollHeight, setScrollHeight] = useState<number>(0);
    const messageRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (!containerRef.current) {
            return;
        }
        if (scrollHeight !== null) {
            containerRef.current.scrollTop = containerRef.current?.scrollHeight - scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();

        return () => scrollToBottom();
    }, [messages?.pages]);

    const handleScroll = () => {
        if (containerRef.current?.scrollTop === 0 && !isFetchingNextPage) {
            fetchNextPage();
            setScrollHeight(messageRef.current?.offsetTop ?? 0);
        }
    };

    useEffect(() => {
        containerRef?.current?.addEventListener("scroll", handleScroll);

        return () => {
            containerRef?.current?.removeEventListener("scroll", handleScroll);
        };
    }, [containerRef.current]);

    if (isLoading) {
        return <Spinner className="w-4 h-4 mt-4" />;
    }
    if (isSuccess && messages?.pages && Array.isArray(messages.pages[0]) && messages.pages[0].length === 0) {
        return <span className="text-center block text-xs my-4 text-slate-400">No hay mensajes</span>;
    }

    return (
        <>
            {!isFetchingNextPage && hasNextPage && (
                <button
                    disabled={isFetchingNextPage}
                    className="text-whisper relative top-0 text-sm cursor-pointer text-center w-full  hover:text-whisper/40"
                    onClick={() => fetchNextPage()}
                >
                    Cargar mas mensajes
                </button>
            )}
            <div className={`  min-h-[calc(100dvh-68px-67px)] w-full flex flex-col gap-3 py-3 px-4 justify-end  overflow-hidden  `}>
                {isFetchingNextPage && <Spinner className="w-4 h-4" />}

                {isSuccess &&
                    [...messages?.pages]?.reverse().map(
                        (page, pageIndex) =>
                            Array.isArray(page) &&
                            page?.map((message, index) => {
                                const ownMessage = profileId === message.profile_id;
                                const isLastMessage = pageIndex === messages.pages.length - 1 && index === page.length - 1;
                                return (
                                    <div key={message.id}>
                                        <Message
                                            setShowImageModal={setShowImageModal}
                                            message={message}
                                            ownMessage={ownMessage}
                                            isLastMessage={isLastMessage}
                                            messageRef={messageRef}
                                        />
                                    </div>
                                );
                            })
                    )}
            </div>
        </>
    );
}
