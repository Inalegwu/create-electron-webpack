import { build } from "electron-builder";

build({
  config: {
    appId: "com.Electron.ElectronApp",
    productName: "Electron App",
    artifactName: "${productName}-${version}-${platform}-${arch}.${ext}",
    directories: {
      output: "release",
    },
    files: [
      "dist/**/*",
      "!node_modules/@types/node",
      "!node_modules/@types/react",
      "!node_modules/@types/react-dom",
      "!node_modules/cross-env",
      "!node_modules/css-loader",
      "!node_modules/electron-builder",
      "!node_modules/electronmon",
      "!node_modules/html-webpack-plugin",
      "!node_modules/mini-css-extract-plugin",
      "!node_modules/npm-run-all",
      "!node_modules/rimraf",
      "!node_modules/ts-loader",
      "!node_modules/ts-node",
      "!node_modules/typescript",
      "!node_modules/wait-on",
      "!node_modules/webpack",
      "!node_modules/webpack-cli",
    ],
  },
});
