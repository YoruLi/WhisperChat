"use client";

import { cn } from "@/utils/cn";

import React from "react";

type Props = {
    handler: any;
    currentColor: string | undefined;
};

type IColor = {
    color: string;
    bgColor: string;
};

export default function Colors({ handler, currentColor }: Props) {
    const COLORS: IColor[] = [
        {
            color: "default",
            bgColor: "#40f5c8",
        },
        {
            color: "rose",
            bgColor: "#ef6191",
        },
        {
            color: "violet",
            bgColor: "#7756ff",
        },
        {
            color: "orange",
            bgColor: "#ffc107",
        },
        {
            color: "green",
            bgColor: "#38ef7d",
        },
        {
            color: "blue",
            bgColor: "#2196f3",
        },
    ];

    return (
        <>
            <fieldset aria-label="Color options" data-testid={`color-fieldset`} className="w-full flex items-center justify-center text-center">
                <legend className="dark:text-slate-400 chill:text-slate-400 light:text-black">Choose a color</legend>
                <select
                    className="flex gap-3 bg-transparent cursor-pointer lg:max-w-lg max-w-[90%] w-full text-center  appearance-none  border border-slate-600  rounded-md px-4 py-1.5"
                    id="colors"
                    onChange={e => handler(e.target.value)}
                    value={currentColor}
                >
                    {COLORS.map(color => (
                        <option value={color.color}>{color.color}</option>
                    ))}
                </select>
            </fieldset>
        </>
    );
}

/* // <label
//     onClick={e => handler(value.color)}
//     htmlFor={value.color}
//     style={{ backgroundColor: value.bgColor }}
//     className={cn("grid place-content-center w-8 h-8 rounded-full border-2 cursor-pointer", {
//         "border-collapse ": checked,
//         "border-transparent": !checked,
//     })}
// >
//     <input type="radio" id={value.color} defaultChecked={checked} value={value.color} className="block appearance-none " />
// </label> */
