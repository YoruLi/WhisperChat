export interface Database {
    public: {
        Tables: {
            chatrooms: {
                Row: {
                    created_at: string;
                    id: string;
                    last_message: string | null;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    last_message?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    last_message?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "chatrooms_last_message_fkey";
                        columns: ["last_message"];
                        referencedRelation: "messages";
                        referencedColumns: ["id"];
                    }
                ];
            };
            chats: {
                Row: {
                    chatroom_id: string;
                    created_at: string;
                    id: string;
                    profile_id: string;
                };
                Insert: {
                    chatroom_id: string;
                    created_at?: string;
                    id?: string;
                    profile_id: string;
                };
                Update: {
                    chatroom_id?: string;
                    created_at?: string;
                    id?: string;
                    profile_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "chats_chatroom_id_fkey";
                        columns: ["chatroom_id"];
                        referencedRelation: "chatrooms";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "chats_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            comments: {
                Row: {
                    created_at: string;
                    id: string;
                    parent_comment_id: string | null;
                    post_id: string;
                    profile_id: string;
                    text: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    parent_comment_id?: string | null;
                    post_id: string;
                    profile_id: string;
                    text: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    parent_comment_id?: string | null;
                    post_id?: string;
                    profile_id?: string;
                    text?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "comments_parent_comment_id_fkey";
                        columns: ["parent_comment_id"];
                        referencedRelation: "comments";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "comments_post_id_fkey";
                        columns: ["post_id"];
                        referencedRelation: "posts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "comments_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            followers: {
                Row: {
                    created_at: string | null;
                    follower_id: string;
                    following_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    follower_id: string;
                    following_id: string;
                };
                Update: {
                    created_at?: string | null;
                    follower_id?: string;
                    following_id?: string;
                };
                Relationships: [];
            };
            likesPost: {
                Row: {
                    created_at: string | null;
                    post_id: string;
                    profile_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    post_id: string;
                    profile_id: string;
                };
                Update: {
                    created_at?: string | null;
                    post_id?: string;
                    profile_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "likesPost_post_id_fkey";
                        columns: ["post_id"];
                        referencedRelation: "posts";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "likesPost_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            messages: {
                Row: {
                    chatroom_id: string | null;
                    content: string | null;
                    created_at: string;
                    id: string;
                    image_url: string[] | null;
                    profile_id: string;
                    reaction: string | null;
                };
                Insert: {
                    chatroom_id?: string | null;
                    content?: string | null;
                    created_at?: string;
                    id?: string;
                    image_url?: string | null;
                    profile_id: string;
                    reaction?: string | null;
                };
                Update: {
                    chatroom_id?: string | null;
                    content?: string | null;
                    created_at?: string;
                    id?: string;
                    image_url?: string | null;
                    profile_id?: string;
                    reaction?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "messages_chatroom_id_fkey";
                        columns: ["chatroom_id"];
                        referencedRelation: "chatrooms";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "messages_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            posts: {
                Row: {
                    created_at: string | null;
                    id: string;
                    media: string[] | null;
                    profile_id: string;
                    text: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: string;
                    media?: string[] | null;
                    profile_id: string;
                    text?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: string;
                    media?: string[] | null;
                    profile_id?: string;
                    text?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "posts_profile_id_fkey";
                        columns: ["profile_id"];
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    created_at: string;
                    email: string;
                    full_name: string | null;
                    id: string;
                    last_seen: string | null;
                    profile_picture: string | null;
                    status: string | null;
                };
                Insert: {
                    created_at?: string;
                    email: string;
                    full_name?: string | null;
                    id?: string;
                    last_seen?: string | null;
                    profile_picture?: string | null;
                    status?: string | null;
                };
                Update: {
                    created_at?: string;
                    email?: string;
                    full_name?: string | null;
                    id?: string;
                    last_seen?: string | null;
                    profile_picture?: string | null;
                    status?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            send_message_to_chat: {
                Args: {
                    sender_profile_id: string;
                    receiver_profile_id: string;
                    chat: unknown;
                    message: string;
                    image: string;
                };
                Returns: {
                    created_chat: unknown;
                    inserted_message: unknown;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
