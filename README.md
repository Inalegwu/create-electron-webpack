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

- Supports hot reload functionality
- Available in 8 flavors
- No redundant samples and settings (only 118 lines at minimum)
- Customizable as you like

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

## :copyright: Copyright

See [LICENSE.md](./LICENSE.md) file.
