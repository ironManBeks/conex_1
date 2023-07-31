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
        ],
    },
    syntax: "postcss-scss",
    plugins: [colorConverter({ outputColorFormat: "rgb" })],
});
