const withPlugins = require("next-compose-plugins");
const colorConverter = require("postcss-color-converter");

module.exports = withPlugins([], {
    reactStrictMode: false,
    swcMinify: true,
    forceSwcTransforms: true,
    optimizeFonts: true,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "conexwest-doors.opserver.store",
            },
            {
                protocol: "https",
                hostname: "conexwest-doors-test.opserver.store",
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            dns: false,
            child_process: false,
            tls: false,
        };
        return config;
    },
    syntax: "postcss-scss",
    plugins: [colorConverter({ outputColorFormat: "rgb" })],
});
