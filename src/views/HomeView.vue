<script setup>
import { onMounted } from 'vue'

import MajorAccounts from '@/components/home/MajorAccounts.vue'
import SpendingStatistic from '@/components/home/SpendingStatistic.vue'
import ToTalBalance from '@/components/home/TotalBalance.vue'

import { postBudgetUpdate } from '@/utils/api'

onMounted(async () => {
  try {
    await postBudgetUpdate()
  } catch (error) {
    console.error('가계부 업데이트에 실패하였습니다.', error)
  }
})
</script>

<template>
  <div class="page-container">
    <ToTalBalance />
    <MajorAccounts />
    <SpendingStatistic />
  </div>
</template>

<style scoped></style>
