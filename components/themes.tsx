"use client";

import React from "react";

type Props = {
    handler: any;
    currentTheme: string | undefined;
};

export default function Themes({ handler, currentTheme }: Props) {
    const THEMES = ["dark", "light", "chill"];

    return (
        <fieldset aria-label="Color options" data-testid={`color-fieldset`} className="w-full flex items-center justify-center text-center">
            <legend className="dark:text-slate-400 chill:text-slate-400 light:text-black">Choose a theme</legend>
            <select
                className="flex gap-3 bg-transparent cursor-pointer lg:max-w-lg max-w-[90%] w-full text-center  appearance-none  border border-slate-600  rounded-md px-4 py-1.5"
                id="colors"
                value={currentTheme}
                onChange={e => handler(e.target.value)}
            >
                {THEMES.map(value => (
                    <option value={value}>{value}</option>
                ))}
            </select>
        </fieldset>
    );
}
// <label
//     onClick={e => handler(value.color)}
//     htmlFor={value.color}
//     style={{ backgroundColor: value.bgColor }}
//     className={cn("grid place-content-center w-8 h-8 rounded-full border-2 cursor-pointer", {
//         "border-collapse ": checked,
//         "border-transparent": !checked,
//     })}
// >
//     <input type="radio" id={value.color} defaultChecked={checked} value={value.color} className="block appearance-none " />
// </label>
