import { createRouter, createWebHistory } from 'vue-router'

import AssetDetailView from '@/views/AssetDetailView.vue'
import AssetView from '@/views/AssetView.vue'
import CategoryBudgetSetView from '@/views/CategoryBudgetSetView.vue'
import FinancialLedgerBudgetView from '@/views/FinancialLedgerBudgetView.vue'
import FinancialLedgerCalendarView from '@/views/FinancialLedgerCalendarView.vue'
import FinancialLedgerListView from '@/views/FinancialLedgerListView.vue'
import FinancialLedgerView from '@/views/FinancialLedgerView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginViewKakao from '@/views/LoginViewKakao.vue'
import TotalBudgetSetView from '@/views/TotalBudgetSetView.vue'

import { postBudgetUpdate } from '@/utils/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        header: 'home',
      },
    },
    {
      path: '/asset',
      name: 'asset',
      component: AssetView,
      meta: {
        header: 'home',
      },
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
      meta: {
        header: 'home',
      },
      children: [
        {
          path: 'list',
          name: 'financial-ledger-list',
          component: FinancialLedgerListView,
          beforeEnter: async () => {
            await postBudgetUpdate()
          },
        },
        {
          path: 'calendar',
          name: 'financial-ledger-calendar',
          component: FinancialLedgerCalendarView,
          beforeEnter: async () => {
            await postBudgetUpdate()
          },
        },
        {
          path: 'budget',
          name: 'financial-ledger-budget',
          component: FinancialLedgerBudgetView,
          beforeEnter: async () => {
            await postBudgetUpdate()
          },
          meta: { isBudget: true },
        },
      ],
    },
    {
      path: '/budget/set/total',
      name: 'total-budget-set',
      component: TotalBudgetSetView,
      meta: { isBudget: true },
    },
    {
      path: '/budget/set/category',
      name: 'category-budget-set',
      component: CategoryBudgetSetView,
      meta: { isBudget: true },
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
