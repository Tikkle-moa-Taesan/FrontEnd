import { createRouter, createWebHistory } from 'vue-router'

import AssetDetailView from '@/views/AssetDetailView.vue'
import AssetView from '@/views/AssetView.vue'
import FinancialLedgerBudgetView from '@/views/FinancialLedgerBudgetView.vue'
import FinancialLedgerCalendarView from '@/views/FinancialLedgerCalendarView.vue'
import FinancialLedgerListView from '@/views/FinancialLedgerListView.vue'
import FinancialLedgerView from '@/views/FinancialLedgerView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginViewKakao from '@/views/LoginViewKakao.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isHome: true,
      },
    },
    {
      path: '/asset',
      name: 'asset',
      component: AssetView,
    },
    {
      path: '/asset/:type/:id',
      name: 'asset-detail',
      component: AssetDetailView,
    },
    {
      path: '/financial-ledger',
      name: 'financial-ledger',
      component: FinancialLedgerView,
      children: [
        { path: 'list', name: 'financial-ledger-list', component: FinancialLedgerListView },
        {
          path: 'calendar',
          name: 'financial-ledger-calendar',
          component: FinancialLedgerCalendarView,
        },
        { path: 'budget', name: 'financial-ledger-budget', component: FinancialLedgerBudgetView },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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
