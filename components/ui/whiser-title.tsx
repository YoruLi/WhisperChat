import { cn } from "@/utils/cn";
import React from "react";

export default function WhisperTitle({ className }: { className?: string }) {
    return (
        <>
            <h1 className={cn(` text-whisper font-anima mt-2  text-clamp-title `, className)}>Whisper</h1>
        </>
    );
}
