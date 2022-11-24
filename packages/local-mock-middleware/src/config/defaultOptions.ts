import { LocalMockProxyDefaultConfig } from 'types'

export const localMockProxyDefaultConfig: LocalMockProxyDefaultConfig = {
  isLocalMockProxyOpen: true,
  localMockParamsName: 'localMock',
  htmlHost: '127.0.0.1',
  htmlPort: 8899,
  htmlServerPath: '/aaaa',
}

export const localMockProxyHttpDefaultConfig = {
  ...localMockProxyDefaultConfig,
  port: 80,
}

export const localMockProxyHttpsDefaultConfig = {
  ...localMockProxyDefaultConfig,
  port: 443,
}
