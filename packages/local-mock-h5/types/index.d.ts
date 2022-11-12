export type LocalMockOptions = {
  key?: string
  state?: 0 | 1
  entry?: string
}

export function erudaLocalMock<T>(eruda, options: LocalMockOptions): T

export function vconsoleLocalMock<T>(VConsole, options: LocalMockOptions): T
