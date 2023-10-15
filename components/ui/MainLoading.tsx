import Spinner from "@/components/spinner";

export default function MainLoading() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background-900">
            <h1 className="text-center text-5xl font-black text-[#40f5c8] font-anima">Whisper</h1>
            <Spinner sm={false} />
        </div>
    );
}
