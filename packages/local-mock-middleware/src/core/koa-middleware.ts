import { MiddlewareOptions } from 'types'
import { defaultConfig, generateTemplate } from './constants'

const koaMiddleware = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  const { key, injectHtml } = options as MiddlewareOptions

  const middleware = (ctx, next) => {
    if (ctx && ctx.query) {
      const query = ctx.query || {}
      const entry = query[key] || {}
      const extraHtml = injectHtml(ctx)
      const template = generateTemplate(entry, extraHtml)

      ctx.body = template

      return true
    }
    next()
  }

  return middleware
}

export default koaMiddleware
