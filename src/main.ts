import { createApp } from 'vue'
import router from './router'
import './styles/index.css'
import './assets/tailwind.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
