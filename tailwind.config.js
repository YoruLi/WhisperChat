/** @type {import('tailwindcss').Config} */
const { themeVariants } = require("tailwindcss-theme-variants");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    variants: {
        backgroundColor: ["schemes"],
        borderColor: ["schemes"],
        textColor: ["schemes"],
    },
    theme: {
        extend: {
            fontSize: {
                "clamp-title": "clamp(34px, 5vw, 44px)",
                "clamp-paragraph": "clamp(14px, 3.5vw, 16px)",
                "clamp-paragraph-header-title": "clamp(1.5rem, 2vw, 2rem)",
            },
            colors: {
                default: "#40f5c8",
                rose: "#ef6191",
                violet: "#7756ff",
                orange: "#ffc107",
                green: "#38ef7d",
                blue: "#2196f3",
                chill: {},
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },

            borderRadius: {
                ownmessage: "10px 0px 10px 10px",
                message: "0px 10px 10px 10px",
            },

            fontFamily: {
                telegraf: ["var(--font-telegraf)"],
                alegreya: ["Alegreya"],
                anima: ["Anima"],
            },
            aspectRatio: {
                "two-images": "0.85 / 1",
                "three-images": "1.76 / 1",
            },
        },
    },
    plugins: [
        themeVariants({
            group: "schemes",
            themes: {
                dark: {
                    selector: ".dark",
                },
                light: {
                    selector: ".light",
                },
                chill: {
                    selector: ".chill",
                },
            },
        }),
    ],
};
