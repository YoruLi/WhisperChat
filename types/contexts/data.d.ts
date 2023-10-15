import { AuthSessionMissingError, type Session, type Provider, type AuthError, type PostgrestError } from "@supabase/supabase-js";
import { Message, Post, Profile, UpdateProfile } from "@/types/schemas";
import { boolean } from "zod";
type SupabaseResponse<T, K = undefined> = K extends undefined
    ? { success: true } | { success: false; error: T }
    : { success: true; data: T } | { success: false; error: K };

export type IPost = Post & {
    profiles: Profile;
    posts?: authorPost;
};

interface InfinitePosts<T> {
    pages?: T[][];
}

interface InfiniteMessages<T> {
    pages?: T[][];
}

type LikesPost = {
    post_id: string;
    profile_id: string;
    created_at: Date;
};

type PostResponse = IPost & {
    preview: boolean;
    likesPost: LikesPost[];
    parent_comment_id: string;
    comments: Post[];
    posts: IPost;
};

type MessageResponse = Message & {
    preview: boolean;
};

export type MessageData = MessageResponse & {
    author: Profile;
    message: Message;
};

type ChatInfo = {
    chat: any;
    messages: MessageData[];
    profile: Profile;
};

export type Followers = {
    follower_id: Profile["id"];
    following_id: Profile["id"];
} & Profile;

type UpdateProfileData = {
    full_name: string;
    status: string;
    profile_picture: { url: string; file: undefined };
};
export type InitialUser = Followers;

export type SignInWithEmail = (
    event: React.FormEvent<HTMLFormElement>
) => Promise<string | { success: boolean; error: AuthError } | { success: boolean; error?: undefined } | undefined>;

export type SignUpWithEmail = (
    event: React.FormEvent<HTMLFormElement>
) => Promise<string | { success: boolean; error: AuthError } | { success: boolean; error?: undefined } | undefined>;

export type SignInWithProvider = (provider: Provider) => Promise<SupabaseResponse<AuthError>>;

export type SignOut = () => Promise<SupabaseResponse<AuthError>>;

type UpdateProfile = (userId: Profile["id"], values: UpdateProfileData) => Promise<SupabaseResponse<Profile, AuthSessionMissingError | PostgrestError>>;

type getUserSuggestion = (id: Profile["id"] | undefined) => Promise<SupabaseResponse<Profile[], AuthSessionMissingError>>;
