const { withBaseWebpack } = require('../../.webpack');

module.exports = withBaseWebpack({
    devServer: { port: '{REPLACE_PORT}' },
    federationConfig: {
        name: "remote_{REPLACE_NAME}",
        exposes: {
            './Application': './src/_app',
        }
    },
}, true);