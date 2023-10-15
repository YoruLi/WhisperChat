import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // load on demand
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Link from "next/link";
dayjs.locale("es");
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("es", {
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un día",
        dd: "%d días",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años",
    },
});
export default function CreateDate({ date }: { date: Date | undefined | string | null }) {
    const created = dayjs(date);

    const day = 24 * 60 * 60 * 1000;
    const isMoreThan24Hours = Date.now() - created.valueOf() < day;

    return (
        <Link
            className={`text-slate-500 text-xs  self-center  hover:underline`}
            tabIndex={-1}
            href={`#`}
            aria-label={created.format("MMM D")}
            data-title={"hola"}
            title={created.format("h:mm A · MMM D, YYYY")}
        >
            <time dateTime={created.format("YYYY-MM-DDTHH:mm:ssZ")}>{isMoreThan24Hours ? created.fromNow(true) : created.format("D MMM YYYY")}</time>
        </Link>
    );
}
