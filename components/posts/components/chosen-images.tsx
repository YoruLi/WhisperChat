import React from "react";
import { IChosenImages } from "../utils/chooseImages";

import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import Image from "next/image";

export const ChosenImages = ({
    chosenImages,
    setChosenImages,
    close = true,
}: {
    chosenImages: IChosenImages[];
    setChosenImages: (images: any) => void;
    close?: boolean;
}) => {
    return (
        <div
            className={`grid mx-4 gap-2.5 max-h-[700px]  ${
                chosenImages.length === 1
                    ? "grid-cols-1"
                    : chosenImages.length === 2
                    ? "grid-cols-2"
                    : chosenImages.length === 3
                    ? "grid-cols-2 grid-rows-2"
                    : chosenImages.length === 4
                    ? "grid-cols-2 grid-rows-2 four"
                    : ""
            }`}
        >
            {chosenImages.map(img => {
                return (
                    <div
                        key={img.id}
                        className={`relative max-h-[300px] rounded-lg overflow-hidden shadow-sm shadow-white/10  ${
                            chosenImages.length === 2
                                ? "aspect-two-images"
                                : chosenImages.length === 3
                                ? "first:row-span-2 first:aspect-two-images first:col-span-1 [&:nth-child(2)]:aspect-three-images [&:nth-child(2)]:col-span-1 [&:nth-child(3)]:aspect-three-images [&>img:nth-child(3)]:col-span-1"
                                : chosenImages.length === 4
                                ? "  first:aspect-three-images first:col-span-1  [&>img:nth-child(2)]:aspect-three-images [&>img:nth-child(2)]:col-span-1 [&>img:nth-child(3)]:aspect-three-images [&>img:nth-child(3)]:col-span-1 [&>img:nth-child(4)]:aspect-three-images [&:nth-child(4)]:col-span-1 "
                                : ""
                        } `}
                    >
                        <Image src={img.url as string} alt={``} className=" w-full h-full  object-cover rounded-lg " width={1000} height={1000} />

                        {close && (
                            <SvgButton
                                path={svgs.x.path}
                                viewBox={svgs.x.viewBox}
                                ariaLabel={svgs.x.ariaLabel}
                                onClick={() => {
                                    setChosenImages((prevImages: IChosenImages[]) => prevImages.filter((image: IChosenImages) => image.id !== img.id));
                                }}
                                type="button"
                                className="absolute top-0 left-1 fill-[#2cf6c4] "
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
