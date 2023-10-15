import Link from "next/link";
import React from "react";

export const NavigationTab = ({
  href,
  text,
  active,
}: {
  href: string;
  text: string;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      role="tab"
      tabIndex={active ? 0 : -1}
      replace={true}
      prefetch={true}
      className={`${
        active ? "text-current  border-current" : "text-slate-500"
      }  border-b border-transparent`}
    >
      <span className="text-sm">{text}</span>
    </Link>
  );
};
