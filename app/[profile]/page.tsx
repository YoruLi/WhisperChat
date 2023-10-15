import { getUser } from "@/components/profile/components/hooks/get-user";

import ProfileInfoCard from "@/components/profile/components/profile-info-card-";
import ProfilePosts from "@/components/profile/components/profile-posts";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Metadata } from "next";
import { cookies } from "next/headers";

import React from "react";

export default async function ProfilePage({ params }: { params: { profile: string } }) {
    const userId = params.profile;

    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    // @ts-ignore
    return <ProfilePosts userId={userId} type="user_posts" queryKey={["posts", userId]} />;
}
