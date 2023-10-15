"use client";

import SvgIcon from "@/components/SvgIcon";
import svgs from "@/data/svgs";
import { ChatInfo } from "@/types/contexts/data";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import React from "react";

export default function NextButton({
    imageUrls,
    setShowOptions,
    showOptions,
}: {
    imageUrls: ChatInfo["messages"];
    showOptions: any;
    setShowOptions: (data: any) => void;
}) {
    const showNextImage = () => {
        const currentIndex = imageUrls.findIndex(item => item.message.image_url === showOptions.image);
        const nextIndex = (currentIndex + 1) % imageUrls.length;

        setShowOptions({
            image: imageUrls[nextIndex].message.image_url,
        });
    };
    return (
        <button
            className={cn(
                "self-center opacity-100 [&>svg]:h-8 [&>svg]:w-8 [&>svg]:fill-slate-200 [&>svg]:stroke-slate-200 light:[&>svg]:stroke-slate-400 light:[&>svg]:fill-slate-400 "
            )}
            onClick={showNextImage}
        >
            <SvgIcon {...svgs.rightArrow} />
        </button>
    );
}
