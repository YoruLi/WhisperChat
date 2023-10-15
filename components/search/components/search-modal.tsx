"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { searchQuery } from "../hooks/useSearch";
import { useSearchModal } from "../../ui/stores/search-modal";
import Search from "./search";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function SearchModal({ session }: { session: Session | null }) {
  const setSearchModal = useSearchModal((state) => state.toggleModal);
  const searchModal = useSearchModal((state) => state.isModalOpen);
  return (
    <AnimatePresence>
      {searchModal && (
        <>
          <motion.div
            onClick={(e) => {
              setSearchModal();
              e.stopPropagation();
            }}
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="chill:bg-[#181920] dark:bg-black light:bg-white fixed inset-0 md:w-[440px]  md:-left-[0] chill:border-slate-700 dark:border-slate-700 light:border-slate-300  border-r  lg:w-[388px]  lg:bottom-0  z-[50] lg:left-[4.48rem] h-full "
          >
            <div className="flex flex-col gap-4">
              <h1 className="chill:text-current dark:text-current light:text-black font-telegraf font-light  px-6 pt-4">
                Busca personas, temas o palabras
              </h1>
              <div
                onClick={(e) => e.stopPropagation()}
                className="border-b border-t dark:border-slate-700 light:border-slate-300 chill:border-slate-700 py-5"
              >
                <Search
                  placeholder="Buscar usuarios..."
                  searchFunction={searchQuery}
                  session={session}
                  variant="profile"
                />
              </div>

              <h2 className="  px-6 py-1 text-slate-400">Recientes</h2>
            </div>
          </motion.div>

          <div
            onClick={(e) => {
              setSearchModal();
              e.stopPropagation();
            }}
            className="inset-0 absolute bg-transparent z-[49] "
          ></div>
        </>
      )}
    </AnimatePresence>
  );
}
