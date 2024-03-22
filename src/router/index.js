/*
 * @Author: 李一
 * @Date: 2023-12-20 14:19:05
 * @LastEditors: 李一
 * @LastEditTime: 2024-03-22 09:06:32
 * @FilePath: \year-report-github\src\router\index.js
 * @Description: 文件描述
 */
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
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/reel-scroll',
      component: () => import('@/views/ReelScroll.vue')
    },
  ]
})

export default router
