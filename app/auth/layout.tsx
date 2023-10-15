export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen w-full place-items-center fixed inset-0 z-[9999999] chill:bg-[#181920] dark:bg-black light:bg-white">
      {children}
    </div>
  );
}
