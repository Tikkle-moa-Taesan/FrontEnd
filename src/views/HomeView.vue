<script setup>
import { onMounted, ref } from 'vue'

import MajorAccounts from '@/components/home/MajorAccounts.vue'
import SpendingStatistic from '@/components/home/SpendingStatistic.vue'
import ToTalBalance from '@/components/home/TotalBalance.vue'

import {
  getBudgetStatistic,
  getExpenseStatistic,
  getFreeAccountList,
  getProfile,
  getTotalBalance,
  postBudgetUpdate,
} from '@/utils/api'

const isLoading = ref(true)

const profile = ref(null)
const totalBalance = ref(0)

const freeAccountList = ref([])

const monthlySpending = ref({})
const monthlyBudget = ref({})

onMounted(async () => {
  await postBudgetUpdate()

  profile.value = await getProfile()

  const balance = await getTotalBalance()
  totalBalance.value = balance.total

  freeAccountList.value = await getFreeAccountList()

  monthlySpending.value = await getExpenseStatistic()
  monthlyBudget.value = await getBudgetStatistic()

  isLoading.value = false
})
</script>

<template>
  <div class="flex-one">
    <div v-if="!isLoading" class="page-container">
      <ToTalBalance :profile="profile" :total-balance="totalBalance" />
      <MajorAccounts :free-account-list="freeAccountList" />
      <SpendingStatistic :monthly-spending="monthlySpending" :monthly-budget="monthlyBudget" />
    </div>
  </div>
</template>
