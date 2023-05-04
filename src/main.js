// Importaciones
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './router'
import { createPinia } from 'pinia'

// Crear App
createApp(App).use(Router).use(createPinia()).mount('#app')