import React from "react";
import ProfilePosts from "@/components/profile/components/profile-posts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ProfilePage({ params }: { params: { profile: string } }) {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const userId = params.profile;
    // @ts-ignore
    return <ProfilePosts userId={userId} type="user_likes" queryKey={["posts", userId, "likes"]} />;
}
