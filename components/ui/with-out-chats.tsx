import Image from "next/image";
import React from "react";
import withOutImage from "../../public/imgs/withOutChats.png";
export default function WithOutChats() {
    return (
        <div className="text-white lg:grid lg:place-content-center  lg:min-h-screen lg:fixed lg:w-[calc(100%+300px)]  z-0 hidden lg:text-center">
            <div className="relative flex justify-center items-center flex-col">
                <Image src={withOutImage} alt="you dont have chats open" width={400} height={400} priority />
                <div>
                    <span className="text-[#40f5c8] text-2xl font-semibold block pb-3 animate-pulse">Whisper Chat </span>
                    <legend className="text-sm text-slate-400">Envía y recibe mensajes en tiempo real de tus amigos!!</legend>
                </div>
            </div>
        </div>
    );
}
