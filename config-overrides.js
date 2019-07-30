const { injectBabelPlugin } = require("react-app-rewired");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("react-scripts/config/paths");
let FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(
    ["import", { libraryName: "antd-mobile", style: "css" }],
    config
  );

  config.plugins = config.plugins
    .concat(
      ["settings", "alipay-red-package", "support-author", "identified"].map(
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
            }
          })
      )
    )
    .concat([
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
      })
    ]);

  return config;
};
