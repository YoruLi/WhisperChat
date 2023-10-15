"use client";

import svgs, { Icons } from "@/data/svgs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SvgButton from "../SvgButton";
import { useSearchModal } from "../ui/stores/search-modal";
import { cn } from "@/utils/cn";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function AsideIcons({ session }: { session: Session | null }) {
  const toggleSearchModal = useSearchModal((state) => state.toggleModal);
  const closeSearchModal = useSearchModal((state) => state.closeModal);

  const pathname = usePathname();
  const handleSearchIconClick = (svg: Icons) => {
    if (svg.name === "search") return toggleSearchModal();

    closeSearchModal();
  };
  const visibleIcons = svgs.asideIcons.filter((svg) => {
    if (!session) {
      return (
        svg.name === "home" || svg.name === "search" || svg.name === "configs"
      );
    }
    return true;
  });

  return (
    <>
      {visibleIcons.map((svg) => (
        <Link
          key={svg.name}
          href={`${
            svg.pathname === "/profile/"
              ? `/${session?.user.id}`
              : !svg.pathname
              ? `${pathname}`
              : svg.pathname
          }`}
          className={`  p-4 bg-transparent grid  place-content-center transition-all duration-300 ease-linear w-full text-current 
        
                    `}
        >
          <SvgButton
            {...svg.svg}
            onClick={() => handleSearchIconClick(svg)}
            className={cn(`!stroke-[0.4px] `, {
              " !fill-current !stroke-current":
                svg.pathname && pathname.includes(`${svg.pathname}`),
              " chill:hover:fill-current light:hover:fill-current dark:hover:fill-current  !hover:stroke-current  ":
                !pathname.includes(`${svg.pathname}`),
            })}
          />
        </Link>
      ))}
    </>
  );
}
