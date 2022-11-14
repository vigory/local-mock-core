import expressMiddleware from '@/core/express-middleware'
import koaMiddleware from '@/core/koa-middleware'

export { koaMiddleware, expressMiddleware }

export const name = 'local-mock-middleware'

const middleware = {
  name,
  expressMiddleware,
  koaMiddleware,
}

export default middleware
