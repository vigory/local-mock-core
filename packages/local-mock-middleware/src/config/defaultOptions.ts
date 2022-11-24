import { LocalMockProxyDefaultConfig } from 'types'

export const localMockProxyDefaultConfig: LocalMockProxyDefaultConfig = {
  isLocalMockProxyOpen: true,
  htmlHost: '127.0.0.1',
  htmlPort: 8899,
  htmlServerPath: '/local-mock-html',
  localMockParamsName: 'localMock',
  injectHtml: null,
}

export const localMockProxyHttpDefaultConfig = {
  ...localMockProxyDefaultConfig,
  port: 80,
}

export const localMockProxyHttpsDefaultConfig = {
  ...localMockProxyDefaultConfig,
  port: 443,
}
