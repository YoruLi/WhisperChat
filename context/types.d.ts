import { Session, User, Provider, PostgrestError } from "@supabase/supabase-js";
import { openedChat } from "./AppContext/types";

export interface SupabaseState {
    session: Session | null;
    profile: Profile | null;
}

export type Chat = {
    id: string;
    profile: Profile;
    messages: Message[];
    chatroom_id: Chatroom["id"];
    last_message: LastMessage;
};

export type Post = {
    parent_comment_id: null;
    child_count: number;
    comments: any;
    likesPost: likesPost[];
    preview?: boolean;
    in_reply_status_id: string[];
    profiles: any;
    id: string;
    profile_id: Profile["id"];
    text: string;
    media: string[];
    created_at: any;
};

export type likesPost = {
    post_id: string;
    profile_id: string;
    created_at: any;
};

export type Chatroom = {
    id: string;
    last_message: LastMessage;
};

type LastMessage = {
    image_url: any;
    created_at: any;
    content: string;
};
export type Message = {
    image_url: string | StaticImport;
    id: string;
    profile_id: string;
    chatroom_id: string;
    content: string;
    created_at: any;
};

export type sendMessageToChat = (chat: Chat, message: Message, imageUrl: any) => Promise<any>;
export type handleContinue = (event: React.FormEvent<HTMLFormElement>, signUp: boolean) => void;
export type handleSignUp = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
export type handleLogin = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
export type getChatRooms = (chatroomId: Chat[]) => Promise<void>;
export type logOut = () => void;
export type sendImageToChat = (message: Message, image: Message["image_url"], chat: any) => void;
export type getMessages = (
    from?: number,
    to?: number,
    chat: openedChat["chat"]["chatroom_id"],
    abortControllerSignal?: AbortSignal | any
) => Promise<{ [x: string]: Message }[] | { sucess: boolean; error: PostgrestError }>;

export type getChats = () => Promise<
    | {
          success: boolean;
          error: PostgrestError;
          sucess?: undefined;
          data?: undefined;
      }
    | {
          sucess: boolean;
          data: any;
          success?: undefined;
          error?: undefined;
      }
>;

interface SupabaseContext extends SupabaseState {
    sendMessageToChat: sendMessageToChat;

    searchQuery: any;
    getChats: getChats;
    getMessages: getMessages;
    updateLastSeen: any;
    getChatRooms: any;
    downloadImage: any;
    sendImageToChat: any;
    sendAudioToChat: any;

    getPost: any;
}

export interface Profile {
    id?: string;
    created_at?: any;
    email?: string;
    status?: string;
    profile_picture?: string;
    last_seen?: string;
}
