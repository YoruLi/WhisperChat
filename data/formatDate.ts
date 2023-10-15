export const formatDate = (date: Date | null, format: string) => {
    if (!(date instanceof Date)) {
        return date;
    }

    const hourFormat: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "numeric",
        hour12: false,
    };

    const dateFormat: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
    };

    const postFormat: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
    };

    if (format === "status" && date) {
        return new Intl.DateTimeFormat("es", hourFormat).format(date);
    }

    if (format === "description" && date) {
        return new Intl.DateTimeFormat("es", dateFormat).format(date);
    }

    if (format === "post" && date) {
        return new Intl.DateTimeFormat("es", postFormat).format(date);
    }
};
