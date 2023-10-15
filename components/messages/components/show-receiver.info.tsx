import SvgButton from "@/components/SvgButton";

import svgs from "@/data/svgs";
import React from "react";
import { useReceiverInfo } from "../stores/use-receiver-info";
import { Profile } from "@/types/schemas";
import ProfilePicture from "@/components/profile-picture";
import Image from "next/image";

import { useUser } from "@/components/profile/components/hooks/use-get-user";
import { ChatInfo } from "@/types/contexts/data";

import Loading from "@/components/ui/Loading";

export default function showReceiverInfo({ user, messages, isLoading }: { user: Profile; messages: ChatInfo["messages"]; isLoading: boolean }) {
    const setShowReceiverInfo = useReceiverInfo(state => state.setShowReceiverInfo);
    const { data, isError } = useUser({ userId: user?.id });

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden  dark:bg-black light:bg-white chill:bg-[#181920] z-50">
            <SvgButton {...svgs.leftArrow} onClick={setShowReceiverInfo} className="absolute left-3 top-6" />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex flex-col  w-full h-full  gap-6 px-10">
                        <div className="mx-auto flex flex-col max-w-lg w-full text-center">
                            <div className="mx-auto ">
                                <ProfilePicture email={user?.email} profile_picture={user?.profile_picture} size="w-24 h-24" />
                            </div>
                            <span className="text-lg light:font-bold light:text-black chill:text-current dark:text-current ">
                                {user?.full_name ?? "@" + user?.email.split("@")[0]}
                            </span>
                            <span className=" text-slate-400 text-sm">{user?.last_seen ? user.last_seen : ""}</span>

                            <div className="flex w-full">
                                <span className="flex-1 truncate light:font-bold light:text-slate-500 text-sm">{data?.followers?.length ?? 0} Siguiendo</span>
                                <span className="flex-1 truncate light:font-bold light:text-slate-500 text-sm">{data?.following?.length ?? 0} Seguidores</span>
                            </div>
                        </div>

                        <div className="w-full relative overflow-hidden ">
                            {messages?.length > 0 ? (
                                <>
                                    <div className="flex items-center ">
                                        <h3 className="text-sm chill:text-slate-300 dark:text-slate-300 light:text-black">archivos, enlaces y documentos</h3>
                                    </div>
                                    <div className="scrollbar-main flex gap-2 mt-4 overflow-x-auto">
                                        {messages.slice(0, 5).map((data, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="block min-w-[75px] max-w-[75px] h-[75px]  rounded-md  border-slate-700 cursor-pointer border"
                                                >
                                                    <Image
                                                        src={(data.message.image_url && data.message.image_url[0]) as string}
                                                        alt={`${data.message.image_url}`}
                                                        width={400}
                                                        height={400}
                                                        className="w-full h-full object-cover  "
                                                    />
                                                </div>
                                            );
                                        })}
                                        {messages.length > 5 ? (
                                            <button className="min-w-[75px] h-[75px] text-center flex cursor-pointer justify-center items-center bg-slate-800 rounded-md text-base text-slate-400 font-bold font-sans">
                                                + {messages.length - 5}
                                            </button>
                                        ) : null}
                                    </div>
                                </>
                            ) : (
                                <span className="text-sm text-slate-300 whitespace-nowrap w-full text-center">No hay archivos multimedia</span>
                            )}
                        </div>

                        <div>
                            <span className="light:text-black dark:text-current chill:text-current">Sobre mi</span>
                            <p className="dark:text-slate-300 chill:text-slate-300 light:text-slate-700">{user?.status}</p>
                        </div>

                        <div>
                            <span className="chill:text-current dark:text-current light:text-black">Amigos en comun</span>
                            <legend className="chill:text-slate-400 light:text-slate-700 dark:text-slate-400">No hay amigos en comun</legend>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
