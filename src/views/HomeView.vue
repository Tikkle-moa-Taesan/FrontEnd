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

<style scoped></style>
