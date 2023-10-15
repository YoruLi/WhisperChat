import SideBar from "@/components/sidebar";
import "./globals.css";
import Providers from "@/components/providers";
import Aside from "@/components/aside/aside";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ClientLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Providers>
      <div className="flex flex-col lg:flex-row scrollbar-main [overflow-y:overlay] overflow-hidden  w-full  ">
        {/* @ts-expect-error Server Component */}
        <SideBar />
        {children}
        <Aside session={session} />
      </div>
    </Providers>
  );
}
