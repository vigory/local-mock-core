const http = require('http')
const url = require('url')

const localMock: any = {}

// 初始化html服务
localMock.createLocalHtmlProxy = function () {
  const {
    htmlPort: port,
    htmlServerPath: path,
    localMockParamsName,
    injectHtml,
    isLocalMockProxyOpen,
  } = this.localMockOptions
  const _this = this

  if (isLocalMockProxyOpen === false) {
    return
  }

  http
    .createServer(function (request, response) {
      const urlParsed = url.parse(request.url, true)

      const mockPath = _this.getLocalMockParams(request.url, localMockParamsName)
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

      if (urlParsed.pathname == path) {
        response.write(injectHtml ? injectHtml(mockPath) : _this.getGenerateTemplate(mockPath))
        response.end()
      } else {
        response.write('<html><body>欢迎</body></html>')
        response.end()
      }
    })
    .listen(port)
}

export default localMock
