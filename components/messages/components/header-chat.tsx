import React from "react";
import ProfilePicture from "../../profile-picture";
import { useRouter } from "next/navigation";
import { AvatarWithTextLoader } from "../../ui/avatar-with-text-loader";
import GoBack from "../../ui/go-back";
import { useReceiverInfo } from "../stores/use-receiver-info";
import { Profile } from "@/types/schemas";

export default function HeaderChat({
  user,
  isLoading,
}: {
  user: Profile;
  isLoading: boolean;
}) {
  const setShowReceiverInfo = useReceiverInfo(
    (state) => state.setShowReceiverInfo
  );
  const router = useRouter();

  return (
    <header
      onClick={() => {
        setShowReceiverInfo();
      }}
      className={` dark:bg-black light:bg-white  chill:bg-[#181920] cursor-pointer relative hover:bg-[#1e1f27] border-b-[1px] dark:border-slate-700 light:border-slate-300 chill:border-slate-700 transition-colors duration-500 flex items-center justify-between p-2 lg:p-3`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowReceiverInfo();
        }}
        className="absolute inset-0 lg:hidden"
      ></div>
      <div className=" flex gap-3 justify-center items-center ">
        <GoBack />
        {isLoading ? (
          <AvatarWithTextLoader />
        ) : (
          <>
            <div
              onClick={() => {
                router.push(`/${user.id}`);
              }}
            >
              <ProfilePicture
                email={user?.email}
                profile_picture={user?.profile_picture}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base light:text-slate-700">
                {user?.email}{" "}
              </span>
              <span className="text-slate-500 font-medium text-sm">
                {user?.last_seen}
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
