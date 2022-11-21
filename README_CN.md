[English](./README.md) | 简体中文

# LocalMock 介绍

## What is LocalMock ?

LocalMock 顾名思义，指的是本地 mock 开发环境，在业务环境域名下将请求页面的资源，直接打到本地的开发服务器，它是一个可靠的本地开发调试的技术方案。相比一般的本地开发方式，它主要有以下优势：

- 🎉**无代理**，不需要将业务域名代理到本地（如：Charles Map Remote）
- 🚀**仅 devServer**，不需要同时启动 node 层服务
- 🌻**一键开启，调试方便**，通过 localMock 插件，一键即可在真机上开启调试

## 快速上手

localMock 方案需要在 nodejs 服务端安装 [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware)，同时在 H5 客户端需要安装 [local-mock-easy](https://www.npmjs.com/package/local-mock-easy)

### 第一步 nodejs 端安装 local-mock-middleware 中间件

增加一个 localMock 中间件逻辑，当 query 参数中包含 `localMock` 字段时，将构造并返回一个 html 文件流

```js
const express = require('express')
const { expressMiddleware } = require('local-mock-middleware')

const app = express()

const middleware = expressMiddleware({
  isOpen: process.env.NODE_ENV === 'dev',
})

app.use(middleware)
```

> 更多使用，请参考 [local-mock-middleware](https://www.npmjs.com/package/local-mock-middleware)

### 第二步 H5 端安装 local-mock-easy 面板插件

```js
// #!if ENV === "development"
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-easy'

eruda.init()

const localMockplugin = erudaLocalMock(eruda, {})

eruda.add(localMockplugin)
// #!endif
```

> 更多使用，请参考 [local-mock-easy](https://www.npmjs.com/package/local-mock-easy)
