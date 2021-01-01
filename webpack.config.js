const glob = require('glob');
const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const banner = '@see ' + require('./package.json').homepage;

// TODO: Look into caching to prevent the initial compilation when running `npm run watch`
// This compilation should not be needed, and may become a big nuisance when the project grows bigger
module.exports = {
    mode: 'production',
    watchOptions: {
        ignored: /node_modules/,
    },

    /** Properly link a variable number of individual entry files to corresponding output files */
    // Match all .mjs files separately, using useful names for `output.filename`
    entry: glob.sync('./src/*/*/index.mjs').reduce((acc, filename) => {
        // The name will be exactly what `*/*` matches in the above glob
        acc[filename.slice(6, -10)] = filename;
        return acc;
    }, {}),
    // Use the [name] reference to ensure each output file is correctly identified by its corresponding entry file
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'dist'),
    },

    /** Use Babel to transpile to NodeJS v8.10, which is the version as supported by CSES */
    target: 'node8.10',
    module: {
        rules: [
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'babel.config.js'),
                    }
                },
            },
        ],
    },

    /** Add repo link at the top of output files */
    plugins: [
        new webpack.BannerPlugin({
            banner,
            entryOnly: true,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: new RegExp(banner, 'i'),
                    },
                },
                extractComments: false,
            }),
        ],
    },
};
