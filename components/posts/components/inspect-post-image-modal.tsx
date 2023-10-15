import ProfilePicture from "@/components/profile-picture";
import Spinner from "@/components/spinner";
import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import { usePost } from "@/hooks/usePost";
import { usePostImageModal } from "@/components/posts/stores/use-post-image-modal";
import Image from "next/image";
import React from "react";
import PostActions from "./PostActions";

import Comments from "@/components/comments";
import { formattedContent } from "@/lib/formattedContent";
import { Session } from "@supabase/supabase-js";

export default function InspectPostImageModal({ session }: { session: Session | null }) {
    const closeImageModal = usePostImageModal(state => state.closePostImageModal);

    const postId = usePostImageModal(state => state.postId);
    const indexImage = usePostImageModal(state => state.indexImage);
    const { data: post, error, isLoading } = usePost(postId);

    return (
        <div className="fixed z-[51] top-0 left-0 flex w-screen h-full">
            {isLoading ? (
                <div className="w-full h-full grid place-items-center">
                    <Spinner />
                </div>
            ) : error ? (
                <span>Error al cargar</span>
            ) : (
                <>
                    <div className="bg-[#181920b0] w-full h-full flex items-center justify-center   " onClick={() => closeImageModal()}>
                        <div className="">
                            {post.media && (
                                <Image
                                    onClick={e => e.stopPropagation()}
                                    src={post.media[indexImage]}
                                    alt={`${post.media[0]}`}
                                    className="rounded-xl w-full h-full max-h-[700px] relative border border-slate-400"
                                    width={1000}
                                    height={1000}
                                />
                            )}
                        </div>
                    </div>

                    <div className="chill:bg-[#14161e] dark:bg-dark light:bg-white lg:w-[40rem] lg:block hidden border-l border-slate-700 ">
                        <div className="mx-4 mt-4 flex flex-col gap-2  ">
                            <div className={` bg-transparent  w-full grid grid-cols-[50px_minmax(200px,_1fr)]  cursor-pointer`}>
                                <div>
                                    <ProfilePicture {...post.profiles} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between w-full">
                                        <div className="flex  items-center">
                                            <p className="text-base inline-block font-medium dark:text-current light:text-black chill:text-current">
                                                {post.profiles?.email}
                                            </p>
                                            <span className="text-sm  font-medium text-slate-400 group-hover:text-gray-300 transition ease-in-out duration-150"></span>
                                        </div>
                                        <SvgButton path={svgs.options.path} viewBox={svgs.options.viewBox} className="rotate-90" />
                                    </div>

                                    {post.text && (
                                        <div className="text-base width-auto font-medium flex-shrink break-words dark:text-current light:text-black chill:text-current">
                                            {formattedContent(post.text)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <PostActions post={post} session={session} queryKey={["posts"]} />
                        </div>

                        <div className="overflow-y-auto max-h-[calc(100vh-145px)] scrollbar border-t dark:border-slate-800 light:border-slate-300 chill:border-slate-800 ">
                            {post?.comments && <Comments key={post?.id} post={post} session={session} />}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
