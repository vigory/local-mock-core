English | [简体中文](./README_CN.md)

<a href="https://www.npmjs.com/package/local-mock-middleware"><img src="https://img.shields.io/npm/v/local-mock-middleware.svg?sanitize=true" alt="Version"></a>

# `local-mock-middleware`

> A easy debug middleware for [express](https://www.npmjs.com/package/express) and [koa](https://www.npmjs.com/package/koa).

## Usage

### Install

```shell
npm i local-mock-middleware
yarn add local-mock-middleware
```

### Add middleware

#### Middleware for express

```js
const express = require('express')
const { expressMiddleware } = require('local-mock-middleware')

const app = express()

const middleware = expressMiddleware()

app.use(middleware)
```

#### Middleware for koa

```js
const Koa = require('koa')
const { koaMiddleware } = require('local-mock-middleware')

const app = new Koa()

const middleware = koaMiddleware()

app.use(middleware)

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3001)
```

> You can config your url query params use `options.key` such as http://example.com?myLocalMock={entry}  
> You can config a `injectHtml` to inject any string to the html

```js
const options = {
  key: 'myLocalMock',
  injectHtml: () => {
    return `<script type="text/javascript">
        alert("ok")
      </script>`
  },
}

const middleware = expressMiddleware(options)

const koaMiddleware = koaMiddleware(options)
```

## Options API

| params | desc | type | default |
| :-- | :-- | :-- | :-- |
| key | The query params name in url.<br> `http://example.com?{key}={entry}` | `string` | `localMock` |
| injectHtml | A function return extra html string | `(req, res) => string` | "" |

## FQA

#### What does local-mock-middleware do ?

if `req.query` contains key `localMock` or `options.key` local-mock-middleware will generate and return a html includes mock function, the mock function will regard `req.query[key]` as a page entry and then fetch it, then use `document.write()` to rewrite current page.
