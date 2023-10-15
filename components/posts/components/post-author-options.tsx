import SvgIcon from "@/components/SvgIcon";
import svgs from "@/data/svgs";
import { motion } from "framer-motion";
import React from "react";
import { useDeletePost } from "../hooks/delete-post";

export default function PostAuthorActions({ post, closeModal, queryKey, isReply }: { post: any; closeModal: any; queryKey: string[]; isReply: boolean }) {
    const mutation = useDeletePost(closeModal, queryKey, isReply);

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
    const actions = [
        {
            action: "notInterested",
            icon: svgs.notInterested,
            text: "No me interesa este post",
        },
        {
            action: "eliminar",
            icon: svgs.deleteIcon,
            text: "Eliminar post",
            class: "!fill-[#af141d] !stroke-[#af141d] !text-[#af141d]",
        },
        {
            action: "pin",
            icon: svgs.pinPost,
            text: "Fijar post en tu perfil",
        },
    ];

    const handleAction = (action: string) => {
        if (action === "eliminar") {
            mutation.mutate({
                id: post.id,
            });
        }
    };

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
                        handleAction(action?.action);
                    }}
                    className={`flex items-center gap-3 py-2 px-3 overflow-hidden max-w-md  min-w-[300px] w-full  lg:min-w-[12rem] hover:bg-slate-800/50 ${action.class}`}
                >
                    <SvgIcon
                        key={action.icon.title}
                        viewBox={action.icon.viewBox}
                        path={action.icon.path}
                        circle={action.icon.circle}
                        className={`w-4 h-4  ${action.class} light:stroke-black light:fill-black dark:fill-slate-300 dark:stroke-slate-300 chill:fill-slate-500 chill:stroke-slate-500`}
                    />
                    <span
                        className={` text-base chill:text-slate-400 dark:text-slate-300 light:text-black xl:text-sm whitespace-nowrap text-ellipsis overflow-hidden text-current`}
                    >
                        {action.text}
                    </span>
                </motion.button>
            ))}
        </>
    );
}
