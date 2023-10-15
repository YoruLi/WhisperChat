"use client";
import React from "react";
import { NavigationTab } from "./navigation-tab";
import { usePathname } from "next/navigation";

export default function ProfileNavigation({ id }: { id: string }) {
  const pathname = usePathname();
  return (
    <nav className="grid grid-flow-col  place-items-center w-full">
      <NavigationTab
        href={`/${id}`}
        text="Posts"
        active={pathname === `/${id}`}
      />
      <NavigationTab
        href={`/${id}/with-replies`}
        text="Comentarios"
        active={pathname === `/${id}/with-replies`}
      />
      <NavigationTab
        href={`/${id}/media`}
        text="Media"
        active={pathname === `/${id}/media`}
      />
      <NavigationTab
        href={`/${id}/likes`}
        text="Me gustas  "
        active={pathname === `/${id}/likes`}
      />
    </nav>
  );
}
