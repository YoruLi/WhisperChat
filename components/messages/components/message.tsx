"use client";

import { formatDate } from "@/data/formatDate";
import svgs from "@/data/svgs";
import Image from "next/image";
import React, { useState } from "react";
import VoiceAudio from "../../VoiceAudio";
import ProfilePicture from "../../profile-picture";
import { cn } from "@/utils/cn";
import Spinner from "@/components/spinner";

import { MessageData } from "@/types/contexts/data";

interface Props {
    message: MessageData;
    ownMessage: boolean;
    setShowImageModal: ({ image, index }: { image: string[] | null; index: number }) => void;
    isLastMessage: boolean;
    messageRef: React.RefObject<HTMLDivElement>;
}

export default function Message({ message, ownMessage, setShowImageModal, isLastMessage, messageRef }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className="flex flex-col gap-2 cursor-pointer  transition-opacity ">
                <div className={` ${ownMessage ? "justify-end" : ""} flex  gap-1 `}>
                    {!ownMessage && <ProfilePicture {...message?.author} classname="border-none" />}
                    <div
                        {...(isLastMessage && { ref: messageRef })}
                        className={cn(
                            `  group/svg flex py-1 px-1 justify-between items-center relative min-w-[75px] max-w-[85%] lg:max-w-[66.666667%] flex-col `,
                            {
                                "bg-current bg-current-darker rounded-ownmessage hover:opacity-90 ": ownMessage,
                                "bg-slate-800 hover:bg-slate-900 rounded-message": !ownMessage,
                                "opacity-75": message.preview,
                                "opacity-100": !message.preview,
                            }
                        )}
                    >
                        <span className={`absolute  top-0 w-[8px] h-[13px] ${ownMessage ? "-right-[8px] " : "-left-[8px]"}`}>
                            <svg
                                viewBox={svgs.MessageIcon.viewBox}
                                className={`${
                                    ownMessage
                                        ? "  group-hover/svg:fill-current/80 fill-current fill-darker"
                                        : " fill-slate-800 stroke-slate-800 group-hover/svg:fill-slate-900"
                                }`}
                            >
                                <path d={ownMessage ? svgs.ownMessageIcon.path : svgs.MessageIcon.path}></path>
                            </svg>
                        </span>
                        {!ownMessage && <span className="text-xs self-start px-2 text-current">{message?.author?.email}</span>}
                        <div className={`gap-1 flex flex-col w-full relative justify-center `}>
                            {message.image_url && message.image_url.length > 0 && (
                                <div className="overflow-hidden mx-auto ">
                                    <div className={`grid  max-w-[280px]  lg:max-w-[330px] lg:max-h-[400px]  gap-1  `}>
                                        {message.image_url && (
                                            <div key={message.image_url[0]} className={`${"h-[338px] min-w-[260px] relative"} `}>
                                                <Image
                                                    src={message.image_url[0]}
                                                    alt="image"
                                                    width={400}
                                                    tabIndex={0}
                                                    height={400}
                                                    className={`rounded-md w-full relative object-cover h-full ${isLoading ? " bg-black/30" : "bg-white"}   ${
                                                        isLoading ? "blur-sm " : "blur-0 "
                                                    }`}
                                                    onClick={() => {
                                                        setShowImageModal({ image: message.image_url, index: 0 });
                                                    }}
                                                    onLoadingComplete={() => setIsLoading(false)}
                                                />

                                                {message.image_url.length > 1 && (
                                                    <div
                                                        tabIndex={-1}
                                                        className="absolute inset-0 grid place-items-center w-full h-full bg-[rgba(11,20,26,0.6)] "
                                                        style={{ pointerEvents: "none" }}
                                                    >
                                                        <span className=" font-serif font-semibold text-4xl">+{message.image_url.length}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {message?.content?.includes("mp3") ? (
                                <VoiceAudio messageAudio={message?.content} profile={message.author} />
                            ) : (
                                <div className={`px-2.5 flex justify-between gap-2 `}>
                                    <span className="whitespace-normal break-all text-base text-white">{message?.content}</span>
                                    <div className="flex items-center gap-1 justify-center self-end text-white">
                                        <span
                                            className={`text-xs self-end  w-full${message?.image_url && !message?.content ? "absolute bottom-0 right-2" : ""}`}
                                        >
                                            {formatDate(new Date(message?.created_at), "status")}
                                        </span>
                                        <span>
                                            {message.preview ? (
                                                <Spinner className="w-2 h-2 self-end" />
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon icon-tabler icon-tabler-send w-3 h-3 stroke-current fill-transparent"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M10 14l11 -11"></path>
                                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
