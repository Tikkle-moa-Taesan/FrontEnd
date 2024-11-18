<script setup>
import { computed, onMounted, ref } from 'vue'

import DoughnutGraphSpending from './DoughnutGraphSpending.vue'
import DoughnutGraphBudget from './DoughnutGraphBudget.vue'

import formatNumber from '@/utils/formatNumber'
import { getBudgetStatistic, getExpenseStatistic } from '@/utils/api'

const monthlySpending = ref(null)
const monthlyBudget = ref(null)

const fetchExpenseStatistic = async () => {
  try {
    const expenseStatistic = await getExpenseStatistic()
    monthlySpending.value = expenseStatistic
  } catch (error) {
    console.error(error)
  }
}

const fetchBudgetStatistic = async () => {
  try {
    const budgetStatistic = await getBudgetStatistic()
    monthlyBudget.value = budgetStatistic
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchExpenseStatistic()
  fetchBudgetStatistic()
})

const monthlyDifference = computed(() => {
  if (!monthlySpending.value) return 0

  return monthlySpending.value.thisMonthExpense - monthlySpending.value.lastMonthExpense
})

const differenceString = computed(() => (monthlyDifference.value > 0 ? '적게' : '많이'))
</script>

<template>
  <div class="spending-statistic-container">
    <h2>지출 통계</h2>

    <p class="difference-info">
      지난 달보다
      <span class="difference" :class="monthlyDifference > 0 ? 'text-blue' : 'text-red'">
        {{ formatNumber(monthlyDifference) }} </span
      >원 <span>{{ differenceString }}</span> 사용했어요.
    </p>

    <div class="graph-container">
      <DoughnutGraphSpending
        :category-expenses="monthlySpending?.categoryExpense"
        center-text="지출"
      />
      <DoughnutGraphBudget :monthly-budget="monthlyBudget" center-text="예산" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 600;
}

.spending-statistic-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}

.difference-info {
  color: #646464;
}

.difference {
  font-weight: 700;
}

.graph-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
