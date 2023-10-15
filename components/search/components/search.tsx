"use client";
import React, { useEffect, useState } from "react";
import Spinner from "../../spinner";
import SvgButton from "../../SvgButton";
import svgs from "@/data/svgs";
import { useDebounce } from "@/lib/use-debounce";
import { useSearch } from "../hooks/useSearch";
import TryAgain from "../../ui/TryAgain";
import ProfilePicture from "../../profile-picture";
import removeDiacriticChars from "@/data/removeDiacriticChars";
import { motion } from "framer-motion";
import { ChatsLoader } from "../../ui/ChatsLoader";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { useSearchModal } from "../../ui/stores/search-modal";
import { Profile } from "@/types/schemas";

const variants = {
  show: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.2,
    },
  }),
  hidden: { opacity: 0 },
};

const container = {
  hidden: {
    y: 0,
  },

  show: {
    y: 0,

    transition: { delayChildren: 0.5, staggerChildren: 0.5 },
  },
};

export default function Search({
  placeholder,
  searchFunction,
  variant,

  session,
}: {
  placeholder: string;
  searchFunction: any;
  variant: string;

  session: Session | null;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const cleanQuery = query
    .toLowerCase()
    .replace(/[^\w. ]/g, (char) => removeDiacriticChars[char] || "")
    .trim();
  const debounceValue = useDebounce(
    cleanQuery.length >= 3 ? cleanQuery : "",
    500
  );
  const {
    data,
    isFetching,
    isError,
    refetch,
    isRefetching,
    remove,
    isPreviousData,
  } = useSearch(debounceValue, searchFunction, session);
  const closeModal = useSearchModal((state) => state.closeModal);
  useEffect(() => {
    if (cleanQuery == "") {
      remove();
      setQuery("");
    }
  }, [cleanQuery]);

  const clearQuery = () => {
    setQuery("");
    remove();
  };

  const handleResult = (profileResult: any) => {
    clearQuery();

    variant === "profile"
      ? router.push(`/${profileResult.id}`)
      : router.push(`/chats/${profileResult.id}`);
    closeModal();
  };

  if (isError) return <TryAgain />;

  return (
    <div className="flex flex-col gap-4 relative ">
      <form
        className="flex-1 px-3 justify-center items-center flex relative  "
        onSubmit={(e) => {
          e.preventDefault(), setQuery("");
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent border light:text-black chill:text-slate-400 dark:text-slate-400 light:border-slate-300 border-slate-700  placeholder:text-slate-500 pl-6 rounded-lg outline-none py-2.5 text-sm  "
          value={query}
          onChange={(evt) => {
            setQuery(evt.target.value);
          }}
        />
        <div className="absolute right-5">
          {query == "" || !isFetching ? (
            <SvgButton
              viewBox={query ? svgs.x.viewBox : svgs.search.viewBox}
              aria-label={query ? "Limpiar búsqueda" : "Buscar personas"}
              title={query ? "Limpiar" : "Buscar"}
              type={query ? "button" : "submit"}
              onClick={() => {
                query && clearQuery();
              }}
              path={query ? svgs.x.path : svgs.search.path}
            />
          ) : isFetching || isPreviousData ? (
            <Spinner sm={true} />
          ) : null}
        </div>
      </form>

      <div className="absolute top-10 w-full z-40 dark:bg-black light:bg-white chill:bg-[#10131c] ">
        {isFetching && query ? (
          <ChatsLoader />
        ) : isError ? (
          <TryAgain />
        ) : (
          data && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <div className="p-3.5 flex flex-col gap-4 bg-transparent rounded border  border-slate-700 chill:hover:bg-[#1e1f27] light:hover:bg-gray-400  cursor-pointer">
                {data && data.length === 0 ? (
                  <span className="text-slate-500">
                    No se encontraron resultados.
                  </span>
                ) : (
                  data?.map((profile: Profile, index: number) => (
                    <motion.div
                      variants={variants}
                      custom={index}
                      animate="show"
                      initial="hidden"
                      exit="hidden"
                      key={profile.id}
                      onClick={() => handleResult(profile)}
                      className="flex gap-2 items-center relative"
                    >
                      <div>
                        <ProfilePicture {...profile} />
                      </div>

                      <div className="flex flex-col w-full">
                        <span className="text-sm font-medium">
                          {profile.email}
                        </span>
                        <span className="text-xs text-slate-500">
                          {profile.status}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
