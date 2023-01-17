const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const TerserPlugin = require("terser-webpack-plugin");

const domain = "https://rust.gamestores.app";

module.exports = {
  mode: "development",
  entry: {
    "gamestores-js": [`${__dirname}/../src/obfuscation/main.js`],
  },
  output: {},
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [],
        use: {
          loader: WebpackObfuscator.loader,
          options: {
            optionsPreset: "medium-obfuscation",
            domainLock: [domain],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    runtimeChunk: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
