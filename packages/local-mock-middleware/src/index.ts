import { generateTemplate } from '@/core/constants'
import expressMiddleware from '@/core/express-middleware'
import koaMiddleware from '@/core/koa-middleware'

export { generateTemplate, koaMiddleware, expressMiddleware }

export const name = 'local-mock-middleware'

const middleware = {
  name,
  generateTemplate,
  expressMiddleware,
  koaMiddleware,
}

export default middleware
