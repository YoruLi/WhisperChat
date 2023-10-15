import React from "react";
import Spinner from "../spinner";

export default function MainLoader() {
    return (
        <div className=" min-h-screen w-full h-screen fixed grid place-content-center inset-0 gap-6 bg-background-900 ">
            <h2 className="text-5xl text-current font-anima font-bold">Whisper</h2>
            <Spinner sm={false} />
        </div>
    );
}
