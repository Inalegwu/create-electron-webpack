# :flight_departure: electron-starter

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/sprout2000/electron-starter)
![npm](https://img.shields.io/npm/dt/electron-starter)

Yet another create-electron-app.

## :rocket: Getting Started

```sh
npx electron-starter
```

![demo](https://user-images.githubusercontent.com/52094761/200250362-2b3b7c3c-ad2b-4100-bf07-378fb7ebe627.gif)

## :thumbsup: Features

- Supports hot reloading in both the main and renderer processes.
- Available in 8 flavors.
- No redundant samples and settings (only 72 lines at minimum).
- Customizable as you like.

## :green_book: Usage

```sh
Usage: electron-starter <project-name> --template <template> [--manager <package manager>]
```

If arguments are missing or invalid, fall back to interactive mode.

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
| `--version`        | Show version number                                        |
| `--template`, `-t` | Select a template                                          |
| `--manager`, `-m`  | Select a package manager: `npm`(_default_), `pnpm`, `yarn` |
| `--help`           | Show help                                                  |

_NOTE: `Yarn@v2 or later` is NOT supported._

## :hammer_and_wrench: Development & Production

```sh
# on development with hot reloading
% npm run dev

# on production
% npm run build
```

## :inbox_tray: How to load developer tools (React, Vue3)

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

1. Install `electron-search-devtools`:

```sh
npm install --save-dev electron-search-devtools
```

2. And then, load the necessary developer tools in `src/main.js` or `src/main.ts`:

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

## :copyright: Copyright

See [LICENSE.md](./LICENSE.md) file.
