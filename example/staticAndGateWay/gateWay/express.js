// 引入express框架
const express = require('express')
const proxy = require('express-http-proxy')
const { localMockProxy, expressMiddleware } = require('local-mock-middleware')

localMockProxy()

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/test', function (req, res, next) {
  expressMiddleware({
    isLocalMockProxyOpen: false,
  })(req, res, next)
})

app.use(function (req, res, next) {
  // 例如此时应当要代理到百度，但是因为配置了localMockProxy,会自动代理到localMock后面的url上
  proxy('127.0.0.1:9090')(req, res, next)
})

// 监听端口
app.listen(3001)
// 控制台提示输出
console.log('server is runing at localhost:' + 3001)
