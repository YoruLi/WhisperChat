"use client";

import React, { useEffect, useRef, useState } from "react";
import ProfilePicture from "./profile-picture";
import SvgButton from "./SvgButton";
import svgs from "@/data/svgs";
import { resizeTextarea } from "@/utils/resizeTextarea";
import { IChosenImages, chooseImages } from "./posts/utils/chooseImages";
import { ChosenImages } from "./posts/components/chosen-images";

import { createPost } from "./posts/hooks/create-post";
import { createComment } from "./posts/hooks/create-comment";
import { Session } from "@supabase/auth-helpers-nextjs";
import { cn } from "@/utils/cn";

export default function CreatePost({
  in_reply_status_id,
  replyPost = false,
  session,

  placeholder = "Start a whisper...",
}: {
  in_reply_status_id?: any;
  session: Session | null;
  replyPost?: boolean;
  placeholder?: string;
}) {
  const [text, setText] = useState("");
  const [choosenImgs, setChoosenImgs] = useState<IChosenImages[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: insertPost, isLoading } = createPost(session);
  const { mutate: insertComment, isLoading: commentLoading } = createComment();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const content = data.get("content")?.toString() ?? "";

    if (replyPost && (content !== "" || choosenImgs.length > 0)) {
      return insertComment(
        {
          text: content,
          parent_comment_id: in_reply_status_id.hasOwnProperty(
            "parent_comment_id"
          )
            ? in_reply_status_id.id
            : null,
          post_id: in_reply_status_id.post_id ?? in_reply_status_id.id,
        },
        {
          onSettled: () => {
            setText("");
            setChoosenImgs([]);
          },
        }
      );
    }

    if (content !== "" || choosenImgs.length > 0) {
      insertPost(
        {
          text: content,
          files: choosenImgs.map((img) => img.file),
        },
        {
          onSettled: () => {
            setText("");
            setChoosenImgs([]);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      resizeTextarea(textAreaRef.current);
    }
  }, [text]);

  return (
    <div
      className={`${
        replyPost
          ? "border-y border-y-slate-700  "
          : "bg-transparent border dark:border-current light:border-slate-400 chill:border-current"
      }  w-full  p-4 `}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="relative self-start ">
          <ProfilePicture
            email={session?.user.email}
            profile_picture={session?.user.user_metadata.avatar_url}
          />
        </div>
        <form
          ref={formRef}
          className={`"relative w-full flex flex-col
                   `}
          onSubmit={handleSubmit}
        >
          <div className={`w-full flex flex-col items-center mt-2`}>
            <textarea
              onChange={(evt) => {
                setText(evt.target.value);
              }}
              name="content"
              tabIndex={0}
              contentEditable="true"
              aria-multiline="true"
              aria-label="post text"
              aria-autocomplete="list"
              spellCheck="true"
              value={text}
              placeholder={placeholder}
              ref={textAreaRef}
              rows={1}
              style={{ height: "auto !important" }}
              className={` min-h-16 w-full select-none dark:text-white chill:text-white light:text-black caret-current  resize-none overflow-hidden break-words border-b-2  border-transparent bg-transparent text-base leading-5 text-secondary-dark outline-none transition-all `}
            />

            {choosenImgs && (
              <div className="mb-5">
                <ChosenImages
                  chosenImages={choosenImgs}
                  setChosenImages={setChoosenImgs}
                />
              </div>
            )}
          </div>

          <section className={` flex gap-4 items-center self-end`}>
            <div className="relative group/svg">
              <label
                htmlFor="media"
                className=" absolute left-0 top-0 h-full w-full"
              ></label>
              <SvgButton
                path={svgs.image.path}
                type="button"
                viewBox={svgs.image.viewBox}
                size="w-5 h-5"
                className="fill-slate-500 group-hover/svg:fill-current group-hover/svg:stroke-current "
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              />

              <input
                className="hidden"
                name="media"
                type="file"
                tabIndex={-1}
                ref={fileInputRef}
                id="media"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                max={4}
                onChange={(e) => {
                  chooseImages({
                    event: e,
                    imageLen: choosenImgs.length,
                    updateChoosenImgs: setChoosenImgs,
                  });
                }}
                multiple
              />
            </div>
            <SvgButton
              type="button"
              path={svgs.EmojiIcon.path}
              className="fill-slate-500 group-hover/svg:fill-current group-hover/svg:stroke-current "
              viewBox={svgs.EmojiIcon.viewBox}
              size="w-4 h-4"
            />

            <button
              className={cn(
                `transition-colors duration-300 rounded-full py-1 px-5 border dark:hover:text-current chill:hover:text-current light:hover:border-current light:hover:text-current dark:hover:border-current chill:hover:border-current chill:text-slate-500 dark:text-slate-500 light:text-slate-900 dark:border-slate-500 light:border-slate-900 chill:border-slate-500 `,
                {
                  "dark:text-current dark:border-current chill:text-current chill:border-current light:text-current light:border-current":
                    text,
                  "text-slate-500 border-slate-500": isLoading,
                }
              )}
              type="submit"
              tabIndex={0}
            >
              {isLoading || commentLoading ? "Enviando" : "Enviar"}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
