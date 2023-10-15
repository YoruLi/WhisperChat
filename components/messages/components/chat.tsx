"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import MessageForm from "../../message-form";
import SvgButton from "../../SvgButton";
import svgs from "@/data/svgs";
import Image from "next/image";
import SupabaseContext from "@/context/SupabaseContext/SupabaseContext";
import { AnimatePresence, motion } from "framer-motion";
import useOptions from "@/hooks/useOptions";
import { useGetChat } from "../hooks/use-get-chat";
import TryAgain from "../../ui/TryAgain";
import { supabase } from "@/utils/supabase";
import { ChatInfo } from "@/types/contexts/data";
import { Chat } from "@/context/types";
import Messages from "./messages";
import HeaderChat from "./header-chat";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/utils/cn";
import NextButton from "./next-button";
import PrevButton from "./prev-button";
import { useReceiverInfo } from "../stores/use-receiver-info";
import ShowReceiverInfo from "./show-receiver.info";

export default function Chat({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  const { data, isError, isLoading, isSuccess } = useGetChat(receiverId);
  const { downloadImage } = useContext(SupabaseContext);
  const [showImageModal, setShowImageModal] = useState({ image: "", index: 0 });

  const showReceiverInfo = useReceiverInfo((state) => state.showReceiverInfo);
  const imageRefCurrent = useRef<HTMLDivElement | null>(null);
  const { optionsRef, handleShowAttach, showOptions, setShowOptions } =
    useOptions();
  const [zoom, setZoom] = useState(false);

  const conversationData: ChatInfo = data && data[0];
  const containerRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const messageSubscription = supabase
      .channel("test")
      .on(
        "postgres_changes",
        {
          schema: "public",
          event: "*",
          table: "messages",
        },
        ({ new: message }) => {
          console.log(message);
          queryClient.invalidateQueries(["messages"]);
          queryClient.invalidateQueries(["chats"]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [data]);

  const handleZoomInOut = () => {
    setZoom(!zoom);
  };
  const imageUrls =
    conversationData?.messages && conversationData?.messages.length > 0
      ? conversationData?.messages?.filter(
          ({ message }) => message.image_url && message.image_url.length > 0
        )
      : [];

  return (
    <>
      {isError ? (
        <TryAgain />
      ) : (
        <>
          {showOptions?.image && (
            <AnimatePresence>
              <motion.div
                initial={{ transitionDelay: "0.2", transitionDuration: "0.5" }}
                animate={{ backgroundColor: "rgba(8, 8, 8, 0.8)" }}
                className="absolute inset-0 z-[9999] h-full"
              >
                <div className="flex flex-col w-full min-h-[100dvh]   ">
                  <header className="px-3 py-3">
                    <div className="float-right flex items-center gap-4">
                      <SvgButton
                        path={svgs.x.path}
                        viewBox={svgs.x.viewBox}
                        onClick={() => {
                          setZoom(false);
                          setShowOptions({ image: "", index: 0 });
                        }}
                        size="w-8 h-8"
                      />
                    </div>
                  </header>
                  <main className="flex flex-row flex-1 justify-between items-center h-full w-full relative px-3 ">
                    <div className="relative">
                      <PrevButton
                        imageUrls={imageUrls}
                        setShowOptions={setShowOptions}
                        showOptions={showOptions}
                      />
                    </div>
                    <motion.div
                      ref={optionsRef}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="min-w-[302px] md:max-w-full h-[540px] flex items-center z-50 "
                    >
                      <Image
                        src={showOptions.image[0]}
                        alt="preview image"
                        width={400}
                        height={400}
                        placeholder="blur"
                        className={`${
                          zoom ? "scale-125 cursor-zoom-out " : "cursor-zoom-in"
                        }  min-w-full my-auto   max-w-full max-h-full`}
                        onClick={handleZoomInOut}
                        blurDataURL={
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUEJK4DQABiwEXUo0pUwAAAABJRU5ErkJggg=="
                        }
                      />
                    </motion.div>

                    <div className="relative">
                      <NextButton
                        imageUrls={imageUrls}
                        setShowOptions={setShowOptions}
                        showOptions={showOptions}
                      />
                    </div>
                  </main>

                  <div className="flex gap-2 overflow-x-scroll items-center justify-center  scrollbar flex-nowrap  py-3">
                    {imageUrls?.map(({ message }) =>
                      message.image_url?.map((url, index) => (
                        <div
                          ref={imageRefCurrent}
                          className={`${
                            showOptions.image[0] === url
                              ? "border-emerald-500 scale-90"
                              : "border-transparent"
                          } p-1.5 rounded-md hover:border-emerald-500 border-[2px] bg-slate-800`}
                          key={`${url}/${index}`}
                        >
                          <div className="w-16 h-16">
                            <Image
                              onClick={() => {
                                handleShowAttach({
                                  image: [url],
                                  index: index,
                                });
                              }}
                              src={url as string}
                              width={400}
                              height={400}
                              alt="image"
                              className="object-cover w-full h-full cursor-pointer"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          <div
            className={cn(
              `  fixed z-[52] lg:z-[49] lg:relative h-full lg:flex w-full`
            )}
          >
            <div className=" w-full flex flex-col h-[calc(100dvh)] lg:h-screen  fixed lg:relative ">
              <HeaderChat
                user={conversationData?.profile}
                isLoading={isLoading}
              />
              <main
                className="  dark:bg-black light:bg-white chill:bg-[#181920] scrollbar-main h-screen [overflow-y:overlay] relative "
                ref={containerRef}
              >
                {conversationData?.chat && (
                  <Messages
                    containerRef={containerRef}
                    setShowImageModal={handleShowAttach}
                    chat={conversationData?.chat}
                    profileId={senderId}
                  />
                )}
                {/* {showScrollArrow && (
                                    <div className="sticky float-right bottom-8 right-6  rounded-full bg-[#1e1f27]">
                                        <SvgButton path={svgs.downArrow.path} viewBox={svgs.downArrow.viewBox} onClick={scrollToBottom} size="w-8 h-8" />
                                    </div>
                                )} */}
              </main>

              <footer className=" w-full static bottom-auto mt-auto ">
                <MessageForm
                  conversation={conversationData}
                  senderId={senderId}
                  reiceverId={receiverId}
                />
              </footer>
            </div>

            {showReceiverInfo ? (
              <ShowReceiverInfo
                user={conversationData?.profile}
                isLoading={isLoading}
                messages={conversationData?.messages}
              />
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
