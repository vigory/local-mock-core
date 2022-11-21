[English](/packages/local-mock-middleware/README.md) | 简体中文

<a href="https://www.npmjs.com/package/local-mock-middleware"><img src="https://img.shields.io/npm/v/local-mock-middleware.svg?sanitize=true" alt="Version"></a>

# `local-mock-middleware`

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
const { expressMiddleware } = require('local-mock-middleware')

const app = express()

const middleware = expressMiddleware({
  isOpen: process.env.NODE_ENV === 'dev', // 请勿在生产环境中开启！！！
})

app.use(middleware)

app.listen(3001)
```

#### koa 中间件

```js
const Koa = require('koa')
const { koaMiddleware } = require('local-mock-middleware')

const app = new Koa()

const middleware = koaMiddleware({
  isOpen: process.env.NODE_ENV === 'dev', // 请勿在生产环境中开启！！！
})

app.use(middleware)

// response
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(3001)
```

> 你可以通过配置 `options.key` ；来修改需要拦截的参数名称，如：http://example.com?myLocalMock={entry}  
> 你可以通过配置 `injectHtml` 函数，用于插入自定义的字符串到 html

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

| params     | desc                                                      | type                   | default     |
| :--------- | :-------------------------------------------------------- | :--------------------- | :---------- |
| isOpen     | 中间件的开启状态(默认 false 表示是一个无任何逻辑的中间件) | boolean                | false       |
| key        | 需要拦截的参数名<br> `http://example.com?{key}={entry}`   | `string`               | `localMock` |
| injectHtml | 注入的额外字符串的函数                                    | `(req, res) => string` | ""          |

## FQA

#### 什么时候开启 local-mock-middleware 中间件？

> 重要的事情说三遍！！！

- 确保不要在生产环境开启！！！
- 确保不要在生产环境开启！！！
- 确保不要在生产环境开启！！！

#### local-mock-middleware 做了什么事情 ?

如果 `req.query` 包含 key `localMock` 或者配置的 `options.key` local-mock-middleware 会自动生成并返回一个包含 mock 函数的 html 文件, mock 函数会将 `req.query[key]` 做为页面的入口文件去 fetch , 然后通过 `document.write()` 去重写当前页面
