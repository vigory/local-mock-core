import { setup } from '@/core/setup'
import { renderLocalMock } from '@/views/LocalMock'
import { erudaLocalMock, vconsoleLocalMock } from '@/core'

export const name = 'local-mock-h5'

const LocalMockH5 = {
  name,
  setup,
  render: renderLocalMock,
  erudaLocalMock,
  vconsoleLocalMock,
}

export default LocalMockH5
