const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("react-scripts/config/paths");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const {override, fixBabelImports, addWebpackPlugin} = require('customize-cra');

const pages = [
    "settings",
    "alipay-red-package",
    "support-author",
    "identified",
    "index"
].map(
    f =>
        new HtmlWebpackPlugin({
            filename: `${f}.html`,
            template: paths.appHtml,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunks: "all"
        })
);

const addCustomize = override(
    addWebpackPlugin(
        new FaviconsWebpackPlugin({
            logo: "./public/images/screenshot.png",
            title: "Tic Tac Toe AI",
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                yandex: false,
                windows: true
            }
        }),
    ),
    ...pages.map(p => addWebpackPlugin(p)),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);


module.exports = addCustomize;
