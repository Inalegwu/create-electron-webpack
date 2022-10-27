const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('webpack').Configuration} */
const common = {
  mode: isDev ? 'development' : 'production',
  externals: ['fsevents'],
  resolve: { extensions: ['.js', '.json'] },
  output: {
    publicPath: './',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  watch: isDev,
  devtool: isDev ? 'source-map' : undefined,
};

/** @type {import('webpack').Configuration} */
const main = {
  ...common,
  target: 'electron-main',
  entry: { main: './src/main.js' },
};

/** @type {import('webpack').Configuration} */
const preload = {
  ...common,
  target: 'electron-preload',
  entry: { preload: './src/preload.js' },
};

/** @type {import('webpack').Configuration} */
const renderer = {
  ...common,
  target: 'web',
  entry: { app: './src/web/index.js' },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: isDev,
      __VUE_PROD_DEVTOOLS__: isDev,
    }),
    new HtmlWebpackPlugin({ template: './src/web/index.html' }),
  ],
};

module.exports = [main, preload, renderer];
