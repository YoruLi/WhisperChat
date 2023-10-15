import SvgButton from "@/components/SvgButton";
import { chooseImages } from "@/components/posts/utils/chooseImages";
import svgs from "@/data/svgs";
import { motion } from "framer-motion";
import React from "react";

export default function ChatActions({
    showOptions,
    optionsRef,
    setChoosenImgs,
    choosenImgs,
    handleShowAttach,
}: {
    showOptions: any;
    optionsRef: any;
    setChoosenImgs: any;
    choosenImgs: any;
    handleShowAttach: any;
}) {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <>
            <div className="absolute w-16 h-auto py-2 bottom-12 left-4 ">
                <motion.ul variants={container} initial="hidden" animate="visible" className="flex justify-center items-center gap-2 ">
                    {svgs.attachIcons.map(svg => (
                        <motion.li key={svg.name} variants={item} className="p-2 rounded-full bg-[#1e1f27] relative " ref={optionsRef}>
                            {svg.name === "image" ? (
                                <div className="group/svg  ">
                                    <label
                                        htmlFor="image"
                                        className="absolute  group-hover/svg:fill-current left-0 top-0 rounded-full  h-full w-full cursor-pointer "
                                    ></label>
                                    <SvgButton {...svg.svg} className="group-hover/svg:fill-current" />
                                    <input
                                        id="image"
                                        type="file"
                                        name="media"
                                        tabIndex={-1}
                                        className="hidden"
                                        onChange={e => {
                                            chooseImages({
                                                event: e,
                                                imageLen: choosenImgs.length,
                                                updateChoosenImgs: setChoosenImgs,
                                            });
                                        }}
                                        multiple
                                        max={4}
                                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                                    />
                                </div>
                            ) : (
                                <SvgButton type="button" {...svg.svg} className="hover:fill-whisper" />
                            )}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </>
    );
}
