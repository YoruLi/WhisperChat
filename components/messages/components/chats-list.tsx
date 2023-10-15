"use client";

import { Chat } from "@/context/types";
import Link from "next/link";
import React from "react";
import ProfilePicture from "../../profile-picture";
import { formatDate } from "@/data/formatDate";
import { ChatsLoader } from "../../ui/ChatsLoader";
import { motion } from "framer-motion";

export default function ChatsList({
  chats,
  isLoading,
}: {
  chats: Chat[] | undefined;
  isLoading: boolean;
}) {
  const variants = {
    show: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: { opacity: 0 },
  };

  const container = {
    hidden: {
      y: 0,
    },

    show: {
      y: 0,

      transition: { delayChildren: 0.5, staggerChildren: 0.5 },
    },
  };

  return (
    <>
      <motion.ul initial="hidden" variants={container} animate="show">
        {isLoading ? (
          <ChatsLoader />
        ) : (
          chats?.map((chat, index) => {
            const { id, last_message, profile } = chat;
            if (!profile) return;

            return (
              <motion.li
                key={id}
                custom={index}
                variants={variants}
                initial="hidden"
                animate="show"
              >
                <Link
                  href={`/chats/${profile.id}`}
                  passHref
                  className="flex gap-3.5 p-3.5 items-center chill:hover:bg-[#1e1f27] dark:hover:bg-[#1e1f27]  light:hover:bg-gray-200 cursor-pointer"
                >
                  <div className="flex gap-3 items-center w-full">
                    <div>
                      <ProfilePicture
                        email={profile?.email}
                        profile_picture={profile?.profile_picture}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="w-full flex justify-between items-center">
                        <span className="text-base light:text-slate-900">
                          {profile?.email}
                        </span>
                        <span className="text-xs text-slate-500 ">
                          {formatDate(
                            new Date(last_message.created_at),
                            "status"
                          )}
                        </span>
                      </div>

                      <span className="text-slate-500 font-medium text-sm">
                        {last_message?.image_url.length > 0 ? (
                          "📷Photo"
                        ) : last_message.content.includes("mp3") ? (
                          <div className="flex items-center gap-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-slate-500 w-4 h-4"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z" />
                              <path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z" />
                            </svg>
                            <span className="text-slate-500 font-medium text-sm">
                              Audio
                            </span>
                          </div>
                        ) : (
                          last_message.content
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })
        )}
      </motion.ul>
    </>
  );
}
