export const variants = {
    show: (i: number) => ({
        opacity: 1,

        transition: {
            delay: i * 0.1,
        },
    }),

    hidden: {
        opacity: 0,
    },
};

export const container = {
    hidden: {
        y: 0,
    },

    show: {
        y: 0,

        transition: { delayChildren: 0.2, staggerChildren: 0.2 },
    },
};
