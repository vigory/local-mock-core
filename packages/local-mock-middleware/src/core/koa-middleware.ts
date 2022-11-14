import { MiddlewareOptions } from 'types'
import { defaultConfig, generateTemplate } from './constants'

const koaMiddleware = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  const { key, injectHtml } = options as MiddlewareOptions

  const middleware = (ctx, next) => {
    // console.log('middleware -> ', key, ctx?.query)
    if (ctx && ctx.query && ctx.query[key]) {
      const entry = ctx.query[key] || ''
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
