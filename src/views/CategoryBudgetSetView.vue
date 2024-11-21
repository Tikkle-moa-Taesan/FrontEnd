<script setup>
import CategoryBudgetForm from '@/components/financialLedger/CategoryBudgetForm.vue'

import { onMounted, ref } from 'vue'

import { getBudgetStatistic } from '@/utils/api'
import router from '@/router'

const totalBudget = ref(0)

// TODO: 저장된 카테고리 예산이 있다면, 해당 값으로 재할당 필요
const categoryBudget = ref({
  foodBudget: 0,
  livingBudget: 0,
  housingCommunicationBudget: 0,
  financeBudget: 0,
  transportationBudget: 0,
  childcareBudget: 0,
  leisureCultureBudget: 0,
  petBudget: 0,
  eventGiftBudget: 0,
})

// TODO: API 연결 필요
const handleBudgetFormSubmit = () => {
  console.log(categoryBudget.value)

  router.push({ name: 'financial-ledger-budget' })
}

onMounted(async () => {
  try {
    const res = await getBudgetStatistic()
    totalBudget.value = res.thisMonthBudget
  } catch (error) {
    console.error('이번 달 예산 금액을 불러오는 데 실패하였습니다.', error)
  }
})
</script>

<template>
  <div class="page-container">
    <CategoryBudgetForm
      v-model="categoryBudget"
      :total-budget="totalBudget"
      @submit-form="handleBudgetFormSubmit"
    />
  </div>
</template>

<style scoped></style>
