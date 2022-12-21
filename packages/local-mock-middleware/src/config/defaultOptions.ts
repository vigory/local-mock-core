import { LocalMockProxyDefaultConfig } from 'types'

export const localMockProxyDefaultConfig: LocalMockProxyDefaultConfig = {
  isLocalMockProxyOpen: false,
  htmlHost: '127.0.0.1',
  htmlPort: 8899,
  htmlServerPath: '/local-mock-html',
  localMockParamsName: 'localMock',
  injectHtml: null,
}
