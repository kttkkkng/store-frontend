import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Layout/Main.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'sale' },
      component: Main,
      children: [
        {
          path: 'sale',
          name: 'sale',
          component: () => import('../views/SaleView.vue'),
        },
        {
          path: 'store',
          name: 'store',
          component: () => import('../views/StoreView.vue'),
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/ProductView.vue'),
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/CategoryView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ]
})

export default router
