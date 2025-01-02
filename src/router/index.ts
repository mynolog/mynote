import { createRouter, createWebHistory } from 'vue-router'
import RootLayout from '../layout/RootLayout.vue'
import HomePage from '../pages/home-page/HomePage.vue'
import MemoDetail from '../components/memo-detail/MemoDetail.vue'

const routes = [
  {
    path: '/',
    component: RootLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'memo/:id',
        name: 'memo-detail',
        component: MemoDetail,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
