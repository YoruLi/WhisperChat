import MainLoader from "@/components/ui/main-loader";

export default function Loading() {
    return (
        <div className="grid place-content-center mx-auto min-h-screen w-screen items-center justify-center gap-6 bg-transparent ">
            <MainLoader />
        </div>
    );
}
