import { Configuration, DefinePlugin } from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isDev = process.env.NODE_ENV === "development";

const common: Configuration = {
  mode: isDev ? "development" : "production",
  externals: ["fsevents"],
  resolve: {
    extensions: [".js", ".ts", ".vue", ".json"],
  },
  output: {
    publicPath: "./",
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "babel-preset-typescript-vue3",
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
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

const main: Configuration = {
  ...common,
  target: "electron-main",
  entry: { main: "./src/main.ts" },
};

const preload: Configuration = {
  ...common,
  target: "electron-preload",
  entry: { preload: "./src/preload.ts" },
};

const renderer: Configuration = {
  ...common,
  target: "web",
  entry: { app: "./src/web/index.ts" },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./src/web/index.html",
    }),
  ],
};

export default [main, preload, renderer];
