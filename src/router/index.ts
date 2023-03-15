import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BookList',
    meta: {
      title: '書籍列表'
    },
    component: () => import('@/views/BookList.vue')
  },
  {
    path: '/:bookId',
    name: 'BookItem',
    meta: {
      title: '書本詳情'
    },
    component: () => import('@/views/BookDetailPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
