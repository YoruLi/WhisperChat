import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

interface Props {
    profile_picture: string | null | undefined;
    email: string | null | undefined;
    size?: string;
    classname?: string;
}
export default function ProfilePicture({ profile_picture, email, size, classname }: Props) {
    return (
        <button
            className={cn(
                ` md:12 md:12 grid place-content-center  border-[2px] border-transparent hover:border-current rounded-full transition-colors duration-500 w-10 h-10 `,
                size
            )}
        >
            <Image
                src={profile_picture ?? "../imgs/placeholder.svg"}
                className={cn("rounded-full block min-h-full w-full aspect-square object-cover", classname)}
                alt={`Foto de perfil de ${email}`}
                width={600}
                height={600}
                referrerPolicy="no-referrer"
                priority
            />
        </button>
    );
}
