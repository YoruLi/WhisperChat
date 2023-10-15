import React from "react";

import svgs, { Svg } from "@/data/svgs";

import AuthProviderButtons from "./auth-provider-buttons";

import { motion } from "framer-motion";
import Globe from "@/components/globe";
import SvgIcon from "@/components/SvgIcon";
import SvgButton from "@/components/SvgButton";
import { useJoinWhisperModal } from "../stores/use-join-whisper-modal";

type ActionMap = {
  [key: string]: {
    icon: Svg;
    title: string;
    subtitle: string;
  };
};
export default function JoinWhisperModal() {
  const { action } = useJoinWhisperModal((state) => state.data);
  const setJoinWhisperModal = useJoinWhisperModal((state) => state.setData);

  const actionMap: ActionMap = {
    comment: {
      icon: svgs.commentsIcon,
      title: "Feel free to share your thoughts by leaving a comment.",
      subtitle:
        "Become a part of Whisper to let people read your insights on their post",
    },
    like: {
      icon: svgs.likeIcon,
      title: "Spread the Appreciation by Hearting a Post. ",
      subtitle:
        "Step into our community to let Sarah see your fondness for their post",
    },
    retweet: {
      icon: svgs.repostIcon,
      title: "Reveal with a Repost",
      subtitle: "",
    },
    share: {
      icon: svgs.shareWhispTo,
      title: "Share and Amplify.",
      subtitle: "Connect with us to help posts reach more eyes and ears",
    },
    follow: {
      icon: svgs.repostIcon,
      title: "Reveal with a Repost",
      subtitle: "Connect with us to help posts reach more eyes and ears",
    },
  };
  const selectedAction = actionMap[action];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="relative z-[9999] "
    >
      <div
        className="fixed inset-0 bg-black/40   flex items-center justify-center "
        onClick={() =>
          setJoinWhisperModal({
            isModalOpen: false,
            action: "",
          })
        }
      >
        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] h-[600px]  lg:w-[40rem] lg:h-[40rem]   -z-50  ">
          <Globe />
        </div>
      </div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 ">
        <div className="rounded-xl  p-8 min-w-[400px] min-h-80 lg:max-w-md lg:max-h-96 border chill:border-slate-700 dark:border-slate-700 light:border-slate-300 backdrop-blur-sm chill:bg-[#181920b6] dark:bg-[#181920b6] light:bg-white/30 ">
          <SvgButton
            path={svgs.x.path}
            viewBox={svgs.x.viewBox}
            onClick={() =>
              setJoinWhisperModal({ isModalOpen: false, action: "" })
            }
            className="lg:w-6 lg:h-6 w-8 h-8 light:fill-slate-300  "
          />
          <div className="flex flex-col items-center justify-center w-full h-full gap-3  ">
            <div className="flex items-center">
              <h1 className=" text-current w-full font-anima text-3xl lg:text-4xl">
                Whisper
              </h1>

              <SvgIcon
                path={selectedAction.icon.path}
                viewBox={selectedAction.icon.viewBox}
                className="fill-current stroke-current w-8 h-8"
              />
            </div>
            <div className="flex flex-col items-center justify-center  text-center gap-2">
              <p className="text-slate-400 font-light  text-clamp-paragraph">
                {selectedAction.subtitle}
              </p>

              <AuthProviderButtons />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
