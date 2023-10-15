import { AppState } from "./types";

export const initialState: Readonly<AppState> = {
    openedChat: { id: null, profile: null, chat: null, messages: [] },
    chats: [],
    posts: [],
    activeList: {},
};
