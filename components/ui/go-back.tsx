"use client";
import svgs from "@/data/svgs";
import React from "react";
import SvgButton from "../SvgButton";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();
  return (
    <SvgButton
      path={svgs.leftArrow.path}
      viewBox={svgs.leftArrow.viewBox}
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        router.back();
      }}
      className="z-[49] "
    />
  );
}
