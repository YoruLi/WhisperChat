"use client";

import { useCreatePostModal } from "@/components/posts/stores/use-create-post";
import { usePostImageModal } from "@/components/posts/stores/use-post-image-modal";
import React from "react";
import CreatePostModal from "./posts/components/create-posts-modal";
import InspectPostImageModal from "./posts/components/inspect-post-image-modal";
import { useJoinWhisperModal } from "./auth/stores/use-join-whisper-modal";

import { Session } from "@supabase/auth-helpers-nextjs";
import SearchModal from "./search/components/search-modal";
import JoinWhisperModal from "./auth/components/join-whisper-modal";

export default function Modals({ session }: { session: Session | null }) {
  const isPostModalOpen = useCreatePostModal((state) => state.isModalOpen);
  const isPostImageModal = usePostImageModal((state) => state.isPostImageModal);
  const isJoinWhisperModal = useJoinWhisperModal(
    (state) => state.data.isModalOpen
  );

  return (
    <>
      {isPostModalOpen && <CreatePostModal session={session} />}
      {<SearchModal session={session} />}
      {isPostImageModal && <InspectPostImageModal session={session} />}
      {isJoinWhisperModal && <JoinWhisperModal />}
    </>
  );
}
