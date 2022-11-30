import { LocalMockOptions } from 'types'

export const MOCK_KEY = 'localMock'

export const URLREG = /^(https?:\/\/)([^?#]+)?([^#]+)?(.*)$/

export const clientFlag = '__localMockIsOpen'

export enum Status {
  OFF = 0,
  ON = 1,
}

export enum Fast {
  OFF = 0,
  ON = 1,
}

export enum Mode {
  Static = 'static',
  Agent = 'agent',
}

export enum ModeDes {
  Static = '静态资源模式',
  Agent = '代理转发模式',
}

export const defaultConfig: LocalMockOptions = {
  key: 'localMock',
  mode: Mode.Agent,
  state: Status.OFF,
  entry: 'http://localhost:8080',
  fast: Fast.OFF,
}
