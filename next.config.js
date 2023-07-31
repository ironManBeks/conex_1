const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    reactStrictMode: false,
    swcMinify: true,
    forceSwcTransforms: true,
    optimizeFonts: true,
    outputColorFormat: "rgb",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
        ],
    },
});
