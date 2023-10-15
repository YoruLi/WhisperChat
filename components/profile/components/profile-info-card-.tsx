"use client";
import ProfilePicture from "@/components/profile-picture";
import React from "react";

import TryAgain from "@/components/ui/TryAgain";

import Spinner from "@/components/spinner";
import Link from "next/link";
import { useUser } from "./hooks/use-get-user";
import CreateDate from "@/components/posts/components/create-date";
import FollowButton from "@/components/follow-button";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useEditProfile } from "../stores/use-edit-profile";
import EditProfileModal from "./edit-profile-modal";

import { Followers, InitialUser } from "@/types/contexts/data";
import TitleWhisper from "@/components/ui/title-whisper";

export default function ProfileInfoCard({ id, initialUser, session }: { id: string; initialUser: InitialUser; session: Session | null }) {
    const { data: user, isError, isLoading } = useUser({ userId: id, initialUser });
    const openEditProfileModal = useEditProfile(state => state.openEditProfileModal);
    const isEditProfileModalOpen = useEditProfile(state => state.isEditProfileModalOpen);
    if (isError) {
        return <TryAgain />;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className=" w-full mx-auto  border-0 grid place-items-center self-start  xl:sticky top-0 ">
                <TitleWhisper />
                <div className=" relative flex flex-col px-4 py-6 w-full lg:w-[22rem] light:lg:border-slate-300 lg:border lg:border-current lg:border-current/10 gap-5  h-full  rounded">
                    <div className="lg:absolute inset-0 shadow-lg  animate-pulse shadow-current/30 -z-30 " />
                    <div className="flex flex-col items-center ">
                        {session?.user.id !== id ? (
                            <FollowButton session_id={session?.user.id} user_id={user.id} />
                        ) : (
                            <>
                                <div className="flex self-end ">
                                    <button
                                        onClick={() => openEditProfileModal()}
                                        className="bg-transparent rounded-full border-2 px-3 text-sm py-1 capitalize chill:hover:border-current light:hover:border-current dark:hover:border-current hover:shadow-current hover:text-current hover:border-current text-slate-700 dark:border-slate-700 light:border-slate-300 chill:border-slate-700 hover:shadow-inner transition-shadow "
                                    >
                                        Editar Perfil
                                    </button>
                                </div>
                            </>
                        )}
                        <div className="mb-2">
                            <ProfilePicture
                                email={user?.email}
                                profile_picture={user?.profile_picture}
                                size="w-32 h-32"
                                classname="w-32 h-32 lg:w-full lg:h-full"
                            />
                        </div>

                        <span className="dark:text-slate-50 chill:text-slate-50 light:text-black">{user.full_name !== null ? user.full_name : user.email}</span>
                        <CreateDate date={user?.created_at} />
                    </div>
                    <div className="">
                        <p className="text-base chill:text-slate-300 light:text-slate-700 dark:text-slate-300 flex-wrap py-2">{user?.status}</p>
                        <div className="flex flex-wrap gap-2 text-sm  justify-between">
                            <Link href={"/home"} className=" flex items-center  text-current hover:underline focus-visible:underline cursor-pointer">
                                <span className="">{user.followers.length}</span>&nbsp;Siguiendo
                            </Link>

                            <Link href={"/home"} className=" flex  items-center text-current hover:underline focus-visible:underline cursor-pointer">
                                <span className="">{user.following.length}</span>&nbsp;Seguidores
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {isEditProfileModalOpen ? <EditProfileModal user={user} /> : null}
        </>
    );
}
