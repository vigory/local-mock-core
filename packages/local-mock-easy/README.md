English | [简体中文](/packages/local-mock-easy/README_CN.md)

<a href="https://www.npmjs.com/package/local-mock-easy"><img src="https://img.shields.io/npm/v/local-mock-easy.svg?sanitize=true" alt="Version"></a>

# `local-mock-easy`

A easy debug plugin for [eruda](https://www.npmjs.com/package/eruda) and [vConsole](https://www.npmjs.com/package/vconsole).

> Note: local-mock-easy is only the client (H5) part of [local-mock-core](https://github.com/vigory/local-mock-core), complete local-mock debugging solution needs to install [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware) on the server (nodejs) at the same time, follow steps:

1. Install [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware) on the nodejs server.
1. Install local-mock-easy on the client.

## Features

- 🎉**without proxy**, you do not need to map domain to local. (like: Charles Map Remote）
- 🚀**devServer only**, you do not need to start the node server at the same time.
- 🌻**One-click debugging**, through the local-mock-easy plugin, you can start debugging on the mobile machine with one click.

## Get Started

### Install

##### npm or yarn

```shell
npm i local-mock-easy
yarn add local-mock-easy
```

##### Using local-mock-easy from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/local-mock-easy"></script>
<script>
  const { erudaLocalMock, vconsoleLocalMock } = window.localMockEasy
</script>
```

### Add plugin

#### Plugin for eruda

```js
// #!if ENV === "development"
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-easy'

eruda.init()

const localMockplugin = erudaLocalMock(eruda, {})

eruda.add(localMockplugin)
// #!endif
```

#### Plugin for vConsole

```js
// #!if ENV === "development"
import VConsole from 'vconsole'
import { vconsoleLocalMock } from 'local-mock-easy'

const vconsole = new VConsole()

const localMockplugin = vconsoleLocalMock(VConsole, {
  key: 'myLocalMock',
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

## Options API

| params | desc                                                                 | type     | default                 |
| :----- | :------------------------------------------------------------------- | :------- | :---------------------- |
| state  | plugin open state                                                    | `number` | `0`                     |
| entry  | the local entry                                                      | `string` | `http://localhost:8080` |
| key    | the query params name in url.<br> `http://example.com?{key}={entry}` | `string` | `localMock`             |

## FQA

If you have any problems please contact us or open issues.

#### Why you need to change IP address？

Because the page resources of lcoalhost:8080 cannot be accessed on the mobile machine
