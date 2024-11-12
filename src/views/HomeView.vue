<script setup>
import MajorAccounts from '@/components/home/MajorAccounts.vue'
import SpendingStatistic from '@/components/home/SpendingStatistic.vue'
import ToTalBalance from '@/components/home/TotalBalance.vue'
</script>

<template>
  <div class="page-container">
    <ToTalBalance />
    <MajorAccounts />
    <SpendingStatistic />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
  background-color: #f2f2f2;
}
</style>
