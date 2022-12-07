const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.npm_lifecycle_event === "dev:webpack";

/** @type {import('webpack').Configuration} */
const common = {
  mode: isDev ? "development" : "production",
  externals: ["fsevents"],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  output: {
    publicPath: "./",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: "asset/resource",
      },
    ],
  },
  watch: isDev,
  devtool: isDev ? "source-map" : undefined,
};

/** @type {import('webpack').Configuration} */
const main = {
  ...common,
  target: "electron-main",
  entry: {
    main: "./src/main.js",
  },
};

/** @type {import('webpack').Configuration} */
const preload = {
  ...common,
  target: "electron-preload",
  entry: {
    preload: "./src/preload.js",
  },
};

/** @type {import('webpack').Configuration} */
const renderer = {
  ...common,
  target: "web",
  entry: { app: "./src/web/index.jsx" },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/web/index.html",
    }),
  ],
};

module.exports = [main, preload, renderer];
