import React from "react";

export default function Greetings({ signUp }: { signUp: boolean }) {
    return (
        <div className="bg-black hidden lg:flex  w-full h-full lg:flex-col items-center justify-center text-5xl font-bold font-anima text-slate-400 ">
            {signUp ? "Welcome to" : " Welcome back to"} <h2 className="text-[#40f5c8] type_wrriter max-w-max relative">Whisper Chat</h2>
        </div>
    );
}
