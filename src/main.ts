import App from './App.vue'
import { createApp } from 'vue'
import router from './route'

const vueApp = createApp(App)
vueApp.use(router)
vueApp.mount('#app')
