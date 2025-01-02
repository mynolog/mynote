import { createApp } from 'vue'
import router from './router'
import './assets/tailwind.css'
import './styles/reset.css'
import './styles/index.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
