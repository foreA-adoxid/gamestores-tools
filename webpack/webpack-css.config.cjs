const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: {
      "gamestores-css": [`${__dirname}/../src/sass/main.scss`],
    },
    output: {},
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                url: false,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
      minimize: true,
    },
    plugins: [new FixStyleOnlyEntriesPlugin(), new MiniCssExtractPlugin()],
  },
];
