# :flight_departure: electron-starter

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/sprout2000/electron-starter)
![npm](https://img.shields.io/npm/dt/electron-starter)

Yet another create-electron-app.

## :rocket: Getting Started

```sh
npx electron-starter
```

![demo](https://user-images.githubusercontent.com/52094761/198173518-e448abf5-720f-4b06-b430-07cc6a4976fd.gif)

## :thumbsup: Features

- Supports hot reloading in both the main and renderer processes.
- Available in 8 flavors.
- No redundant samples and settings (only 72 lines at minimum).
- Customizable as you like.

## :green_book: Usage

```sh
Usage: electron-starter <project-name> --template <template> [--yarn]
```

If arguments are missing or invalid, fall back to interactive mode.

- Templates

| JavaScript |  TypeScript  |
| :--------: | :----------: |
| `vanilla`  | `vanilla-ts` |
|  `react`   |  `react-ts`  |
|   `vue`    |   `vue-ts`   |
|  `svelte`  | `svelte-ts`  |

- Options

| option             | description                          |
| :----------------- | :----------------------------------- |
| `--version`        | Show version number                  |
| `--template`, `-t` | Select a framework                   |
| `--yarn`, `-y`     | Set this option if you prefer `yarn` |
| `--help`           | Show help                            |

_NOTE: `Yarn@v2 or later` is NOT supported._

## :hammer_and_wrench: Development & Production

```sh
# on development with hot reloading
% npm run dev

# on production
% npm run build
```

## :inbox_tray: How to load developer tools (React, Vue3)

I recommend [electron-devtools-installer](https://www.npmjs.com/package/electron-devtools-installer).

```sh
npm install --save-dev electron-search-devtools
```

Or you will need to install [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) Google Chrome extension.

- Example of using [electron-search-devtools](https://www.npmjs.com/package/electron-search-devtools):

1. Install `electron-search-devtools`:

```sh
npm install --save-dev electron-search-devtools
```

2. And then, load the necessary developer tools in `src/main.js` or `src/main.ts`:

```javascript
// load `session` and `searchDevtools`
import { BrowserWindow, app, session } from 'electron';
import { searchDevtools } from 'electron-search-devtools';
```

```javascript
app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  // 'REACT' or 'VUE3'
  searchDevtools('VUE3').then((devtools) => {
    session.defaultSession.loadExtension(devtools, { allowFileAccess: true });
  });

  mainWindow.loadFile('dist/index.html');
  mainWindow.webContents.openDevTools({ mode: 'detach' });
});
```

<img width="566" alt="2022-11-04-152049" src="https://user-images.githubusercontent.com/52094761/199905375-ad07c335-e776-4cee-8fac-0a929c0476e5.png">

## :package: How to package your app to publish

Use [electron-builder](https://www.electron.build/) or [electron-packager](https://electron.github.io/electron-packager/main/).

## :copyright: Copyright

See [LICENSE.md](./LICENSE.md) file.
