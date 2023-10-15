import { Chat, Message, Post, Profile } from "../types";

export type AppAction = {
    type: string;
    payload?: any;
};
export type ActiveList = { [key: string]: User[] };
export interface User {
    id: string;
    online_at: string;
    email: string;
    profile_picture: string;
}

type openedChat = {
    id: string | null;
    profile: null | Profile;
    chat: Chat | null;
    messages: null | Message[];
};
export interface AppState {
    openedChat: openedChat;
    posts: Post[];
    chats: Chat[];
    activeList: ActiveList;
}

export type setOpenedChat = (chat: any) => void;
export type sendMessage = (chat: any, message: any, imageUrl: any) => Promise<void>;
export type sendTypingEvent = any;

export interface AppContextType {
    state: AppState;
    isTyping: any;
    setOpenedChat: setOpenedChat;
    sendMessage: sendMessage;

    reset: () => void;
    onScroll: ({ target }) => void;
    scrollRef: any;
    scrollToBottom: any;
    sendTypingEvent: any;
    showScrollArrow: boolean;
    addNewPost: any;
}

export enum Type {
    SET_POSTS = "SET_POSTS",
    SET_OPENED_CHAT = "SET_OPENED_CHAT",
    SET_CHATS = "SET_CHATS",
    SET_UPDATE_CHATS = "SET_UPDATE_CHATS",
    SET_UPDATE_POSTS = "SET_UPDATE_POSTS",
    SET_MESSAGE_LOADING = "SET_MESSAGE_LOADING",
    SET_RESET = "SET_RESET",
    SET_ACTIVE_USERS = "SET_ACTIVE_USERS",
}
