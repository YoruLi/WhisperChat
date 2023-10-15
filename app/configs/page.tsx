import Colors from "@/components/colors";
import Themes from "@/components/themes";
import { cookies } from "next/headers";

import React from "react";

export default function ConfigsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const currentColor = cookieStore.get("color") ?? "default";
  const currentTheme = cookieStore.get("theme") ?? "chill";

  async function handleChangeColor(color: string) {
    "use server";
    cookies().set("color", color);
  }

  async function handleChangeTheme(theme: string) {
    "use server";
    cookies().set("theme", theme);
  }

  return (
    <div className="flex flex-col h-[100dvh] items-center justify-center w-full gap-6">
      <div>
        <h2 className="dark:text-slate-200 chill:text-slate-300 light:text-black  text-center text-xl">
          Customize your view
        </h2>
        <legend className="text-slate-300 dark:text-slate-200 chill:text-slate-400 light:text-slate-600 text-center">
          You can personalize Whisper so much as you want
        </legend>
      </div>
      <div className="space-y-3 w-full ">
        <Colors
          handler={handleChangeColor}
          currentColor={(currentColor as { value: string })?.value}
        />

        <Themes
          handler={handleChangeTheme}
          currentTheme={(currentTheme as { value: string })?.value}
        />
      </div>
    </div>
  );
}
