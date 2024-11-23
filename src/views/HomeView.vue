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
import Loading from '@/components/commons/Loading.vue'

const MINIMUM_LOADING_TIME = 500

const isLoading = ref(true)

const profile = ref(null)
const totalBalance = ref(0)

const freeAccountList = ref([])

const monthlySpending = ref({})
const monthlyBudget = ref({})

onMounted(async () => {
  const startTime = Date.now()

  await postBudgetUpdate()

  profile.value = await getProfile()

  const balance = await getTotalBalance()
  totalBalance.value = balance.total

  freeAccountList.value = await getFreeAccountList()

  monthlySpending.value = await getExpenseStatistic()
  monthlyBudget.value = await getBudgetStatistic()

  const elapsedTime = Date.now() - startTime

  if (elapsedTime < MINIMUM_LOADING_TIME) {
    setTimeout(() => {
      isLoading.value = false
    }, MINIMUM_LOADING_TIME - elapsedTime)
  } else {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="!isLoading" class="page-container">
    <ToTalBalance :profile="profile" :total-balance="totalBalance" />
    <MajorAccounts :free-account-list="freeAccountList" />
    <SpendingStatistic :monthly-spending="monthlySpending" :monthly-budget="monthlyBudget" />
  </div>

  <div v-else class="loading-wrapper">
    <Loading msg="데이터를 불러오고 있어요." />
  </div>
</template>

<style scoped>
.loading-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}
</style>
