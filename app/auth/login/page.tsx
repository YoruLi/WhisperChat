import Auth from "@/components/auth/components/auth";
import Greetings from "@/components/ui/greetings";
import React from "react";

export default function ModalLogin() {
  return (
    <>
      <div className="flex w-[90%] justify-center bg-transparent items-center text-center max-w-lg flex-col gap-8 py-8 px-4 md:max-w-xl 2xl:max-w-2xl 2xl:p-10 ">
        <Auth login={true} />
      </div>
      <Greetings signUp={false} />
    </>
  );
}
