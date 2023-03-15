import '@/style.css'
import Notifications from '@kyvg/vue3-notification'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(Notifications).mount('#app')
