import HomeView from '@/views/HomeView.vue'
import LoginVIew from '@/views/LoginVIew.vue'
import LoginViewKakao from '@/views/LoginViewKakao.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/login',
      name: 'login',
      component: LoginVIew,
      meta: { layout: 'none' },
    },
    {
      path: '/login/kakao/code',
      name: 'login-kakao',
      component: LoginViewKakao,
      meta: { layout: 'none' },
    },
  ],
})

export default router
