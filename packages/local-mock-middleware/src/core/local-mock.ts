import { localMockProxyDefaultConfig } from '@/config/defaultOptions'
import basic from './basic'
import expressProto from './express-proto'
import koaProto from './koa-proto'
import proxyProto from './proxy-proto'

const mixin = require('merge-descriptors')

function createLockMock(options = {}) {
  try {
    const localMock: any = function () {}
    localMock.localMockOptions = { ...localMockProxyDefaultConfig, ...options }
    mixin(localMock, basic, false)
    mixin(localMock, proxyProto, false)
    mixin(localMock, expressProto, false)
    mixin(localMock, koaProto, false)

    localMock.initHttp()
    return localMock
  } catch (error) {
    return {
      isLocalMockProxyOpen: false,
    }
  }
}

export default createLockMock
