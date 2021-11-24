const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode: mode,
  target: target,

  // make image cleaner
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      //  rule to handle images
      {
        test: /\.(png|jpg|gif|svg)/i,
        type: "asset/resource",
      },

      // looking for css file with miniccextratplg
      {
        test: /(s[ac]|c)ss$/i,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },

          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      //looking for javascript file
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",

      template: "./src/index.html",
    }),

    // htmlHotPlugin,
  ],

  devtool: "source-map",

  devServer: {
    watchContentBase: true,

    //contentBase: __dirname + "./src/styles/index.scss",
    before(_, server) {
      //server._watch(__dirname + "/src/index.html");
    },
  },
};
