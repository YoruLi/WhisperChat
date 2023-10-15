import { useEffect, useRef, useState } from "react";
import removeDiacriticChars from "@/data/removeDiacriticChars";

export default function useSearch() {
    const [search, setSearch] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!search) {
            return;
        }
        let delay = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        setIsLoading(true);

        return () => {
            clearTimeout(delay);
        };
    }, [search]);

    useEffect(() => {
        const clearSearch = search
            .toLowerCase()
            .replace(/[^\w. ]/g, char => removeDiacriticChars[char] || "")
            .trim();
        setQuery(clearSearch.length >= 3 ? clearSearch : "");
    }, [search]);

    return { query, search, setSearch, isLoading, setIsLoading };
}
