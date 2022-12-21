export declare type LocalMockProxyDefaultConfig = {
  isLocalMockProxyOpen: boolean
  localMockParamsName?: string
  htmlPort?: number
  htmlServerPath?: string
  htmlHost?: string
  injectHtml?: (target: string) => string
}
