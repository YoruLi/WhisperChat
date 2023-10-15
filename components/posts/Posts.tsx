import React from "react";
import PostsClient from "./components/posts-client";
import { Session } from "@supabase/auth-helpers-nextjs";

export default async function Posts({ queryKey, session, userId, type }: { queryKey: string[]; session: Session | null; userId?: string; type: string }) {
    return <PostsClient queryKey={queryKey} type={type} userId={userId} session={session} />;
}
