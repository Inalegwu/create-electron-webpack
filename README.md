# :flight_departure: create-electron-webpack

![preview](https://user-images.githubusercontent.com/52094761/222939566-6ae19d68-fa78-42ee-8a10-590c44fef71b.svg)

## :rocket: Getting Started

```sh
npm create electron-webpack
```

![demo](https://user-images.githubusercontent.com/52094761/235090963-ca9c0f26-d2ab-485d-ae75-0a83bcd3b0ac.gif)

You can also directly specify the project name, the template, and the package manager you want to use via additional command line options.

For example, to scaffold a React + TypeScript project, run:

```sh
# in the case of npm 7+, extra double-dash is needed:
npm create electron-webpack myapp -- --template react-ts --manager pnpm
```

_or if you prefer Yarn:_

```sh
yarn create electron-webpack your_app -t vue -m yarn
```

_NOTE: If the arguments are missing or invalid, the command will fall back to interactive mode._

## :thumbsup: Features

- Supports hot reloading in both the main and renderer processes.
- Available in [10 flavors](https://github.com/sprout2000/create-electron-webpack#templates).
- No complicated pre-made settings.

The template provided by this scaffold is _NOT_ an all-in-one. It provides only the necessary and sufficient settings so that you can customize it as you like. In other words, it has no _"eject"_.

## :green_book: API

### Templates

| JavaScript |  TypeScript  |
| :--------: | :----------: |
| `vanilla`  | `vanilla-ts` |
|  `react`   |  `react-ts`  |
|   `vue`    |   `vue-ts`   |
|  `svelte`  | `svelte-ts`  |
|  `preact`  | `preact-ts`  |

### Command line options

| option             | description                                                |
| :----------------- | :--------------------------------------------------------- |
| `--template`, `-t` | Select a template **(_required_)**                         |
| `--manager`, `-m`  | Select a package manager: `npm`(_default_), `pnpm`, `yarn` |

## :hammer_and_wrench: Usage

```sh
# on development with hot reloading
% npm run dev

# on production
% npm run build
```

## :package: How to package your app to share?

[electron-builder](https://www.electron.build/) is recommended.

```sh
npm install --save-dev electron-builder
```

Here's a sample script `builder.ts` for electron-builder:

```typescript
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
```

And then run the script above...

```sh
npx ts-node ./builder.ts
```

See [Common Configuration](https://www.electron.build/configuration/configuration) for more details.

## :cyclone: How to generate your own app icon?

You can use [Elephicon](https://github.com/sprout2000/elephicon#readme) to generate Microsoft ICO or Apple ICNS from PNG files.

<img width="50%" alt="animation" src="https://user-images.githubusercontent.com/52094761/144979888-d796c672-ee0a-44cc-bfa2-abce6513d192.gif" />

And then, specify the path to the icon file to `conifig.platform.icon` in your `builder.(j|t)s`.

```js
require("electron-builder").build({
  config: {
    win: {
      icon: "assets/icon.ico",
    },
    mac: {
      icon: "assets/icon.icns",
    },
  },
});
```

## :art: How to use sass (`.scss`) in your project?

You will need to add [sass](https://www.npmjs.com/package/sass) and [sass-loader](https://www.npmjs.com/package/sass-loader):

```sh
npm install --save-dev sass sass-loader
```

And then, update your `webpack.config.(j|t)s`:

```javascript
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
```

# :camera_flash: Screen shots

### Hot reload in renderer process

<img width="800" src="https://user-images.githubusercontent.com/52094761/235551732-a69ba9d5-db95-4101-9b79-e2741f8050dc.gif" />

### Hot reload in main process

<img width="800" src="https://user-images.githubusercontent.com/52094761/235551746-490c7b46-8d34-45a8-bd96-9afb0d37cb61.gif" />

## :copyright: Copyright

Copyright (c) 2022 sprout2000
