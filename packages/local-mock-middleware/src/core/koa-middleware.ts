import { MiddlewareOptions } from 'types'
import { defaultConfig, generateTemplate } from './constants'

const koaMiddleware = (options = {}) => {
  options = Object.assign(options, defaultConfig)

  const { key, injectHtml } = options as MiddlewareOptions

  const middleware = (ctx) => {
    if (ctx && ctx.query) {
      const query = ctx.query || {}
      const entry = query[key] || {}
      const extraHtml = injectHtml(ctx)
      const template = generateTemplate(entry, extraHtml)

      ctx.body = template

      return true
    }
  }

  return middleware
}

export default koaMiddleware
