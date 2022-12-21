const koaLocalMock: any = {}

koaLocalMock.createKoaLocalHtmlProxy = function (app) {
  const { htmlServerPath, localMockParamsName, isLocalMockProxyOpen } = this.localMockOptions
  const _this = this

  if (isLocalMockProxyOpen === false) {
    return
  }

  app.use(async (ctx, next) => {
    // 如果关闭状态，直接透传
    if (isLocalMockProxyOpen === false || ctx.method !== 'GET') {
      await next()
      return
    }

    const mockPath = _this.getLocalMockParams(ctx.req.url, localMockParamsName)

    if (!mockPath) {
      await next()
      return
    }

    if (ctx.request.path !== htmlServerPath) {
      await next()
      return
    }

    // console.log(this.getGenerateTemplate(mockPath))

    ctx.body = this.getGenerateTemplate(mockPath)
    return
  })
}

koaLocalMock.updateKoaPort = function (client) {
  try {
    const address = client.address()
    console.log('address', address)
    this.localMockOptions.htmlPort = address.port
  } catch (error) {
    console.log(error)
  }
}

export default koaLocalMock
