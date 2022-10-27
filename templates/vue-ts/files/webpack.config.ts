import { Configuration, DefinePlugin } from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  externals: ['fsevents'],
  resolve: { extensions: ['.js', '.ts', '.json'] },
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
        options: {
          appendTsSuffixTo: [/\.vue$/],
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
  entry: { app: './src/web/index.ts' },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: isDev,
      __VUE_PROD_DEVTOOLS__: isDev,
    }),
    new HtmlWebpackPlugin({ template: './src/web/index.html' }),
  ],
};

export default [main, preload, renderer];
