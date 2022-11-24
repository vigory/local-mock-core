const url = require('url')

// const expressMiddleware = (params = {}) => {
//   const options: LocalMockProxyDefaultConfig = Object.assign(localMockProxyDefaultConfig, params)
//   const { isLocalMockProxyOpen, htmlServerPath, localMockParamsName } = options

//   return (req, res, next) => {
//     const isGet = req.method === 'GET'

//     // 开启状态才开启
//     if (!isLocalMockProxyOpen || !req.headers.isLocalMockProxyOpen || !isGet) {
//       next()
//       return
//     }

//     const urlParsed = url.parse(req.url, true)
//     const mockPath = getLocalMockParams(req.url, localMockParamsName)
//     if (urlParsed.pathname == htmlServerPath) {
//       res.send(getGenerateTemplate(mockPath))
//       return
//     }

//     next()
//   }
// }

// export default expressMiddleware

const expressLocalMock: any = {}

expressLocalMock.createExpressLocalHtmlProxy = function () {
  const { htmlServerPath, localMockParamsName, isLocalMockProxyOpen } = this.localMockOptions
  const _this = this

  return (req, res, next) => {
    // 如果关闭状态，直接透传
    if (isLocalMockProxyOpen === false) {
      next()
      return
    }

    console.log(' req.method', req.method, req)
    const isGet = req.method === 'GET'

    if (!isGet) {
      next()
      return
    }

    const urlParsed = url.parse(req.url, true)
    console.log('嘿嘿', urlParsed, urlParsed.pathname, htmlServerPath)
    const mockPath = _this.getLocalMockParams(req.url, localMockParamsName)
    if (urlParsed.pathname == htmlServerPath) {
      res.send(this.getGenerateTemplate(mockPath))
      return
    }

    next()
  }
}

export default expressLocalMock
