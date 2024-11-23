<script setup>
import { onMounted, ref } from 'vue'

import MajorAccounts from '@/components/home/MajorAccounts.vue'
import SpendingStatistic from '@/components/home/SpendingStatistic.vue'
import ToTalBalance from '@/components/home/TotalBalance.vue'

import { getProfile, getTotalBalance, postBudgetUpdate } from '@/utils/api'

const profile = ref(null)
const totalBalance = ref(null)

onMounted(async () => {
  await postBudgetUpdate()

  profile.value = await getProfile()

  const balance = await getTotalBalance()
  totalBalance.value = balance.total
})
</script>

<template>
  <div class="page-container">
    <ToTalBalance :profile="profile" :total-balance="totalBalance" />
    <MajorAccounts />
    <SpendingStatistic />
  </div>
</template>

<style scoped></style>
