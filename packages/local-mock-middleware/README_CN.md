[English](https://github.com/redstar08/local-mock-core/blob/master/packages/local-mock-middleware/README.md) | 简体中文

<a href="https://www.npmjs.com/package/local-mock-middleware"><img src="https://img.shields.io/npm/v/local-mock-middleware.svg?sanitize=true" alt="Version"></a>

# `local-mock-middleware`

> local-mock-middleware 是一个 node 端的调试中间件，目前支持 [express](https://www.npmjs.com/package/express) 和 [koa](https://www.npmjs.com/package/koa).

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

const middleware = expressMiddleware()

app.use(middleware)

app.listen(3001)
```

#### koa 中间件

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

| params     | desc                                                    | type                   | default     |
| :--------- | :------------------------------------------------------ | :--------------------- | :---------- |
| key        | 需要拦截的参数名<br> `http://example.com?{key}={entry}` | `string`               | `localMock` |
| injectHtml | 注入的额外字符串的函数                                  | `(req, res) => string` | ""          |

## FQA

#### local-mock-middleware 做了什么事情 ?

如果 `req.query` 包含 key `localMock` 或者配置的 `options.key` local-mock-middleware 会自动生成并返回一个包含 mock 函数的 html 文件, mock 函数会将 `req.query[key]` 做为页面的入口文件去 fetch , 然后通过 `document.write()` 去重写当前页面
