const { injectBabelPlugin } = require("react-app-rewired");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("react-scripts/config/paths");

console.log("overriding...");
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(
    ["import", { libraryName: "antd-mobile", style: "css" }],
    config
  );

  config.plugins = config.plugins.concat(
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
  );

  return config;
};
