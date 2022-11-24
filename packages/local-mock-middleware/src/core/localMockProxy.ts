const http = require('http')
const https = require('https')
const url = require('url')
import { localMockProxyHttpDefaultConfig, localMockProxyHttpsDefaultConfig } from '../config/defaultOptions'
import generateTemplate from '../utils/getGenerateTemplate'

function fakeHttpRequest(requestModule, options) {
  const { localMockParamsName, isLocalMockProxyOpen, htmlPort, htmlHost, htmlServerPath } = options

  return function (reqOptions, ...props) {
    const mockPath = getLocalMockParams(reqOptions.path, localMockParamsName)

    console.log(
      mockPath && isLocalMockProxyOpen && reqOptions?.headers?.isLocalMockProxyOpen !== false,
      mockPath,
      isLocalMockProxyOpen,
      reqOptions?.headers?.isLocalMockProxyOpen,
    )
    const isGet = reqOptions.method === 'GET'
    // const isHtmlType = reqOptions.is('html') || !reqOptions.get('Content-Type') // without Content-Type default is text/html or text/plain

    console.log(isGet)
    if (mockPath && isLocalMockProxyOpen && reqOptions?.headers?.isLocalMockProxyOpen !== false) {
      reqOptions.host = htmlHost
      reqOptions.port = htmlPort
      reqOptions.path = htmlServerPath + '?' + localMockParamsName + '=' + mockPath
    }
    // console.log('reqOptions', reqOptions)
    return requestModule.orginRequest(reqOptions, ...props)
  }
}

// 获取localMock参数
function getLocalMockParams(path, localMockParamsName) {
  const urlParsed = url.parse(path, true)
  const query = urlParsed.query || {}
  const localMockUrl = query[localMockParamsName]

  return localMockUrl
}

// 初始化html服务
function initHtmlServer(port, path, localMockParamsName) {
  http
    .createServer(function (request, response) {
      const urlParsed = url.parse(request.url, true)

      const mockPath = getLocalMockParams(request.url, localMockParamsName)
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

      if (urlParsed.pathname == path) {
        response.write(generateTemplate(mockPath))
        response.end()
      } else {
        response.write('<html><body>欢迎</body></html>')
        response.end()
      }
    })
    .listen(port)
}

const localMockProxy = (options) => {
  http.orginRequest = http.request
  http.request = new Function()
  const httpOptions = { ...localMockProxyHttpDefaultConfig, ...options }
  http.request = fakeHttpRequest(http, httpOptions)

  https.orginRequest = https.request
  https.request = new Function()
  const httpsOptions = { ...localMockProxyHttpsDefaultConfig, ...options }
  https.request = fakeHttpRequest(https, httpsOptions)

  initHtmlServer(httpOptions.htmlPort, httpOptions.htmlServerPath, httpOptions.localMockParamsName)
}

export default localMockProxy
