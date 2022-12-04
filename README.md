English | [简体中文](./README_CN.md)

# LocalMock introduction

## What is LocalMock ?

LocalMock is a mock scheme for local development environment, at business domain name to fetch local devServer page resources. It is a reliable technical solution for local development and debugging.

The URL of the same production environment that can access local static resources as needed.

<img width="600" src="https://raw.githubusercontent.com/vigory/docs-static/main/local-mock-core/assets/images/sence-example.png" alt="sence-example" />

## Pain points when developing H5 pages

In business development, we often encounter the problem that the local development and debugging page is inconvenient under the business domain name, which is a common pain point in the development process, imagine the following business development scenario. We need to develop an H5 page, which can be opened through webview after completing Auth 2.0 authorization in some APP environments, and the business domain name of the external network is `remote-domain.com`, under the normal development process, then we generally do the following things:

1. Start the local front-end page development server, such as `localhost:8080`
1. If there is a gateway layer that handles Auth2.0 authorization, interface forwarding, and static resource forwarding, that most likely requires the node gateway layer to be started locally, such as `localhost:3000`
1. Map the business domain to local through a proxy, such as Charles Map Remote `remote-domain.com` -> `localhost:3000`
1. Access `remote-domain.com`, forwarded by Charles proxy, gateway layer, `devServer`, finally the page dispaly on the APP webview.

> 😫 woohoo~, after completing the above steps, you can finally start developing H5 pages happily, but are such development and debugging steps really make you enjoyable 🤔 ???

<img width="600" src="https://raw.githubusercontent.com/vigory/docs-static/main/local-mock-core/assets/images/h5-gateway.png" alt="h5-gateway" />

## What problem does LocalMock solve?

LocalMock aims to solve the pain points encountered in the development process described above, compared with the general local development method, it mainly has the following features:

- 🎉**without proxy**, you do not need to map domain to local. (like: Charles Map Remote）
- 🚀**devServer only**, you do not need to start the node server at the same time.
- 🌻**One-click debugging**, through the local-mock-easy plugin, you can start debugging on the mobile machine with one click.
- 🌻**Both static and gateway scenarios are supported**, nodejs gateway proxy forwarding static resources and public network domain map to local static resources are both supported.

## Get Started

### Mode-1: The node gateway proxy forwards static resource patterns

This mode is applicable to gateway-layer scenarios where Auth2.0 authorization, interface forwarding, and static resource forwarding are handled. Generally, after obtaining the authorization information, the authorization information is injected into the entry file. This solution needs to install [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware) on the nodejs server side at the same time. Install [local-mock-easy](https://www.npmjs.com/package/local-mock-easy) on H5 client.

> More example, reference [staticAndGateWay](./example/staticAndGateWay/README.md)

### 1. install local-mock-middleware on the nodejs server

Express and Koa usage scenarios are already built-in, and other node services can be custom extended.

```js
// Use express as an example
const express = require('express')
const createLockMock = require('local-mock-middleware')

const app = express()

// 1. create localMock instance
const localMock = createLockMock({
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // ensure open in dev mode
  htmlPort: 3000,
})

// 2. oepn local-mock html proxy
localMock.createExpressLocalHtmlProxy(app)

app.listen(3000, function () {
  console.log('express start sucessfully  port 3000...')
})
```

> More info, reference [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware)

### 2. Install local-mock-easy plugin on the H5 client

Both vconsole and eruda debug panels are already built-in, and other debugging services can be custom extended to you.

```js
// #!if ENV === "development"
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-easy'

eruda.init()

const localMockplugin = erudaLocalMock(eruda, {})

eruda.add(localMockplugin)
// #!endif
```

> More info, reference [local-mock-easy](https://www.npmjs.com/package/local-mock-easy)

### Mode2: static mode

This mode is applicable to business pages that do not require a gateway layer, debugging is implemented by replacing static resource entries. Such as mock the business page `remote-domain.com/pages/a` replace with `devServer` page `localhost:8080/pages/a`

> More example, reference [static](./example/static/README.md)

#### 1. Install local-mock-easy plugin on the H5 client

Both vconsole and eruda debug panels are already built-in, and other debugging services can be custom extended to you.

```js
// #!if ENV === "development"
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-easy'

eruda.init()

const localMockplugin = erudaLocalMock(eruda, {
  mode: 'static',
})

eruda.add(localMockplugin)
// #!endif
```

> More info, reference [local-mock-easy](https://www.npmjs.com/package/local-mock-easy)
