import React, { Dispatch, SetStateAction, useContext } from "react";
import ProfilePicture from "../../profile-picture";
import AppContext from "@/context/AppContext/AppContext";
import { useRouter } from "next/navigation";
import { Chat as IChat } from "@/context/types";

interface SearchResult {
    id: string;
    created_at: string;
    email: string;
    status: string;
    profile_picture: string;
}

interface Props {
    results: SearchResult[] | null;
    setSearch: Dispatch<SetStateAction<string>>;
}
export default function Results({ results, setSearch }: Props) {
    const router = useRouter();
    const { setOpenedChat, state } = useContext(AppContext);
    const handleResultClick = (profileResult: SearchResult) => {
        const foundedChat = state.chats.find((chat: IChat) => chat.profile.id === profileResult.id);
        setSearch("");

        setOpenedChat(foundedChat ? foundedChat : { profile: profileResult, messages: [] });
        router.push(`chats/${profileResult.email}`);
    };

    const withoutResults = results?.length === 0;
    return (
        <div {...(withoutResults && { className: "grid place-content-center" })}>
            {withoutResults ? (
                <span className="text-slate-500">No se encontraron resultados...</span>
            ) : (
                results?.map(profileResult => {
                    const { email, status, id } = profileResult;

                    return (
                        <div key={id} className="p-3.5 flex gap-4 hover:bg-[#130c1886]" onClick={() => handleResultClick(profileResult)}>
                            <ProfilePicture {...profileResult} />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{email}</span>
                                <span className="text-xs text-slate-500">{status}</span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
