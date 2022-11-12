export type MiddlewareOptions = {
  key?: string
  injectHtml?: (...args) => string
}

export function expressMiddleware<T>(options: MiddlewareOptions): T

export function koaMiddleware<T>(options: MiddlewareOptions): T
