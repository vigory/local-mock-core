import { MiddlewareOptions } from 'types'
import { defaultConfig, generateTemplate } from './constants'

const koaMiddleware = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  const { isOpen, key, injectHtml } = options as MiddlewareOptions

  const middleware = async (ctx, next) => {
    if (isOpen && ctx) {
      const isGet = ctx.request.method === 'GET'
      const isHtmlType = ctx.request.is('html') || !ctx.request.type // without Content-Type default is text/html or text/plain
      const hasLocalMockQuery = ctx.query && ctx.query[key]
      // console.log('koaMiddleware --->>> ', ctx.method, ctx.request.path, ctx?.query, ctx?.headers)

      if (isGet && isHtmlType && hasLocalMockQuery) {
        const entry = ctx.query[key] || ''
        const extraHtml = injectHtml(ctx)
        const template = generateTemplate(entry, extraHtml)

        ctx.body = template

        return true
      }
    }

    await next()
  }

  return middleware
}

export default koaMiddleware
