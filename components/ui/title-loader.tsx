import React from "react";
import ContentLoader from "react-content-loader";

export const TextLoader = () => (
    <ContentLoader speed={4} width={200} height={5} viewBox="0 0 200 5" backgroundColor="#1c1e26" foregroundColor="#25272e" animate>
        <rect x="10" y="-2" rx="3" ry="3" width="170" height="9" />
        <rect x="30" y="130" rx="3" ry="3" width="170" height="6" />
    </ContentLoader>
);
