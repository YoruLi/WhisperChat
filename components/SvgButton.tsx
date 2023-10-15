import { Svg } from "@/data/svgs";
import { cn } from "@/utils/cn";
import React from "react";

type Props<T = any> = Svg & {
    onClick?: T;
    size?: string;
    className?: string;
    disabled?: boolean;
    type?: "submit" | "button" | "reset" | undefined;
};

export default function SvgButton({ viewBox, path, className, onClick, ariaLabel, title, size, disabled, type, ...props }: Props) {
    return (
        <button
            aria-label={ariaLabel}
            tabIndex={0}
            role={type}
            type={type}
            style={{ userSelect: "none" }}
            title={title}
            onClick={onClick}
            disabled={disabled}
            className={`group/svg grid place-items-center  ${size ? size : " w-6 h-6"}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden={true}
                viewBox={viewBox}
                className={cn(
                    `stroke-slate-500 transition-colors duration-300  dark:hover:fill-current dark:hover:stroke-current  light:hover:fill-current light:hover:stroke-current  chill:hover:fill-current chill:hover:stroke-current stroke-[0.4px] focus:fill-current focus:stroke-current dark:fill-slate-500 chill:fill-slate-500 light:fill-slate-800
                    ${size ? size : " w-6 h-6"} ${disabled ? "fill-current/25" : ""}`,
                    className
                )}
                {...props}
            >
                <path d={path}></path>
            </svg>
        </button>
    );
}
