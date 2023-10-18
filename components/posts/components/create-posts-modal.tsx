"use client";

import React, { BaseSyntheticEvent } from "react";
import { useCreatePostModal } from "@/components/posts/stores/use-create-post";
import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import { motion } from "framer-motion";
import CreatePost from "@/components/create-post";
import CreatePostComment from "./create-post-comment";
import { useDisableBodyScroll } from "@/hooks/useDisabledScroll";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function CreatePostModal({
  session,
}: {
  session: Session | null;
}) {
  useDisableBodyScroll();
  const parent_post = useCreatePostModal((state) => state.parent_post);
  const closeModal = useCreatePostModal((state) => state.closeModal);
  const placeholder = useCreatePostModal((state) => state.placeholder);

  return (
    <div
      className="fixed inset-0 top-[56px] lg:top-0 right-0 w-full bg-black/50 z-[9999]"
      onClick={() => {
        closeModal();
      }}
      tabIndex={-1}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeModal();
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="chill:bg-[#181920] dark:bg-dark light:bg-white fixed bottom-0 border-l chill:border-slate-700 dark:border-slate-700 light:border-slate-300  lg:right-0  w-full lg:w-[27.5rem] flex  flex-col lg:bottom-0  z-[31] h-full "
      >
        <div className="flex self-start">
          <SvgButton
            path={svgs.x.path}
            viewBox={svgs.x.viewBox}
            onClick={() => {
              closeModal();
            }}
          />
        </div>

        <div>{parent_post && <CreatePostComment post={parent_post} />}</div>

        <div
          onSubmit={(e: BaseSyntheticEvent) => {
            if (e.target[0].value !== "") {
              closeModal();
            }
          }}
        >
          <div className="overflow-y-auto max-h-[calc(100vh-145px)] scrollbar ">
            <CreatePost
              in_reply_status_id={parent_post}
              replyPost={true}
              placeholder={placeholder ?? ""}
              session={session}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
