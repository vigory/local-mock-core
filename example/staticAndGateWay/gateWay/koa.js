const Koa = require('koa')
const proxy = require('koa-better-http-proxy')
const createLockMock = require('local-mock-middleware')

const app = new Koa()

const localMock = createLockMock({
  isLocalMockProxyOpen: true,
})

localMock.createKoaLocalHtmlProxy(app)
app.use(async (ctx, next) => {
  if (ctx.method !== 'GET') {
    next()
    return
  }
  await proxy('http://127.0.0.1:9000')(ctx)
  return
})
// response
app.use((ctx) => {
  ctx.body = 'Hello Koa'
})

const client = app.listen(3000, function () {
  localMock.updateKoaPort(client)
  console.log('koa start sucessfully  ...')
})
