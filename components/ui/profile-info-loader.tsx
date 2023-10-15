import React from "react";
import ContentLoader from "react-content-loader";

export const ProfileInfoLoader = ({ theme }: { theme: string }) => {
    let backgroundColor;

    if (theme === "light") {
        backgroundColor = "#7f828f";
    } else if (theme === "dark") {
        backgroundColor = "#1c1e26";
    } else if (theme === "chill") {
        backgroundColor = "#1c1e26";
    }

    return (
        <ContentLoader
            speed={1}
            width={512}
            viewBox="0 0 1200 1000"
            backgroundColor={backgroundColor}
            foregroundColor="#25272e"
            animate
            className="mx-auto lg:w-full lg:h-full px-6 xl:px-0"
        >
            <circle cx="480" cy="120" r="60" />
            <rect x="330" y="210" rx="0" ry="0" width="300" height="10" />
            <rect x="440" y="240" rx="0" ry="0" width="92" height="10" />
            {/*  */}
            <rect x="0" y="330" rx="0" ry="0" width="200" height="10" />
            <rect x="0" y="380" rx="0" ry="0" width="75" height="75" />
            <rect x="100" y="380" rx="0" ry="0" width="75" height="75" />
            <rect x="200" y="380" rx="0" ry="0" width="75" height="75" />

            {/*  */}

            <rect x="0" y="550" rx="0" ry="0" width="150" height="10" />
            <rect x="0" y="600" rx="0" ry="0" width="75" height="10" />

            <rect x="0" y="680" rx="0" ry="0" width="92" height="10" />

            <rect x="0" y="720" rx="0" ry="0" width="170" height="10" />
        </ContentLoader>
    );
};
