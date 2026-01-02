import { createApp } from 'vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  GiHamburgerMenu,
  MdElectricbolt,
  RiSwordFill,
  MdShield,
} from 'oh-vue-icons/icons'

addIcons(GiHamburgerMenu, MdElectricbolt, RiSwordFill, MdShield)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.component('v-icon', OhVueIcon)

app.mount('#app')
