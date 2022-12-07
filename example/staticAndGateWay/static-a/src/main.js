import { createApp } from 'vue'
import App from './App.vue'
import eruda from 'eruda'
import { erudaLocalMock } from 'local-mock-easy'

createApp(App).mount('#app')

eruda.init({ tool: 'console' })

const localMockPlugin = erudaLocalMock(eruda, {
  entry: 'http://localhost:9001',
})

eruda.add(localMockPlugin).show('localmock').show()
