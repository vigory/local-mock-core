export const name = 'local-mock-middleware'

import expressMiddleware from '@/core/express-middleware'
import koaMiddleware from '@/core/koa-middleware'

const middleware = {
  name,
  expressMiddleware,
  koaMiddleware,
}

export default middleware
