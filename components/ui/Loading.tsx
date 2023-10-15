import Spinner from "@/components/spinner";

export default function Loading() {
    return (
        <div className="grid place-content-center mx-auto w-full items-center justify-center gap-6  ">
            <Spinner sm={false} />
        </div>
    );
}
