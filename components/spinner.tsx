import { cn } from "@/utils/cn";
import React from "react";

export default function Spinner({ sm = false, className }: { sm?: boolean; className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={sm ? "20" : "32"}
            width={sm ? "20" : "32"}
            stroke="inherit"
            fill="inherit"
            viewBox="0 0 24 24"
            className={cn("self-center mx-auto stroke-current relative ", className)}
        >
            <style>
                {`
                @keyframes animation {
                    100% { transform: rotate(360deg); }
                }
                @keyframes animation2 {
                    0% { stroke-dasharray: 0 150; stroke-dashoffset: 0; }
                    47.5% { stroke-dasharray: 42 150; stroke-dashoffset: -16; }
                    95%, 100% { stroke-dasharray: 42 150; stroke-dashoffset: -59; }
                }
                `}
            </style>
            <g>
                <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    fill="none"
                    stroke-width="3"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="42 150"
                    strokeDashoffset="0"
                    style={{ animation: "animation2 1.5s ease-in-out infinite" }}
                />
            </g>
        </svg>
    );
}
