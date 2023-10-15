"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useOptions() {
    const [showOptions, setShowOptions] = useState<any>();
    const optionsRef = useRef<any | null>(null);

    const handleShowAttach = (data: any) => setShowOptions(data);

    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event?.target as Node)) {
                setShowOptions(false);
            }
        },
        [showOptions]
    );
    useEffect(() => {
        if (!showOptions) return;
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [showOptions]);

    return {
        optionsRef,
        showOptions,
        setShowOptions,
        handleOutsideClick,
        handleShowAttach,
    };
}
