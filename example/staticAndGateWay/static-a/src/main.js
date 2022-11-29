import { createApp } from 'vue'
import App from './App.vue'
import eruda from "eruda"
import { erudaLocalMock } from 'local-mock-easy'

createApp(App).mount('#app')
eruda.init()
const localMockplugin = erudaLocalMock(eruda, {
    entry:"http://localhost:9001"
})

eruda.add(localMockplugin)
 