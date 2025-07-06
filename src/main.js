import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import FontShowcase from './pages/FontShowcase.vue'
import LogoDesign from './pages/LogoDesign.vue'
import Stars from './pages/Stars.vue'

// Define routes
const routes = [
  { path: '/', component: Home },
  { path: '/fonts', component: FontShowcase },
  { path: '/logo', component: LogoDesign },
  { path: '/stars', component: Stars }
]

// Create router
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')