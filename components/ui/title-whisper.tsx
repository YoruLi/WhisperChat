"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function TitleWhisper() {
    const router = useRouter();
    return (
        <h1 className="font-anima mt-2 mb-2.5 text-clamp-title cursor-pointer " onClick={() => router.refresh()}>
            Whisper
        </h1>
    );
}
