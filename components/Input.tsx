import { cn } from "@/utils/cn";
import React from "react";

export default function Input({
    text,
    className,
    placeholder,
    value,
    label,
    setValue,
}: {
    text: string;
    label?: any;
    className?: string;
    placeholder?: string | null;
    value?: string;
    setValue?: any;
    // setValue?: ((data: string) => void) | undefined;
}) {
    return (
        <div className={cn("relative group w-full", className)}>
            <input
                type="text"
                name="email"
                placeholder={placeholder ?? ""}
                value={value}
                onChange={e => {
                    setValue &&
                        setValue((prev: any) => ({
                            ...prev,
                            [label]: e.target.value,
                        }));
                }}
                className="w-full p-3 text-sm appearance-none outline-none border-slate-300 bg-transparent  border-[0.2px] rounded-md border-opacity-50  focus:border-emerald-400 dark:text-slate-400 chill:text-slate-400 light:text-black placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
            />
            <span className="  pointer-events-none text-sm bg-[#181920] backdrop-blur-sm  absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                {text}
            </span>
        </div>
    );
}
