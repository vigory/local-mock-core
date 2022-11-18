export declare type LocalMockOptions = {
  key?: string
  state?: 0 | 1
  entry?: string
}

export declare function erudaLocalMock<T>(eruda, options: LocalMockOptions): T

export declare function vconsoleLocalMock<T>(VConsole, options: LocalMockOptions): T