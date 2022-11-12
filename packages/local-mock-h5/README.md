English | [简体中文](./README_CN.md)

<a href="https://www.npmjs.com/package/local-mock-h5"><img src="https://img.shields.io/npm/v/local-mock-h5.svg?sanitize=true" alt="Version"></a>

# local-mock-h5

A h5 debug plugin for [eruda](https://www.npmjs.com/package/eruda) and [vConsole](https://www.npmjs.com/package/vconsole).

## Features

- 🎉**without proxy**, you do not need to map domain to local. (like: Charles Map Remote）
- 🚀**devServer only**, you do not need to start the node server at the same time.
- 🌻**One-click debugging**, through the local-mock-h5 plugin, you can start debugging on the mobile machine with one click.

## Get Started

### Install

##### npm or yarn

```shell
npm i local-mock-h5
yarn add local-mock-h5
```

##### Using local-mock-h5 from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/local-mock-h5/dist/lib/index.js"></script>
<script>
  const { erudaLocalMock, vconsoleLocalMock } = window.localMockH5
</script>
```

### Add plugin

#### Plugin for eruda

```js
// #!if ENV === "development"
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-h5'

eruda.init()

const localMockplugin = erudaLocalMock(eruda, {
  state: 0,
  entry: 'http://localhost:8080',
})

eruda.add(localMockplugin)
// #!endif
```

#### Plugin for vConsole

```js
// #!if ENV === "development"
import VConsole from 'vconsole'
import { vconsoleLocalMock } from 'local-mock-h5'

const vconsole = new VConsole()

const localMockplugin = vconsoleLocalMock(VConsole, {
  state: 0,
  entry: 'http://localhost:8080',
})

vconsole.addPlugin(localMockplugin)
// #!endif
```

### Config `devServer`

Since the entry file of 'devServer' is loaded in the domain name, you need to configure cross-origin and configure publicPath to load local static resources.

```json
{
  "devServer": {
    "publicPath": "http://localhost:8080",
    "port": 8080,
    "headers": {
      "Access-Control-Allow-Origin": "*"
    }
  }
}
```

### Mobile machine debugging

- The cellular network needs to be on the same LAN as the localhost.
- `publicPath` and `proxy` change to `http://{ip}:{port}`, such as: `http://192.168.1.10:8080`

#### Why you need to change IP address？

Because the page resources of lcoalhost:8080 cannot be accessed on the mobile machine
