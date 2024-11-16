<script setup>
import { computed, onMounted, ref } from 'vue'
import formatNumber from '@/utils/formatNumber'
import DoughnutGraphSpending from './DoughnutGraphSpending.vue'
import DoughnutGraphBudget from './DoughnutGraphBudget.vue'
import { getBudgetStatistic, getExpenseStatistic } from '@/utils/api'

const fetchExpenseStatistic = async () => {
  try {
    const expenseStatistic = await getExpenseStatistic()
    console.log(expenseStatistic)
  } catch (error) {
    console.error(error)
  }
}

const fetchBudgetStatistic = async () => {
  try {
    const budgetStatistic = await getBudgetStatistic()
    console.log(budgetStatistic)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchExpenseStatistic()
  // fetchBudgetStatistic()
})

// mock data
const monthlyExpenses = ref({
  lastMonthExpense: 1248800,
  thisMonthExpense: 2548600,
  lastWeekExpense: 128000,
  thisWeekExpense: 15485,
  categoryExpense: {
    foodExpense: 200000,
    livingExpense: 350000,
    housingCommunicationExpense: 500000,
    financeExpense: 250000,
    transportationExpense: 85000,
    childcareExpense: 6123,
    leisureCultureExpense: 150000,
    petExpense: 75000,
    eventGiftExpense: 50000,
  },
})

const monthlyBudget = ref({
  thisMonthBudget: 2000000,
  thisMonthExpense: 1600000,
  rate: 80,
})

const monthlyDifference = computed(
  () => monthlyExpenses.value.thisMonthExpense - monthlyExpenses.value.lastMonthExpense,
)

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
      <DoughnutGraphSpending :category-expenses="monthlyExpenses.categoryExpense" />
      <DoughnutGraphBudget :monthly-budget="monthlyBudget" />
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
