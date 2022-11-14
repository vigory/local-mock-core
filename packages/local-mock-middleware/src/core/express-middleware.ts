import { MiddlewareOptions } from 'types'
import { defaultConfig, generateTemplate } from './constants'

const expressMiddleware = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  const { key, injectHtml } = options as MiddlewareOptions

  const middleware = (req, res, next) => {
    // console.log('middleware -> ', key, req?.query)
    if (req && req.query && req.query[key]) {
      const entry = req.query[key] || ''
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
