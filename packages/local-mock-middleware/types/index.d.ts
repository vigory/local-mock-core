export declare type MiddlewareOptions = {
  isOpen: boolean
  key?: string
  injectHtml?: (...args) => string
}

export declare type LocalMockProxyDefaultConfig = {
  isLocalMockProxyOpen: boolean
  localMockParamsName?: string
  htmlPort?: number
  htmlServerPath?: string
  htmlHost?: string
}

export declare function generateTemplate(entry: string, extraHtml: string): string

export declare function expressMiddleware<T>(options: MiddlewareOptions): T

export declare function koaMiddleware<T>(options: MiddlewareOptions): T
