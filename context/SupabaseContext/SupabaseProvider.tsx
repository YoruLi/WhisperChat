"use client";

import React, { useCallback, useEffect, useState } from "react";
import SupabaseContext from "./SupabaseContext";
import { usePathname, useRouter } from "next/navigation";

import { SupabaseState, Profile, getMessages, sendImageToChat, Message, Chat } from "../types";

import { supabase } from "@/utils/supabase";

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<SupabaseState["session"]>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    const router = useRouter();

    const searchQuery = async (query: string) => {
        const { data, error } = await supabase.from("profiles").select().neq("id", profile?.id).ilike("email", `${query}%`);

        if (error) {
            return { success: false, error };
        }
        return data.map(result => ({ ...result, created_at: new Date(result.created_at) }));
    };

    interface SendMessageResponse {
        created_chat: Date | null;
        inserted_message: Message | null;
    }

    const sendMessageToChat = async (chatData: Chat, messageData: Message, imageUrl: any): Promise<any> => {
        const { data, error }: { data: SendMessageResponse | null; error: any } = await supabase
            .rpc("send_message_to_chat", {
                sender_profile_id: profile?.id,
                receiver_profile_id: chatData.profile.id,
                chat: chatData,
                message: messageData,
                image: imageUrl ? "https://ifweifsbugrkcnnwttqn.supabase.co/storage/v1/object/public/whisper-bucket/" + imageUrl : null,
            })
            .single();
        if (error) {
            return { success: false, error };
        }

        const { created_chat, inserted_message } = data as SendMessageResponse;
        const last_message = {
            ...inserted_message,
            created_at: inserted_message ? new Date(inserted_message.created_at) : null,
        };

        return {
            ...chatData,
            ...created_chat,
            last_message,
            messages: [last_message, ...chatData.messages],
        };
    };
    const getChats = async () => {
        const { data: chats, error } = await supabase.rpc("get_profile_chats", {
            p_id: profile?.id,
        });

        if (error) {
            console.log(error);
            return { success: false, error };
        }

        return chats.map(({ chat, last_message, profile }: { chat: Chat; last_message: any; profile: Profile }) => ({
            ...chat,
            last_message: { ...last_message, created_at: new Date(last_message.created_at) },
            profile,
        }));
    };

    const getChatRooms = async (chatroomId: Chat) => {
        const { data, error } = await supabase
            .rpc("get_chatroom_info", {
                cr_id: chatroomId,
                p_id: profile?.id,
            })
            .single();

        if (error) {
            return { success: false, error };
        }

        const { messages, profile: senderProfile }: any = data;

        return {
            last_message: { ...messages, created_at: new Date(messages.created_at) },
            profile: { ...senderProfile, created_at: new Date(senderProfile.created_at) },
        };
    };

    const getMessages: getMessages = async (from = 0, to = 0, chat: any, signal) => {
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("chatroom_id", chat.chatroom_id)
            .order("created_at", { ascending: false })
            .range(from, to)
            .abortSignal(signal);

        if (error) {
            console.log("message error", error);
            return { sucess: false, error };
        }

        return messages;
    };

    const updateLastSeen = async (date: any, user: any) => {
        const { data, error } = await supabase.from("profiles").update({ last_seen: date }).eq("id", user).select();

        if (error) {
            return { sucess: false, error };
        }

        console.log(data);
        return { sucess: true, data };
    };

    const sendImageToChat: sendImageToChat = async (message, newImage, chat) => {
        console.log(newImage.name);
        const { data, error } = await supabase.storage.from("whisper-bucket").upload(`${profile?.email}/${newImage.name}`, newImage);
        if (error) {
            console.error(error);
            return;
        }
        return data.path;
    };

    const sendAudioToChat = async (audio: any) => {
        const { data, error } = await supabase.storage.from("whisper-bucket").upload(`${profile?.email}/${audio.name}`, audio, {
            contentType: "audio/mpeg",
        });
        if (error) {
            console.error(error);
            return;
        }

        return data.path;
    };

    const downloadImage = async (newImage: any) => {
        const { data, error } = await supabase.storage.from("whisper-bucket").download(`${profile?.email}/${newImage.split("/").at(-1)}`);
        console.log(data);
        if (error) {
            console.error(error);
            return;
        }

        return data;
    };

    const getPost = async (postId: string) => {
        const { data: post, error } = await supabase
            .from("posts")
            .select(`*, profiles:profile_id(*),  likesPost(*),  comments(*, profiles:profile_id(*))`)
            .eq("id", postId)
            .single();
        if (error) {
            console.error(error);
            return {
                success: false,
                error,
            };
        }

        return post;
    };
    const handleAuthStateChange = useCallback(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "INITIAL_SESSION") return setSession(session);

            if (event === "SIGNED_OUT") {
                setSession(null);
                router.push("/");
            }
        });
    }, []);
    useEffect(handleAuthStateChange, []);

    return (
        <SupabaseContext.Provider
            value={{
                session,
                profile,
                searchQuery,
                sendMessageToChat,
                getChats,
                getMessages,
                updateLastSeen,
                getChatRooms,
                downloadImage,
                sendImageToChat,
                sendAudioToChat,
                getPost,
            }}
        >
            {children}
        </SupabaseContext.Provider>
    );
};
