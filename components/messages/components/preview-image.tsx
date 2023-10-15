import SvgButton from "@/components/SvgButton";

import { IChosenImages, chooseImages } from "@/components/posts/utils/chooseImages";
import svgs from "@/data/svgs";
import { cn } from "@/utils/cn";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
    choosenImgs: any;
    setChosenImages: any;
    text: any;
    setText: any;
    handleSubmit: any;
}

type Image = {
    id: number;
    index: number;
    url: string;
};
export default function PreviewImage({ choosenImgs, setChosenImages, text, setText, handleSubmit }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState({
        id: 0,
        index: 0,
    });

    const handleImageDelete = (imageId: number) => {
        setChosenImages((prevImages: Image[]) => prevImages.filter((img: Image) => img.id !== imageId));
        setCurrentImageIndex(prevState => ({
            ...prevState,
            id: prevState.id,
            index: prevState.index > 0 ? prevState.index - 1 : 0,
        }));
    };

    useEffect(() => {
        if (choosenImgs.length > 0) {
            setCurrentImageIndex({
                id: choosenImgs[choosenImgs.length - 1].id,
                index: choosenImgs.length - 1,
            });
        }
    }, [choosenImgs]);

    return (
        <>
            {choosenImgs.length > 0 && (
                <div className="absolute flex flex-col  w-full h-[calc(100%-62px)] bottom-0 bg-[#101218] z-[51] p-4 ">
                    <div className="flex-1 h-full  min-w-full ">
                        <div className="flex flex-col overflow-hidden flex-1 ">
                            <div className="self-start h-[56px]  w-full ">
                                <SvgButton
                                    path={svgs.x.path}
                                    viewBox={svgs.x.viewBox}
                                    onClick={() => {
                                        setChosenImages([]);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col items-center w-full my-3.5 px-6 min-h-[400px] justify-center overflow-hidden ">
                                {choosenImgs.length > 0 && (
                                    <motion.div
                                        initial={{ transitionDelay: "0.2", transitionDuration: "0.5" }}
                                        animate={{ backgroundColor: "rgba(8, 8, 8, 0.8)" }}
                                        className=" relative "
                                    >
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="">
                                            <img
                                                src={choosenImgs[currentImageIndex.index].url}
                                                alt="preview image"
                                                placeholder="blur"
                                                className={" w-auto max-h-[400px] object-contain bg-transparent   rounded-lg "}
                                                width={400}
                                                height={400}
                                            />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                            <form
                                className="relative min-h-[56px] w-full  gap-2 flex items-center justify-center  "
                                onSubmit={e => {
                                    e.preventDefault();
                                    handleSubmit();
                                    setChosenImages(null);
                                }}
                            >
                                <input
                                    type="text"
                                    className="placeholder:capitalize w-[90%] lg:w-[80%] bg-transparent  border border-slate-700 px-3.5 py-2.5  rounded-xl outline-none caret-[#505050]  placeholder:text-[#505050] text-[#ededed] text-sm"
                                    placeholder="send message..."
                                    value={text}
                                    onChange={e => {
                                        setText(e.target.value);
                                    }}
                                />
                                <SvgButton path={svgs.send.path} viewBox={svgs.send.viewBox} type="submit" />
                            </form>
                        </div>

                        <div className=" flex  flex-1 gap-3 justify-center w-full items-center">
                            {choosenImgs.length > 0 &&
                                choosenImgs?.map((image: Image, index: number) => (
                                    <div
                                        className={` w-[55px]  h-[55px] object-cover relative border-2  overflow-hidden rounded-full before:absolute before:inset-0 before:bg-transparent before:hover:bg-black/20   group/svg ${
                                            choosenImgs[index].id === currentImageIndex.id ? "border-whisper " : "border-slate-700"
                                        }`}
                                        onClick={e => {
                                            setCurrentImageIndex({
                                                id: image.id,
                                                index: index,
                                            });
                                        }}
                                    >
                                        <Image
                                            src={image.url as string}
                                            alt={``}
                                            className=" w-full h-full  object-cover rounded-lg "
                                            width={1000}
                                            height={1000}
                                        />
                                        <SvgButton
                                            path={svgs.x.path}
                                            viewBox={svgs.x.viewBox}
                                            ariaLabel={svgs.x.ariaLabel}
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                e.stopPropagation();
                                                handleImageDelete(image.id);
                                            }}
                                            type="button"
                                            className="fill-white  group-hover/svg:block  hidden absolute top-0 right-0  m-auto   "
                                        />
                                    </div>
                                ))}

                            <div className="border-2 border-slate-700  rounded-full  relative w-[55px] h-[55px] bg-transparent grid place-items-center">
                                <div className="group/svg">
                                    <label
                                        htmlFor="image"
                                        className="absolute  group-hover/svg:fill-[#40f5c8] left-0 top-0 rounded-full  h-full w-full cursor-pointer "
                                    ></label>
                                    <SvgButton path={svgs.add.path} viewBox={svgs.add.viewBox} className="stroke-[3px] stroke-slate-700 w-4 h-4 " />
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
                                                updateChoosenImgs: setChosenImages,
                                            });
                                        }}
                                        multiple
                                        max={4}
                                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
