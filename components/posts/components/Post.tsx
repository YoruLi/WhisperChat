"use client";
import React from "react";
import ProfilePicture from "../../profile-picture";
import { formattedContent } from "@/lib/formattedContent";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PostActions from "./PostActions";
import { usePostImageModal } from "@/components/posts/stores/use-post-image-modal";
import PostOptions from "./post-options";
import CreateDate from "./create-date";
import { Post } from "@/types/schemas";
import { Session } from "@supabase/supabase-js";
import { PostResponse } from "@/types/contexts/data";
import { TextLoader } from "@/components/ui/title-loader";
import { ImageLoader } from "@/components/ui/image-loader";

export default function Post({
  post,
  isReply = false,
  modal = false,
  session,
  queryKey,
}: {
  post: PostResponse;
  isReply?: boolean;
  modal?: boolean;
  session?: Session | null;
  queryKey: string[];
}) {
  const openModalImage = usePostImageModal((state) => state.openPostImageModal);
  const setPostId = usePostImageModal((state) => state.setPostId);
  const router = useRouter();

  return (
    <>
      <div
        tabIndex={0}
        onClick={() => {
          if (!isReply) {
            router.push(`/post/${post?.id}`);
          }
        }}
        role="link"
        className={` duration-200 ${
          post.preview ? "opacity-50" : "opacity-100"
        }  transition-colors bg-transparent dark:hover:bg-black/30 chill:hover:bg-black/30 light:hover:bg-slate-100  w-full grid grid-cols-[50px_minmax(200px,_1fr)] px-4 pt-3.5  gap-2 lg:gap-0   cursor-pointer `}
      >
        <ProfilePicture
          email={post.profiles.email}
          profile_picture={post?.profiles?.profile_picture}
          size="w-12 h-12 lg:w-10 lg:h-10"
        />

        <div className="flex flex-col relative ">
          <div className="flex justify-between w-full ">
            <div className="flex items-center ">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/${post.profiles.id}`);
                }}
                className="text-sm inline-block font-medium light:text-black  chill:text-current dark:text-current hover:underline "
              >
                {post.profiles.full_name !== null ? (
                  post?.profiles.full_name
                ) : post.profiles.email ? (
                  post?.profiles?.email
                ) : (
                  <TextLoader />
                )}
              </p>

              <span className="text-slate-500 px-2 text-sm">·</span>
              <CreateDate date={post?.created_at} />
            </div>

            <PostOptions
              post={post}
              isReply={isReply}
              session={session}
              queryKey={queryKey}
            />
          </div>
          {isReply && post?.posts?.author && (
            <div className="text-sm text-slate-500 font-mediumbreak-words break-all">
              <p>
                Replying to&nbsp;
                <Link
                  className="cursor-pointer hover:underline"
                  href={`/post/${post?.posts?.id}`}
                >
                  {post?.posts?.author?.email}
                </Link>
              </p>
            </div>
          )}

          <div className="text-sm width-auto font-medium flex-shrink break-words whitespace-pre-wrap light:text-black dark:text-white chill:text-white ">
            {formattedContent(post?.text)}
          </div>

          {post?.media &&
            post?.media.length > 0 &&
            (post.preview ? (
              <ImageLoader />
            ) : (
              <div className="overflow-hidden mt-3 mr-6">
                <div
                  className={`grid  gap-2 max-h-[700px]  ${
                    post.media.length === 1
                      ? "one"
                      : post.media.length === 2
                      ? "two"
                      : post.media.length === 3
                      ? "three"
                      : post.media.length === 4
                      ? "four"
                      : ""
                  } `}
                >
                  {post.media.map((media, index) => (
                    <img
                      onClick={(event) => {
                        event.stopPropagation();
                        openModalImage();
                        setPostId(post.id, index);
                      }}
                      key={media}
                      src={media}
                      alt="Image"
                      className="bg-white border-2 chill:border-none dark:border-none light:border-slate-500 rounded-xl cursor-pointer w-full  "
                      width={400}
                      height={400}
                    />
                  ))}
                </div>
              </div>
            ))}

          <PostActions
            post={post}
            isReply={isReply}
            session={session}
            queryKey={queryKey}
          />
        </div>
      </div>
    </>
  );
}
// {
//     /* @ts-expect-error Server Component */
// }
