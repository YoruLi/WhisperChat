import Cookies from "js-cookie";
import React from "react";
import ContentLoader from "react-content-loader";

export const AvatarWithTextLoader = () => {
  const theme = Cookies.get("theme") ?? "chill";
  let backgroundColor;
  let foregroundColor;
  if (theme === "light") {
    backgroundColor = "#7f828f";
    foregroundColor = "#979ca8";
  } else if (theme === "dark") {
    foregroundColor = "#25272e";
    backgroundColor = "#1c1e26";
  } else if (theme === "chill") {
    backgroundColor = "#1c1e26";
    foregroundColor = "#25272e";
  }

  return (
    <ContentLoader
      width={209}
      height={44}
      viewBox="0 0 400 75"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      animate
    >
      <rect x="110" y="18" rx="4" ry="4" width="254" height="10" />
      <rect x="111" y="50" rx="3" ry="3" width="80" height="10" />
      <rect x="304" y="-46" rx="3" ry="3" width="350" height="10" />
      <rect x="371" y="-45" rx="3" ry="3" width="380" height="10" />
      <rect x="484" y="-45" rx="3" ry="3" width="201" height="10" />
      <circle cx="40" cy="37" r="36.8" />
    </ContentLoader>
  );
};
