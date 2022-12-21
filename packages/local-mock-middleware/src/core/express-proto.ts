const expressLocalMock: any = {}

expressLocalMock.createExpressLocalHtmlProxy = function (app) {
  const { htmlServerPath, localMockParamsName, isLocalMockProxyOpen } = this.localMockOptions
  if (isLocalMockProxyOpen === false) {
    return
  }
  const _this = this

  app.get(htmlServerPath, (req, res, next) => {
    // 如果关闭状态，直接透传
    if (isLocalMockProxyOpen === false) {
      next()
      return
    }

    const mockPath = _this.getLocalMockParams(req.url, localMockParamsName)
    res.send(this.getGenerateTemplate(mockPath))
    return
  })
}

expressLocalMock.updateExpressPort = function (client) {
  try {
    const address = client.address()
    this.localMockOptions.htmlPort = address.port
  } catch (error) {
    console.log(error)
  }
}

export default expressLocalMock
