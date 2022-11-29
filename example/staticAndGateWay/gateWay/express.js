const express = require('express')
const proxy = require('express-http-proxy')
const createLockMock = require('local-mock-middleware')

const localMock = createLockMock()

const app = express()

app.all('/*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

localMock.createExpressLocalHtmlProxy(app)

app.get('*', function (req, res, next) {
  proxy('http://127.0.0.1:9000')(req, res, next)
})

// 监听端口
const client = app.listen(3000, function () {
  localMock.updateExpressPort(client)
  console.log('express start sucessfully  ...')
})
