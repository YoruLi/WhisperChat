import SvgIcon from "@/components/SvgIcon";

import svgs from "@/data/svgs";
import { PostResponse } from "@/types/contexts/data";
import { Session } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

export default function PostVisitorActions({ post, queryKey, session }: { post: PostResponse; queryKey: string[]; session: Session | null | undefined }) {
    const router = useRouter();
    const variants = {
        show: (i: number) => ({
            opacity: 1,

            transition: {
                delay: i * 0.1,
            },
        }),

        hidden: {
            opacity: 0,
        },
    };
    const actions = !session
        ? [
              {
                  icon: svgs.notInterested,
                  text: "No me interesa este post",
              },
          ]
        : [
              {
                  icon: svgs.notInterested,
                  text: "No me interesa este post",
              },
              {
                  icon: svgs.unfollow,
                  text: ` Dejar de seguir a ${post.profiles.email} `,
              },
              {
                  icon: svgs.report,
                  text: `Reportar a ${post.profiles.email} `,
              },
              {
                  icon: svgs.block,
                  text: `Bloquear a ${post.profiles.email} `,
              },
          ];
    return (
        <>
            {actions.map((action, index) => (
                <motion.button
                    variants={variants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    custom={index}
                    onClick={() => {
                        router.push("/auth");
                    }}
                    className={`flex items-center gap-3 py-2 px-3 overflow-hidden max-w-md  min-w-[300px] w-full  lg:min-w-[12rem]  hover:bg-slate-800/50 `}
                >
                    <SvgIcon key={action.icon.title} viewBox={action.icon.viewBox} path={action.icon.path} className={`w-4 h-4  stroke-slate-500  `} />
                    <span className={` text-base  xl:text-sm whitespace-nowrap text-ellipsis overflow-hidden text-slate-400`}>{action.text}</span>
                </motion.button>
            ))}
        </>
    );
}
