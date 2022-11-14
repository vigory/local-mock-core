export declare type MiddlewareOptions = {
  key?: string
  injectHtml?: (...args) => string
}

export declare function expressMiddleware<T>(options: MiddlewareOptions): T

export declare function koaMiddleware<T>(options: MiddlewareOptions): T
