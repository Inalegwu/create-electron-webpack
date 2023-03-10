require("electron-builder").build({
  config: {
    appId: "com.Electron.ElectronApp",
    productName: "Electron App",
    artifactName: "${productName}-${version}-${platform}-${arch}.${ext}",
    directories: {
      output: "release",
    },
    files: [
      "dist/**/*",
      "!node_modules/@babel/core",
      "!node_modules/@babel/preset-env",
      "!node_modules/babel-loader",
      "!node_modules/cross-env",
      "!node_modules/css-loader",
      "!node_modules/electron-builder",
      "!node_modules/electronmon",
      "!node_modules/html-webpack-plugin",
      "!node_modules/mini-css-extract-plugin",
      "!node_modules/npm-run-all",
      "!node_modules/rimraf",
      "!node_modules/svelte-loader",
      "!node_modules/wait-on",
      "!node_modules/webpack",
      "!node_modules/webpack-cli",
    ],
  },
});
