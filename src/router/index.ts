import { createRouter, createWebHistory } from 'vue-router'
import RootLayout from '../layout/RootLayout.vue'
import MemoDetail from '../components/memo-detail/MemoDetail.vue'
import { RoutePath } from '../types/path/paths'

const routes = [
  {
    path: RoutePath.Home,
    component: RootLayout,
    children: [
      {
        path: RoutePath.MemoDetail,
        name: 'memo-detail',
        component: MemoDetail,
        props: true,
      },
    ],
  },
  {
    path: RoutePath.Auth,
    component: () => import('../layout/AuthLayout.vue'),
    children: [
      {
        path: RoutePath.SignUp,
        name: 'SignUp',
        component: () => import('../pages/sign-up/SignUp.vue'),
      },
      {
        path: RoutePath.SignIn,
        name: 'SignIn',
        component: () => import('../pages/sign-in/SignIn.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
