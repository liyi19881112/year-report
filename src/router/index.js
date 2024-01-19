import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        index: 1,
        requiresAuth: true // 需要登录验证
      }
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/product-list',
      component: () => import('@/views/ProductList.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/category',
      component: () => import('@/views/Category.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/product/:percentage/:id',
      name: 'product',
      component: () => import('@/views/ItemDetail.vue'),
      meta: {
        index: 3,
        requiresAuth: true
      }
    },
    {
      path: '/cart',
      component: () => import('@/views/Cart.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/create-order',
      component: () => import('@/views/CreateOrder.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address',
      component: () => import('@/views/Address.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address-edit',
      component: () => import('@/views/AddressEdit.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: () => import('@/views/OrderDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue'),
      meta: {
        index: 2
      }
    },
  ]
})

export default router
