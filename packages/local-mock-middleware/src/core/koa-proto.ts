const koaLocalMock: any = {}

koaLocalMock.createKoaLocalHtmlProxy = function (app) {
  const { htmlServerPath, localMockParamsName, isLocalMockProxyOpen } = this.localMockOptions
  const _this = this

  app.use(async (ctx, next) => {
    // 如果关闭状态，直接透传
    if (isLocalMockProxyOpen === false || ctx.method !== 'GET') {
      await next()
      return
    }

    const mockPath = _this.getLocalMockParams(ctx.req.url, localMockParamsName)

    console.log('mockPath', ctx.request.path, htmlServerPath, mockPath)

    if (!mockPath) {
      await next()
      return
    }

    if (ctx.request.url !== htmlServerPath) {
      await next()
      return
    }

    ctx.body = this.getGenerateTemplate(mockPath)
    return
  })
}

koaLocalMock.updateKoaConfig = function (client) {
  try {
    const address = client.address()
    console.log('address', address)
    this.localMockOptions.htmlHost = address.address
    this.localMockOptions.htmlPort = address.port
  } catch (error) {
    console.log(error)
  }
}

export default koaLocalMock
