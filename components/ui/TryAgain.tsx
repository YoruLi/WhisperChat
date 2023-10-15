"use client";
import { useRouter } from "next/navigation";
import React from "react";
import SvgIcon from "../SvgIcon";
import svgs from "@/data/svgs";

export default function TryAgain() {
    const router = useRouter();
    return (
        <div className="text-red-600 ">
            <h2 className="">Something went wrong. Try reloading.</h2>
            <button className="flex gap-3" onClick={() => router.refresh()}>
                <SvgIcon path={svgs.reloadIcon.path} viewBox={svgs.reloadIcon.viewBox} className="w-5 h-5 fill-red-600 self-center" />
                <span className="">Retry</span>
            </button>
        </div>
    );
}
