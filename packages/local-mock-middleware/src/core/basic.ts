const url = require('url')
const http = require('http')
const https = require('https')

const localMock: any = {}

localMock.getGenerateTemplate = function (target: string) {
  const { injectHtml } = this.localMockOptions

  if (injectHtml) {
    return injectHtml(target)
  }

  return `<html>
        <body>
          <head>
          </head>
          <script>
          try {
            function mock() {
              fetch('${target}').then((obj) => {
                obj.text().then((text) => {
                  document.open()
                  document.write(text)
                  document.close() // ensure document.readyState = "complete"
                })
              })
            }
            mock()
          } catch (e) {
            console.log(e)
          }
          </script>
        </body>
      </html>`
}

localMock.getLocalMockParams = function (path, localMockParamsName) {
  const urlParsed = url.parse(path, true)
  const query = urlParsed.query || {}
  const localMockUrl = query[localMockParamsName]
  console.log('urlParsed.query', urlParsed.query)
  return localMockUrl
}

localMock.initHttp = function initHttp() {
  http.orginRequest = http.request
  http.request = new Function()
  http.request = this.fakeHttpRequest(http)

  https.orginRequest = https.request
  https.request = new Function()
  https.request = this.fakeHttpRequest(https)
}

localMock.fakeHttpRequest = function (requestModule) {
  return (reqOptions, ...props) => {
    const { localMockParamsName, isLocalMockProxyOpen, htmlPort, htmlHost, htmlServerPath } = this.localMockOptions
    const mockPath = localMock.getLocalMockParams(reqOptions.path, localMockParamsName)

    if (mockPath && isLocalMockProxyOpen !== false && reqOptions?.headers?.isLocalMockProxyOpen !== false) {
      reqOptions.host = htmlHost
      reqOptions.port = htmlPort
      reqOptions.path = htmlServerPath + '?' + localMockParamsName + '=' + mockPath
    }

    return requestModule.orginRequest(reqOptions, ...props)
  }
}

export default localMock
