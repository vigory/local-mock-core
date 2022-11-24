const Koa = require("koa")
const { koaMiddleware } = require("local-mock-middleware")

const app = new Koa()

const middleware = koaMiddleware({
  key: 'myLocalMock',
  injectHtml: () => {
    return `<script type="text/javascript">
        alert("ok")
      </script>`
  },
})

app.use(middleware)
// response
app.use((ctx) => {
  ctx.body = "Hello Koa"
})

app.listen(3001)
