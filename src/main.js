import './assets/tailwind.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersists from "pinia-plugin-persistedstate";

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Lara from '@/presets/lara';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Menu from 'primevue/menu'
import Checkbox from 'primevue/checkbox'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersists)
app.use(pinia)

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Menu', Menu)
app.component('Dropdown', Dropdown)
app.component('Checkbox', Checkbox)

app.mount('#app')
