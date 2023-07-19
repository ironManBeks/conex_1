const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    reactStrictMode: true,
    swcMinify: true,
    forceSwcTransforms: true,
    optimizeFonts: true,
});
