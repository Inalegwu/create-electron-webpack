# <img width="48" src="https://user-images.githubusercontent.com/52094761/196643273-c484e7f9-ad4b-432a-91a6-63fd22203ded.svg" /> gen-electron

![GitHub package.json version](https://img.shields.io/github/package-json/v/sprout2000/gen-electron)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/sprout2000/gen-electron)
![npm](https://img.shields.io/npm/dt/gen-electron)

Yet another create-electron-app.

## :flight_departure: Getting Started

```sh
npx gen-electron my-app --template react
```

- Supports hot reload functionality
- Available in 8 flavors
- No redundant samples and settings
- Customizable as you like

## :clipboard: Templates

| JavaScript | TypeScript  |
| :--------: | :---------: |
| `vanilla`  |  `webpack`  |
|  `react`   | `react-ts`  |
|   `vue`    |  `vue-ts`   |
|  `svelte`  | `svelte-ts` |

## :hammer_and_wrench: Development & Production

```sh
% cd my-app

# on development
% npm run dev  # or 'yarn dev'

# on production
% npm run build  # or 'yarn build'
```

## :green_book: Options

| option             | description                          |
| :----------------- | :----------------------------------- |
| `--version`        | Show version number                  |
| `--template`, `-t` | Select a framework                   |
| `--yarn`, `-y`     | Set this option if you prefer `yarn` |
| `--help`           | Show help                            |

_NOTE: `Yarn@v2+` is not supported._

## :copyright: Copyright

See [LICENSE.md](./LICENSE.md) file.
