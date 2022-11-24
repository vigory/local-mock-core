// import { generateTemplate } from '@/core/constants'
import expressMiddleware from '@/core/express-middleware'
import koaMiddleware from '@/core/koa-middleware'
import localMockProxy from '@/core/localMockProxy'

export { koaMiddleware, expressMiddleware, localMockProxy }

export const name = 'local-mock-middleware'

const middleware = {
  name,
  localMockProxy,
  expressMiddleware,
  koaMiddleware,
}

export default middleware
