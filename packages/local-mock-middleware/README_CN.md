[English](/packages/local-mock-middleware/README.md) | 简体中文

<a href="https://www.npmjs.com/package/local-mock-middleware"><img src="https://img.shields.io/npm/v/local-mock-middleware.svg?sanitize=true" alt="Version"></a>

# local-mock-middleware

local-mock-middleware 是一个 node 端的调试中间件，目前支持 [express](https://www.npmjs.com/package/express) 和 [koa](https://www.npmjs.com/package/koa).

> 注意：local-mock-middleware 仅作为 [local-mock-core](https://github.com/vigory/local-mock-core) 的服务端(nodejs)部分，完整的 local-mock 调试方案需要同时在客户端(H5) 安装 [local-mock-easy](https://www.npmjs.com/package/local-mock-easy) 插件，步骤如下：

1. 在 nodejs 服务端安装 local-mock-middleware 中间件
1. 在 H5 客户端安装 [local-mock-easy](https://www.npmjs.com/package/local-mock-easy) 插件

## 快速上手

### 安装

```shell
npm i local-mock-middleware
yarn add local-mock-middleware
```

### 添加中间件

#### express 中间件

```js
const express = require('express')
const createLockMock = require('local-mock-middleware')

const app = express()

// 1. 创建 localMock 实例
const localMock = createLockMock({
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // 请勿在生产环境中开启！！！,
  htmlPort: 3000,
})

// 2. 开启静态资源 html 转发
localMock.createExpressLocalHtmlProxy(app)

app.listen(3000, function () {
  console.log('express start sucessfully  port 3000...')
})
```

#### koa 中间件

```js
const Koa = require('koa')
const createLockMock = require('local-mock-middleware')

const app = new Koa()

// 1. 创建 localMock 实例
const localMock = createLockMock({
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // 请勿在生产环境中开启！！！
  htmlPort: 3001,
})

// 2. 开启静态资源 html 转发
localMock.createKoaLocalHtmlProxy(app)

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3001, function () {
  console.log('koa start sucessfully  port 3001...')
})
```

#### 更多使用

> 通过配置 `localMockParamsName`，用于修改需要拦截的参数名称，如：http://example.com?myLocalMock={entry}  
> 通过配置 `htmlHost`，用于自定义 html 转发的 host  
> 通过配置`htmlPort`，用于自定义 html 转发的 port  
> 通过配置 `htmlServerPath`，用于自定义 html 转发的 path

```js
const options = {
  localMockParamsName: 'myLocalMock',
  isLocalMockProxyOpen: process.env.NODE_ENV === 'dev', // 请勿在生产环境中开启！！！
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
  // 可选，用于自动更新 htmlPort 为 client.address().port
  localMock.updateExpressPort(client)
  console.log('express start sucessfully  ...')
})
```

## Function API

| function                          | desc                               | type               |
| :-------------------------------- | :--------------------------------- | :----------------- |
| `createLockMock`                  | localMock 实例化                   | `(options) => ins` |
| `ins.createExpressLocalHtmlProxy` | express 中间件，用于处理 html 转发 | `(app) => void`    |
| `ins.updateExpressPort `          | express 自动更新 htmlPort          | `(client) => void` |
| `ins.createKoaLocalHtmlProxy `    | koa 中间件，，用于处理 html 转发   | `(app) => void`    |
| `ins.updateKoaPort `              | koa 自动更新 htmlPort              | `(client) => void` |

## Options API

| params | desc | type | default |
| :-- | :-- | :-- | :-- |
| isLocalMockProxyOpen | 中间件的开启状态(默认 false 表示是一个无任何逻辑的中间件) | `boolean` | `false` |
| localMockParamsName | 需要拦截的参数名<br /> `http://example.com?{localMockParamsName}={entry}` | `string` | `localMock` |
| htmlHost | 中转 html 的 host | `string` | "127.0.0.1" |
| htmlPort | 中转 html 的 port | `number` | 8899 |
| htmlServerPath | 中转 html 的路径 | `number` | `/local-mock-html` |
| injectHtml | 仅对代理模式有效。注入的额外字符串的函数 | `(target) => string` | "" |

## FQA

如果你遇到问题请联系我们 QQ 群 619705019 或者提 issues

<img width="300" src="https://raw.githubusercontent.com/vigory/docs-static/main/local-mock-core/assets/images/local-mock-qq-chat.png" alt="local-mock-qq-chat" />

#### 什么时候开启 local-mock-middleware 中间件？

> 重要的事情说三遍！！！

- 确保不要在生产环境开启！！！
- 确保不要在生产环境开启！！！
- 确保不要在生产环境开启！！！

#### local-mock-middleware 做了什么事情 ?

如果 `req.query` 包含 `localMock` 或者配置的 `options.localMockParamsName` local-mock-middleware 会自动生成并返回一个包含 mock 函数的 html 文件, mock 函数会将 `req.query[key]` 做为页面的入口文件去 fetch , 然后通过 `document.write()` 去重写当前页面
