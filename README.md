# <img width="48" src="https://user-images.githubusercontent.com/52094761/196643273-c484e7f9-ad4b-432a-91a6-63fd22203ded.svg" /> electron-starter

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/sprout2000/electron-starter)

Yet another create-electron-app.

## :flight_departure: Getting Started

```sh
npx electron-starter
```

- Supports hot reload functionality
- Available in 8 flavors
- No redundant samples and settings
- Customizable as you like

## :green_book: Usage

```sh
Usage: electron-starter <project-name> --template <template> [--yarn]

Options:
  --version       Show version number                                  [boolean]
  --template, -t  vanilla, vanilla-ts, react, react-ts, vue, vue-ts, svelte,
                  svelte-ts                                            [string]
  --yarn, -y      Set this option if you prefer yarn                   [boolean]
  --help          Show help                                            [boolean]
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
