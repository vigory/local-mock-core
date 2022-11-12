export const MOCK_KEY = 'localMock'
export const MOCK_NAME = 'Localmock'

export const URLREG = /^(https?:\/\/)([^?#]+)?([^#]+)?(.*)$/

export enum Status {
  OFF = 0,
  ON = 1,
}

export const defaultConfig = {
  state: Status.OFF,
  entry: 'http://localhost:8080',
}
