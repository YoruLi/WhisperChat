import React from "react";
import ContentLoader from "react-content-loader";
export const ImageLoader = () => (
  <ContentLoader
    width={450}
    height={470}
    viewBox="0 0 450 470"
    backgroundColor="#1c1e26"
    foregroundColor="#25272e"
    animate
  >
    <rect x="42" y="0" rx="10" ry="10" width="388" height="470" />
  </ContentLoader>
);
