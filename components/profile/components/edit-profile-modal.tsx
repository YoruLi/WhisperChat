import Input from "@/components/Input";
import ProfilePicture from "@/components/profile-picture";
import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import React, { FormEventHandler, useRef, useState } from "react";
import { useEditProfile } from "../stores/use-edit-profile";
import { useUpdateProfile } from "./hooks/use-update-profile";
import { Profile } from "@/types/schemas";

export default function EditProfileModal({ user }: { user: Profile }) {
    const [profile, setProfile] = useState({
        full_name: user?.full_name || "",
        status: user?.status || "",
        profile_picture: { url: user?.profile_picture || "", file: undefined },
    });

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const closeEditProfileModal = useEditProfile(state => state.closeEditProfileModal);
    const mutation = useUpdateProfile(user?.id);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({ userId: user.id, profileInfo: profile });
        closeEditProfileModal();
    };

    const chooseImage = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files && e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setProfile({
                ...profile,
                [type]: { url: reader.result, file },
            });
        };

        reader.readAsDataURL(file);
    };
    return (
        <div className="fixed z-[9999999] top-0 left-0 flex w-screen h-full">
            <div className="bg-[#181920b0] w-full h-full flex items-center justify-center ">
                <div className=" bg-[#181920] border border-slate-600  lg:max-w-lg w-[90%] max-h-[70%] lg:max-h-[90%] relative h-full flex gap-4 flex-col p-3 items-center rounded">
                    <div className=" self-start block">
                        <SvgButton path={svgs.x.path} viewBox={svgs.x.viewBox} onClick={closeEditProfileModal} />
                    </div>
                    <h2 className="text-center [font-size:clamp(14px,10vw,20px)] text-whisper">Edita tu perfil</h2>
                    <div className="relative group/media">
                        <ProfilePicture
                            email={user.email}
                            profile_picture={profile.profile_picture.url ? (profile.profile_picture.url as string) : user?.profile_picture}
                            size="w-24 h-24 "
                            classname=" relative  aspect-square object-cover group-hover/media:opacity-70 "
                        />
                        <div className=" absolute grid place-items-center inset-0 group/svg">
                            <label htmlFor="media" className=" absolute left-0 top-0 h-full w-full cursor-pointer "></label>
                            <SvgButton path={svgs.camera.path} type="button" viewBox={svgs.camera.viewBox} size="w-5 h-5" className="fill-slate-100" />

                            <input
                                className="hidden "
                                name="media"
                                type="file"
                                tabIndex={-1}
                                id="media"
                                ref={avatarInputRef}
                                accept="image/*"
                                onChange={e => chooseImage(e, "profile_picture")}
                            />
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="  flex flex-col items-center w-[90%] gap-4 [&>div>input]:border-slate-600 [&>div>span]:bg-[#181920]   [&>div>span]:text-slate-500"
                    >
                        <Input text="Nombre" label={"full_name"} placeholder={user?.full_name} value={profile.full_name} setValue={setProfile} />
                        <Input text="Descripcion" label={"status"} placeholder={user?.email} value={profile.status} setValue={setProfile} />

                        <button className="absolute right-0 bottom-0 m-6 first-letter:uppercase border dark:border-slate-700 chill:border-slate-700 light:border-slate-300  bg-transparent hover:bg-current/80 px-3 py-1 rounded-full">
                            <span className="text-current">save</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
