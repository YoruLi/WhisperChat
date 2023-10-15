import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import GoBack from "@/components/ui/go-back";
import SinglePostWithComments from "@/components/posts/components/single-post-with-comments";
// export async function generateMetadata({ params }: { params: { postId: string } }): Promise<Metadata> {
//     const supabase = createServerComponentClient({ cookies });
//     const getPost = async (postId: string) => {
//         const { data: post, error } = await supabase
//             .from("posts")
//             .select(`*, profiles:profile_id(*),  likesPost(*),  comments(*, profiles:profile_id(*))`)
//             .eq("id", postId);

//         if (error) {
//             console.error(error);
//             return {
//                 success: false,
//                 error,
//             };
//         }

//         return post;
//     };

//     const post = await getPost(params?.postId);
//     console.log("data", post);

//     if (!post)
//         return {
//             title: "Post",
//         };

//     return {
//         title: `${post?.id} on Chirp: "${decodeURIComponent(post?.text as string)}"`,
//         description: decodeURIComponent(post?.text as string),
//     };
// }

export default async function postPage({ params }: { params: { postId: string } }) {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <main className="flex flex-col  max-h-[calc(100vh-56px)] lg:min-h-screen w-full  scrollbar-main overflow-y-auto  ">
            <header className="w-full flex items-center sticky top-0 px-6 text-center chill:bg-[#181920e1] dark:bg-black light:bg-white z-[48]">
                <GoBack />
                <h1 className="mx-auto font-anima text-clamp-title lg:text-clamp-paragraph-header-title ">Whisper</h1>
            </header>
            <SinglePostWithComments postId={params?.postId[0]} session={session} />
        </main>
    );
}
