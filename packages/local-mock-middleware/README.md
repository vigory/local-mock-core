English | [简体中文](/packages/local-mock-middleware/README_CN.md)

<a href="https://www.npmjs.com/package/local-mock-middleware"><img src="https://img.shields.io/npm/v/local-mock-middleware.svg?sanitize=true" alt="Version"></a>

# `local-mock-middleware`

A easy debug middleware for [express](https://www.npmjs.com/package/express) and [koa](https://www.npmjs.com/package/koa).

> Note: local-mock-middleware is only the server (nodejs) part of [local-mock-core](https://github.com/vigory/local-mock-core), complete local-mock debugging solution needs to install [local-mock-easy](https://www.npmjs.com/package/local-mock-easy) on the client (H5) at the same time, follow steps:

1. Install local-mock-middleware on the nodejs server.
1. Install [local-mock-easy](https://www.npmjs.com/package/local-mock-easy) on the client.

## Usage

### Install

```shell
npm i local-mock-middleware
yarn add local-mock-middleware
```

### Add middleware

#### Middleware for express

```js
// Use express as an example
const express = require('express')
const createLockMock = require('local-mock-middleware')

const app = express()

// 1. create localMock instance
const localMock = createLockMock({
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // ensure not to be used in production!!!
  htmlPort: 3000,
})

// 2. oepn local-mock html proxy
localMock.createExpressLocalHtmlProxy(app)

app.listen(3000, function () {
  console.log('express start sucessfully  port 3000...')
})
```

#### Middleware for koa

```js
const Koa = require('koa')
const createLockMock = require('local-mock-middleware')

const app = new Koa()

// 1. create localMock instance
const localMock = createLockMock({
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // ensure not to be used in production!!!
  htmlPort: 3001,
})

// 2. oepn local-mock html proxy
localMock.createKoaLocalHtmlProxy(app)

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3001, function () {
  console.log('koa start sucessfully  port 3001...')
})
```

#### More use

> Config `localMockParamsName`, to modify the parameter name to be intercepted. eg: http://example.com?myLocalMock={entry}  
> Config `htmlHost`, to define custom html proxy host  
> Config `htmlPort`, to define custom html proxy port  
> Config `htmlServerPath`, to define custom html proxy path

```js
const options = {
  localMockParamsName: 'myLocalMock',
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // ensure not to be used in production!!!
  htmlHost: '127.0.0.1',
  htmlPort: 3000,
  htmlServerPath: '/local-mock-html',
  injectHtml: (target) => {
    return `<script type="text/javascript">
        alert(${target})
      </script>`
  },
}

const localMock = createLockMock(options)

const client = app.listen(3000, function () {
  // Optional Properties use to set htmlPort to client.address().port
  localMock.updateExpressPort(client)
  console.log('express start sucessfully  ...')
})
```

## Function API

| function                          | desc                                     | type               |
| :-------------------------------- | :--------------------------------------- | :----------------- |
| `createLockMock`                  | localMock instance                       | `(options) => ins` |
| `ins.createExpressLocalHtmlProxy` | express middleware, to handle html proxy | `(app) => void`    |
| `ins.updateExpressPort `          | express auto update port htmlPort        | `(client) => void` |
| `ins.createKoaLocalHtmlProxy `    | koa middleware, to handle html proxy     | `(app) => void`    |
| `ins.updateKoaPort `              | koa auto update port htmlPort            | `(client) => void` |

## Options API

| params | desc | type | default |
| :-- | :-- | :-- | :-- |
| isLocalMockProxyOpen | open state (false means a empty middleware) | `boolean` | `false` |
| localMockParamsName | parameter name to be intercepted <br /> `http://example.com?{localMockParamsName}={entry}` | `string` | `localMock` |
| htmlHost | custom html proxy host | `string` | "127.0.0.1" |
| htmlPort | custom html proxy port | `number` | 8899 |
| htmlServerPath | custom html proxy path | `number` | `/local-mock-html` |
| injectHtml | A function that injects html string | `(target) => string` | "" |

## FQA

#### When can I open the middleware?

> Important things need to be repeated for three times.

- ensure not to be used in production!!!
- ensure not to be used in production!!!
- ensure not to be used in production!!!

#### What does local-mock-middleware do ?

if `req.query` contains key `localMock` or `options.localMockParamsName` local-mock-middleware will generate and return a html includes mock function, the mock function will regard `req.query[key]` as a page entry and then fetch it, then use `document.write()` to rewrite current page.
