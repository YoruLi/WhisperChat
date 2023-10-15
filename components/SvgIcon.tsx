import React from "react";
import { Svg } from "@/data/svgs";
import { cn } from "@/utils/cn";

interface Props extends Svg {
    className?: string;
}
export default function SvgIcon({ viewBox, path, className, circle }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} className={cn(`fill-[#b7b6b6] bg-transparent w-6 h-6`, className)}>
            <path d={path}></path>
            {circle && <circle cx={circle.cx} cy={circle.cy} r={circle.r}></circle>}
        </svg>
    );
}
