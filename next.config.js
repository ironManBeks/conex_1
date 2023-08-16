const withPlugins = require("next-compose-plugins");
const colorConverter = require("postcss-color-converter");

module.exports = withPlugins([], {
    reactStrictMode: false,
    swcMinify: true,
    forceSwcTransforms: true,
    optimizeFonts: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "conexwest-doors.opserver.store",
            },
        ],
    },
    syntax: "postcss-scss",
    plugins: [colorConverter({ outputColorFormat: "rgb" })],
});
