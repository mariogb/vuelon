import { createApp } from 'vue'
import router from './route'
import App from './App.vue'

console.log("iiii nnn iii ccc iii aaa nnn ddd ooo")
const vueApp = createApp(App)
vueApp.use(router)
vueApp.mount('#app')
