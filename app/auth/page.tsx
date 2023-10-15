"use client";

import Link from "next/link";
import React from "react";
import Globe from "@/components/globe";

import { AnimatePresence, motion } from "framer-motion";
export default function page() {
  return (
    <div className="fixed inset-0 ">
      <AnimatePresence>
        <motion.div
          key={"global-modal"}
          initial={{ scale: 0, transitionDuration: "0.5s" }}
          animate={{ scale: 1 }}
          className="grid place-items-center h-full gap-8 py-3 text-center"
        >
          <div className="">
            <div className=" w-full h-full lg:w-[500px] lg:h-[500px]">
              <Globe />
            </div>
            <h1 className="text-3xl uppercase font-light font-anima  ">
              <span className="chill:text-slate-400 dark:text-slate-200 light:text-black">
                {" "}
                Welcome to
              </span>
              <span className="text-current font-bold"> Whisper</span>
            </h1>

            <div className="flex flex-row justify-center gap-6">
              <Link
                prefetch={false}
                href={"/auth/login"}
                className="bg-transparent rounded border-2 px-3 py-1.5 capitalize hover:text-current hover:border-current chill:text-slate-500 dark:text-slate-200 light:text-black border-slate-700 hover:shadow-inner hover:shadow-current  transition-shadow "
              >
                log in
              </Link>
              <Link
                prefetch={false}
                href={"/auth/signup"}
                className="bg-transparent rounded border-2 px-3 py-1.5 capitalize hover:text-current hover:border-current chill:text-slate-500 dark:text-slate-200 light:text-black border-slate-700 hover:shadow-inner hover:shadow-current  transition-shadow "
              >
                sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
