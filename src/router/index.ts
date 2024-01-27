import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsViewVue from '../views/ProductsView.vue'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          component: HomePage
        },
        {
          path: 'products',
          component: () => import('../views/ProductsView.vue')
        }
      ]
    }
    // {
    //   path: '/products',
    //   name: 'products',
    //   component: ProductsViewVue
    //   // component: () => import('../views/ProductsView.vue')
    // }
  ]
})

export default router
