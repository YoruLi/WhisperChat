import React from "react";
import ContentLoader from "react-content-loader";

export const ThreeDots = () => (
    <ContentLoader viewBox="0 0 360 150" height={15} width={60} backgroundColor="transparent" animate>
        <circle cx="120" cy="86" r="30" />
        <circle cx="184" cy="86" r="30" />
        <circle cx="250" cy="86" r="30" />
    </ContentLoader>
);
