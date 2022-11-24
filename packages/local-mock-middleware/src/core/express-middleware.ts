import { MiddlewareOptions } from 'types'
import { defaultConfig } from './constants'

const expressMiddleware = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  // const { isOpen, key, injectHtml } = options as MiddlewareOptions
  const { isOpen, key } = options as MiddlewareOptions

  const middleware = (req, res, next) => {
    req.headers.isLocalMockProxyOpen = isOpen
    console.log('req.headers11111', req.headers, isOpen)
    if (isOpen && req) {
      const isGet = req.method === 'GET'
      const isHtmlType = req.is('html') || !req.get('Content-Type') // without Content-Type default is text/html or text/plain
      const hasLocalMockQuery = req.query && req.query[key]
      // console.log('koaMiddleware --->>> ', ctx.method, ctx.request.path, ctx?.query, ctx?.headers)

      if (isGet && isHtmlType && hasLocalMockQuery) {
        // const entry = req.query[key] || ''
        // const extraHtml = injectHtml(req, res)
        // const template = generateTemplate(entry, extraHtml)

        res.type('html')
        // res.send(template)
        res.send('2222')

        return true
      }
    }

    next()
  }

  return middleware
}

export default expressMiddleware
