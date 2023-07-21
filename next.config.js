const withPlugins = require("next-compose-plugins");

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
});
