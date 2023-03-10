import { createApp } from 'vue'
import App from './App.vue'
import LandingPage from './components/LandingPage.vue'
import ModelsPage from './components/ModelsPage.vue'
import ModelPage from './components/ModelPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/modely',
    name: 'ModelsPage',
    component: ModelsPage
  },
  {
    path: '/model/:id',
    name: 'ModelPage',
    component: ModelPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
