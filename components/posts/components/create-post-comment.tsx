import ProfilePicture from "@/components/profile-picture";

import { formatDate } from "@/data/formatDate";
import { useCreatePostModal } from "@/components/posts/stores/use-create-post";

import React, { BaseSyntheticEvent } from "react";

import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import { formattedContent } from "@/lib/formattedContent";
import { PostResponse } from "@/types/contexts/data";

export default function CreatePostComment({ post }: { post: PostResponse }) {
    const closeModal = useCreatePostModal(state => state.closeModal);

    return (
        <div
            onSubmit={(e: BaseSyntheticEvent) => {
                if (e.target[0].value !== "") {
                }
            }}
        >
            <div className="m-4 flex flex-col gap-2   ">
                <div className={` bg-transparent  w-full grid grid-cols-[50px_minmax(200px,_1fr)]  gap-2 cursor-pointer`}>
                    <ProfilePicture {...post.profiles} size="w-12 h-12 lg:w-10 lg:h-10" />

                    <div className="flex flex-col">
                        <div className="flex justify-between w-full">
                            <div className="flex gap-3 items-center">
                                <p className="text-base inline-block font-medium text-[#40f5c8]">{post.profiles?.email}</p>
                                <span className="text-sm  font-medium text-slate-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    {post.created_at ? formatDate(new Date(post.created_at), "post") : null}
                                </span>
                            </div>
                            <SvgButton path={svgs.options.path} viewBox={svgs.options.viewBox} className="rotate-90" />
                        </div>
                        <div className="flex flex-col">
                            {post.text && (
                                <div className="text-base width-auto font-medium flex-shrink break-words whitespace-pre-wrap ">
                                    {formattedContent(post?.text)}
                                </div>
                            )}

                            {/* {post.media && post.media.length > 0 && <Image src={post.media[0]} alt="" width={100} height={100} className="self-center" />} */}
                        </div>
                    </div>
                </div>
                <p className="text-slate-500 text-xs pt-4">
                    respondiendo a <span className="text-[#40f5c8]">{post?.profiles.email}</span>
                </p>
            </div>
        </div>
    );
}
