English | [简体中文](./README_CN.md)

# LocalMock introduction

## What is LocalMock ?

LocalMock is a mock scheme for local development environment, at business domain name to fetch local devServer page resources. It is a reliable technical solution for local development and debugging. Compared with the general local development method, it mainly has the following features:

- 🎉**without proxy**, you do not need to map domain to local. (like: Charles Map Remote）
- 🚀**devServer only**, you do not need to start the node server at the same time.
- 🌻**One-click debugging**, through the local-mock-easy plugin, you can start debugging on the mobile machine with one click.

## Get Started

localMock need to install [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware) in nodejs server and [local-mock-easy](https://www.npmjs.com/package/local-mock-easy) in devServer

### Step1: install local-mock-middleware middleware

Add localMock middleware, when `req.query` contains key named`localMock`, local-mock-middleware will generate and return a html includes mock function.

```js
const express = require('express')
const { expressMiddleware } = require('local-mock-middleware')

const app = express()

const middleware = expressMiddleware({
  isOpen: process.env.NODE_ENV === 'dev',
})

app.use(middleware)
```

> More info, reference [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware)

### Step2: install local-mock-easy plugin

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
