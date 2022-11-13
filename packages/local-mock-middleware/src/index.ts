import expressMiddleware from '@/core/express-middleware'
import koaMiddleware from '@/core/koa-middleware'
export { default as expressMiddleware } from '@/core/express-middleware'
export { default as koaMiddleware } from '@/core/koa-middleware'

export const name = 'local-mock-middleware'

const middleware = {
  name,
  expressMiddleware,
  koaMiddleware,
}

export default middleware
