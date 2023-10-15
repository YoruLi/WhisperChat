import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { origin, pathname } = new URL(req.url);

    if (session && (pathname === "/" || ["/signup", "/login"].includes(pathname))) {
        return NextResponse.redirect(new URL("/home", origin));
    }

    if (!session) {
        if (
            req.nextUrl.pathname.startsWith("/home") ||
            req.nextUrl.pathname.startsWith("/chats") ||
   
            req.nextUrl.pathname.startsWith("/profile")
        ) {
            return NextResponse.redirect(new URL("/", origin));
        }
    }

    return res;
}

export const config = {
    matcher: ["/", "/auth/signup", "/auth/login", "/home", "/chats", "/chats/:path* ",  "/profile"],
};
