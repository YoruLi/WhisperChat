"use client";
import React from "react";

import Comments from "@/components/comments";

import { Session } from "@supabase/auth-helpers-nextjs";

export default function ProfileComments({ userId, session }: { userId: string; session: Session | null }) {
    return (
        <div className=" border border-slate-700 rounded-lg ">
            <Comments userId={userId} session={session} />
        </div>
    );
}
