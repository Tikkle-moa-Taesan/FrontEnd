<script setup>
import CategoryBudgetInfo from '@/components/financialLedger/CategoryBudgetInfo.vue'
import LineGraphBudget from '@/components/financialLedger/LineGraphBudget.vue'
import TotalBudgetInfo from '@/components/financialLedger/TotalBudgetInfo.vue'
</script>

<template>
  <div class="budget-page-container">
    <LineGraphBudget center-text="" />

    <TotalBudgetInfo />

    <CategoryBudgetInfo />
  </div>
</template>

<style scoped>
.budget-page-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
