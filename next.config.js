/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["ifweifsbugrkcnnwttqn.supabase.co", "avatars.githubusercontent.com", "lh3.googleusercontent.com"],
        // loader: "custom",
        // loaderFile: "./lib/supabase-image-loader.ts",
    },

    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
