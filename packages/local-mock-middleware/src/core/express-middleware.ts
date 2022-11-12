import { MiddlewareOptions } from 'types'
import { defaultConfig, generateTemplate } from './constants'

const expressMiddleware = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  const { key, injectHtml } = options as MiddlewareOptions

  const middleware = (req, res, next) => {
    if (req && req.query) {
      const query = req.query || {}
      const entry = query[key] || {}
      const extraHtml = injectHtml(req, res)
      const template = generateTemplate(entry, extraHtml)

      res.type('html')
      res.send(template)

      return
    }

    next()
  }

  return middleware
}

export default expressMiddleware
