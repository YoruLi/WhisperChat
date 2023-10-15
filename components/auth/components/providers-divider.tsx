import React from "react";
export default function ProvidersDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 my-auto h-[1px] w-full chill:bg-slate-700 dark:bg-white light:bg-slate-300" />

      <div className="relative flex justify-center py-4 ">
        <span className="px-2 text-xs font-light uppercase  text-slate-400 chill:bg-[#181920] dark:bg-black light:bg-white">
          O continuar con
        </span>
      </div>
    </div>
  );
}
