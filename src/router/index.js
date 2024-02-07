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
          path: 'page',
          name: 'page',
          component: () => import('../views/PageView.vue'),
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/CategoryView.vue'),
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('../views/HistoryView.vue'),
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
