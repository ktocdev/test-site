import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import SecondPage from './components/SecondPage.vue'
import FontShowcase from './components/FontShowcase.vue'

// Define routes
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/second', component: SecondPage },
  { path: '/fonts', component: FontShowcase }
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