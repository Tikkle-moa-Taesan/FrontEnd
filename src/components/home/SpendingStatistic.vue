<script setup>
import formatNumber from '@/utils/formatNumber'
import { computed, ref } from 'vue'
import DoughnutGraphSpending from './DoughnutGraphSpending.vue'
import DoughnutGraphBudget from './DoughnutGraphBudget.vue'

const monthlyExpenses = ref({
  lastMonthTotal: 1248800,
  thisMonthTotal: 2548600,
  category: {
    food: 200000,
    living: 350000,
    housingCommunication: 500000,
    finance: 250000,
    transportation: 85000,
    childcare: 0,
    leisureCulture: 150000,
    pet: 75000,
    eventGift: 50000,
  },
})

const monthlyBudget = ref({
  monthBudget: 2000000,
  monthExpense: 1600000,
})

const monthlyDifference = computed(
  () => monthlyExpenses.value.thisMonthTotal - monthlyExpenses.value.lastMonthTotal,
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
      <DoughnutGraphSpending :monthly-expenses="monthlyExpenses" />
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
