import React from "react";

export default function Faq({ summary, children }: { summary: string; children: React.ReactNode }) {
    return (
        <details
            open
            className="hidden lg:block [&[open]>summary]:border-b [&[open]>summary>div>svg]:rotate-[-180] [&[open]>summary]:border-gray-700  [&[open]>summary]:text-current  dark:border-gray-700 light:border-slate-300 chill:border-gray-700 border-b w-full select-none"
        >
            <summary className="py-3  text-base font-medium text-gray-400 hover:cursor-pointer">
                <div className="flex justify-between items-center whitespace-break-spaces light:text-black">
                    {summary}

                    <svg className="w-3 h-3 shrink-0 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </div>
            </summary>

            <p className="text-gray-500 py-3 font-medium ">{children}</p>
        </details>
    );
}
