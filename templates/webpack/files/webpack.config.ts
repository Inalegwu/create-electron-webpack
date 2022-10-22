import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === 'development';

const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  externals: ['fsevents'],
  output: {
    publicPath: './',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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

const main: Configuration = {
  ...common,
  target: 'electron-main',
  entry: { main: './src/main.ts' },
};

const preload: Configuration = {
  ...common,
  target: 'electron-preload',
  entry: { preload: './src/preload.ts' },
};

const renderer: Configuration = {
  ...common,
  target: 'web',
  entry: { app: './src/renderer.ts' },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};

export default [main, preload, renderer];
