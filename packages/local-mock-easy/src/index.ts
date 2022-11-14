import { setup } from '@/core/setup'
import { renderLocalMock } from '@/views/LocalMock'
import { erudaLocalMock, vconsoleLocalMock } from '@/core'

export { setup, renderLocalMock, erudaLocalMock, vconsoleLocalMock }

export const name = 'local-mock-easy'

const localMockEasy = {
  name,
  setup,
  renderLocalMock,
  erudaLocalMock,
  vconsoleLocalMock,
}

export default localMockEasy
