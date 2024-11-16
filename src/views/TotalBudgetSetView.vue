<script setup>
import LastMonthSummary from '@/components/financialLedger/LastMonthSummary.vue'
</script>

<template>
  <div class="page-container">
    <LastMonthSummary />
  </div>
</template>

<style scoped>
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
  background-color: #f2f2f2;
}
</style>
