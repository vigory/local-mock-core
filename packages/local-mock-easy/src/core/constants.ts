import { LocalMockOptions } from 'types'

export const MOCK_KEY = 'localMock'

export const URLREG = /^(https?:\/\/)([^?#]+)?([^#]+)?(.*)$/

export enum Status {
  OFF = 0,
  ON = 1,
}

export enum Fast {
  OFF = 0,
  ON = 1,
}

export const defaultConfig: LocalMockOptions = {
  key: 'localMock',
  state: Status.OFF,
  entry: 'http://localhost:8080',
  fast: Fast.OFF,
}
