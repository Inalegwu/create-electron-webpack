# :flight_departure: electron-starter

![npm](https://img.shields.io/npm/dt/electron-starter)

Yet another [create-electron-app](https://github.com/electron/forge#getting-started).

## :rocket: Getting Started

```sh
npx electron-starter
```

![demo](https://user-images.githubusercontent.com/52094761/200512523-1d838b1b-3f22-4113-b87e-a8b54c861636.gif)

## :thumbsup: Features

- Supports hot reloading in both the main and renderer processes.
- Available in [8 flavors](https://github.com/sprout2000/electron-starter#templates).
- No redundant samples or preconfigurations.

## :inbox_tray: Installation

```sh
npm i -g electron-starter
```

## :green_book: Usage

```sh
electron-starter <project-name> --template <template> [--manager <package manager>]
```

If the arguments are missing or invalid, the command will fall back to interactive mode.

### Templates

| JavaScript |  TypeScript  |
| :--------: | :----------: |
| `vanilla`  | `vanilla-ts` |
|  `react`   |  `react-ts`  |
|   `vue`    |   `vue-ts`   |
|  `svelte`  | `svelte-ts`  |

### Options

| option             | description                                                |
| :----------------- | :--------------------------------------------------------- |
| `--template`, `-t` | Select a template **(_required_)**                         |
| `--manager`, `-m`  | Select a package manager: `npm`(_default_), `pnpm`, `yarn` |
| `--version`, `-v`  | Show version number                                        |
| `--help`           | Show help                                                  |

_NOTE: `Yarn@v2 or later` is NOT supported._

## :hammer_and_wrench: Development & Production

```sh
# on development with hot reloading
% npm run dev

# on production
% npm run build
```

## :art: How to use sass (`.scss`) in your project

You will need to add [sass](https://www.npmjs.com/package/sass) and [sass-loader](https://www.npmjs.com/package/sass-loader):

```sh
npm install --save-dev sass sass-loader
```

And then, update your `webpack.config.(j|t)s`:

```diff javascript
    module: {
      rules: [
        {
-         test: /\.css$/,
+         test: /\.s?css$/,
-         use: [MiniCssExtractPlugin.loader, 'css-loader'],
+         use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
```

## :electric_plug: How to load developer tools (React, Vue3)

[electron-devtools-installer](https://www.npmjs.com/package/electron-devtools-installer) is recommended.

```sh
npm install --save-dev electron-devtools-installer
```

```javascript
// Example for Vue3
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

app.whenReady().then(() => {
  installExtension(VUEJS3_DEVTOOLS, {
    loadExtensionOptions: { allowFileAccess: true },
  }).then(() => mainWindow.webContents.openDevTools());
});
```

### Manual loading

Or you will need to install [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) Google Chrome extension manually.

_Example in the case that you prefer [electron-search-devtools](https://www.npmjs.com/package/electron-search-devtools) to load already installed devtools:_

```sh
npm install --save-dev electron-search-devtools
```

```javascript
// load `session` and `searchDevtools`
import { app, session } from 'electron';
import { searchDevtools } from 'electron-search-devtools';

app.whenReady().then(() => {
  // 'REACT' or 'VUE3'
  searchDevtools('VUE3').then((devtools) => {
    // 'allowFileAccess' is required
    session.defaultSession.loadExtension(devtools, { allowFileAccess: true });
  });
});
```

<img width="480" alt="Vue.js devtools" src="https://user-images.githubusercontent.com/52094761/200508222-d0c851a4-d578-463f-8bd2-6d1e4bcb87bd.png">

## :package: How to package your app to publish

Use [electron-builder](https://www.electron.build/) or [electron-packager](https://electron.github.io/electron-packager/main/).

_Sample script for electron-builder `builder.js`:_

```sh
npm install --save-dev electron-builder
```

You can get the sample icons from [assets](https://github.com/sprout2000/electron-starter/tree/main/assets) directory.

```javascript
require('electron-builder').build({
  config: {
    productName: 'Electron App',
    // e.g. "Electron App-1.0.0-win32.exe"
    artifactName: '${productName}-${version}-${platform}.${ext}',
    copyright: '',
    /**
     * A glob patterns relative to the app directory,
     * which specifies which files to include.
     */
    files: ['dist/**/*'],
    // Meta data directories
    directories: {
      output: 'release',
      buildResources: 'assets',
    },
    win: {
      // App icon
      icon: 'assets/win32.ico',
    },
    mac: {
      icon: 'assets/darwin.icns',
      // Avoid automatic code signing
      identity: null,
    },
  },
});
```

_And then run the script:_

```sh
node ./builder.js
```

<img width="640" alt="electron-builder" src="https://user-images.githubusercontent.com/52094761/201499630-59aa5eab-def6-4d2a-abb6-e4fb1c1077d9.png">

## :copyright: Copyright

Copyright (c) 2022 sprout2000
