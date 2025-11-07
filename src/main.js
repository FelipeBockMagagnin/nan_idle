import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'

app.use(router) 

createApp(App).mount('#app')
