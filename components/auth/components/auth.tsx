"use client";
import Link from "next/link";

import React from "react";

import { useAuth } from "@/context/AuthFormContext/AuthFormProvider";
import GoBack from "../../ui/go-back";
import ProvidersDivider from "./providers-divider";
import AuthProviderButtons from "./auth-provider-buttons";

export default function Auth({ login }: { login: boolean }) {
  const { handleSignInWithEmail, handleSignUpWithEmail } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (login) {
      handleSignInWithEmail(event);
      return;
    }
    handleSignUpWithEmail(event);
  };
  return (
    <div className="w-full h-full m-auto grid place-items-center relative">
      <div className="absolute left-0 top-0 ">
        <GoBack />
      </div>
      <div className="max-w-md w-full">
        <h1 className="text-3xl text-clamp-paragraph-header-title font-anima chill:text-slate-400 dark:text-slate-400 light:text-black">
          {login ? "Bienvenido de nuevo " : "Crea tu cuenta"}
        </h1>
        <section className="flex flex-col gap-4 p-4 w-full">
          <form
            className="flex flex-col items-center w-full gap-4"
            onSubmit={handleSubmit}
          >
            <div className="relative group  w-full ">
              <input
                type="email"
                name="email"
                placeholder="email address"
                className="w-full p-3 text-sm appearance-none dark:caret-white dark:text-white  chill:caret-white chill:text-white outline-none border-slate-300 bg-transparent  border-[0.2px] rounded-md border-opacity-50  light:focus:border-slate-400 dark:focus:border-current chill:focus:border-current placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
              />
              <span className="pointer-events-none text-sm text-slate-400 chill:bg-[#181920] dark:bg-black light:bg-white absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                Email address
              </span>
            </div>

            <div className="relative group  w-full ">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full p-3 text-sm appearance-none dark:caret-white dark:text-white  chill:caret-white chill:text-white outline-none border-slate-300 bg-transparent  border-[0.2px] rounded-md border-opacity-50  light:focus:border-slate-400 dark:focus:border-current chill:focus:border-current placeholder-gray-300 placeholder-opacity-0 transition-transform duration-200"
              />
              <span className="pointer-events-none text-sm text-slate-400 chill:bg-[#181920] dark:bg-black light:bg-white absolute left-3 top-3.5 px-1 transition-transform duration-200 input-text">
                Password
              </span>
            </div>

            <button
              type="submit"
              className="p-3 w-full rounded-lg bg-black light:text-white chill:text-white dark:text-white capitalize font-semibold transition-colors duration-500"
            >
              {login ? "Inicia session" : "Regístrate"}
            </button>
          </form>
          <ProvidersDivider />
          <AuthProviderButtons />

          <legend className="font-sans  group text-center text-xs chill:text-white dark:text-white light:text-black font-light">
            {login ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            &nbsp;&nbsp;
            <Link
              href={`/auth/${login ? "signup" : "login"}`}
              className="chill:text-current dark:text-current light:text-black group-hover:text-current/70 transition-colors underline "
            >
              {login ? "Regístrate" : "Inicia sesión"}
            </Link>
          </legend>
        </section>
      </div>
    </div>
  );
}
