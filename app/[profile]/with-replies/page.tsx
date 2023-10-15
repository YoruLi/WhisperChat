import ProfilePosts from "@/components/profile/components/profile-posts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function ProfilePage({ params }: { params: { profile: string } }) {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const userId = params.profile;

    return (
        // @ts-ignore
        <ProfilePosts userId={userId} type="comments" queryKey={[]} />
    );
}
