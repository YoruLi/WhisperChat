"use client";
import React from "react";

import ProfilePicture from "./profile-picture";
import { Session } from "@supabase/auth-helpers-nextjs";

import FollowButton from "./follow-button";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import TryAgain from "./ui/TryAgain";

import Spinner from "./spinner";
import { Profile } from "@/types/schemas";
import { getUserSuggestion } from "@/types/contexts/data";

export default function SuggestedForYou({
  session,
}: {
  session: Session | null;
}) {
  const userSuggestions: getUserSuggestion = async (id: string | undefined) => {
    const { data, error } = await supabase.rpc("getusersuggestions", {
      userid: id,
    });
    if (error) {
      return {
        success: false,
        error,
      };
    }

    return data;
  };

  const useSuggestionsUser = (
    userId: string | undefined
  ): UseQueryResult<Profile[], any> => {
    const queryClient = useQueryClient();
    return useQuery(
      ["suggested"],
      async () => {
        return userSuggestions(userId);
      },
      {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
          queryClient.setQueryData(["suggestions"], data);
        },
      }
    );
  };

  const { data, isError, isLoading, isSuccess } = useSuggestionsUser(
    session?.user.id
  );

  return (
    <div className="min-w-[360px] max-w-lg  max-h-[221px] h-full border-[1px] light:border-slate-300 dark:border-slate-700 chill:border-slate-700  [box-shadow:_1px_1px_10px_1px_rgba(0,0,0,0.1)]  rounded-none lg:rounded-md px-3 py-3 sticky top-0 right-0 mx-auto">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <TryAgain />
      ) : (
        isSuccess && (
          <>
            <div className="flex flex-col gap-2 w-full h-full ">
              <div className=" flex items-center">
                <div className="">
                  <h2 className="inline-block text-lg font-semibold text-slate-500">
                    Sugerencias para ti
                  </h2>
                </div>
              </div>

              {data
                .slice(0, 3)
                .map(({ id, email, full_name, profile_picture }) => {
                  return (
                    <div
                      key={id}
                      className="flex flex-shrink-0  gap-4 justify-between items-center "
                    >
                      <div className="flex gap-4 items-center w-full">
                        <div className="">
                          <ProfilePicture
                            email={email}
                            profile_picture={profile_picture}
                          />
                        </div>
                        <div className="overflow-hidden w-full">
                          <p className="text-sm font-medium chill:text-slate-200 light:text-slate-900 truncate">
                            {full_name ?? "@" + email.split("@")[0]}
                          </p>
                          <p className="text-xs font-medium text-slate-500 truncate">
                            {email}
                          </p>
                        </div>
                        <div>
                          <FollowButton
                            session_id={session?.user.id}
                            user_id={id}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

              {data.length > 3 ? (
                <Link href={`/suggested`} className="text-current text-xs ">
                  <span>Mostrar mas</span>
                </Link>
              ) : null}
            </div>
          </>
        )
      )}
    </div>
  );
}
