import cookie from "js-cookie";
import ContentLoader from "react-content-loader";
export const ChatsLoader = () => {
  const theme = cookie.get("theme") ?? "chill";
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
      speed={2}
      width={329}
      height={72}
      viewBox="0 0 301 72"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      animate
    >
      <rect x="54" y="25" rx="3" ry="3" width="140" height="7" />
      <rect x="54" y="46" rx="3" ry="3" width="52" height="7" />
      <circle cx="21" cy="37" r="18" />
    </ContentLoader>
  );
};
