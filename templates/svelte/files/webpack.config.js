const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

/** @type {import('webpack').Configuration} */
const common = {
  mode: isDev ? "development" : "production",
  externals: ["fsevents"],
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte", ".json"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditionNames: ["svelte"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.svelte$/,
        loader: "svelte-loader",
        options: {
          emitCss: true,
        },
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
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
  entry: {
    app: "./src/web/index.js",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/web/index.html",
    }),
  ],
};

module.exports = [main, preload, renderer];
