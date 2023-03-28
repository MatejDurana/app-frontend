import { createApp } from 'vue'
import App from './App.vue'
import LandingPage from './components/LandingPage.vue'
import ModelsPage from './components/ModelsPage.vue'
import ModelPage from './components/ModelPage.vue'
import { createRouter, createWebHistory } from 'vue-router'


import DKToast from 'vue-dk-toast';



const routes = [
  {
    path: '/~dur0133/frontend/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/~dur0133/frontend/modely',
    name: 'ModelsPage',
    component: ModelsPage
  },
  {
    path: '/~dur0133/frontend/model/:id',
    name: 'ModelPage',
    component: ModelPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


createApp(App).use(router).use(DKToast).mount('#app')
