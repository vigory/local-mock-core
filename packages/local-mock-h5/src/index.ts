import { MOCK_NAME, defaultConfig } from '@/utils/constants'
import { createVConsoleWrapper } from '@/utils/index'
import { renderLocalMock } from '@/views/LocalMock'
import { setup } from '@/utils/core'

export const name = 'local-mock-h5'

export function erudaLocalMock(eruda, options = defaultConfig) {
  return {
    name: MOCK_NAME,
    init($el) {
      this._$el = $el
      this.$localMockDom = $el[0]
      setup(options)
      renderLocalMock(this.$localMockDom)
    },
    show() {
      this._$el.show()
    },
    hide() {
      this._$el.hide()
    },
    destroy() {},
  }
}

export function vconsoleLocalMock(VConsole, options = defaultConfig) {
  const plugin = new VConsole.VConsolePlugin(MOCK_NAME, MOCK_NAME)

  const localMockDom = createVConsoleWrapper()
  renderLocalMock(localMockDom)

  plugin.on('renderTab', function (callback) {
    callback(localMockDom, { fixedHeight: true })
  })

  plugin.on('ready', function () {
    setup(options)
  })

  return plugin
}
