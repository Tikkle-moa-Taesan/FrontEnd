<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import { getCategoryBudget, getExpenseStatistic } from '@/utils/api'
import formatNumber from '@/utils/formatNumber'

const CATEGORIES = {
  food: '식비',
  living: '생활',
  housingCommunication: '주거/통신',
  finance: '금융',
  transportation: '교통',
  childcare: '육아',
  leisureCulture: '문화/여가',
  pet: '반려동물',
  eventGift: '경조/선물',
}

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

const categoryExpense = ref({
  foodExpense: 0,
  livingExpense: 0,
  housingCommunicationExpense: 0,
  financeExpense: 0,
  transportationExpense: 0,
  childcareExpense: 0,
  leisureCultureExpense: 0,
  petExpense: 0,
  eventGiftExpense: 0,
})

const categoryRest = computed(() => {
  return Object.keys(CATEGORIES).reduce((acc, key) => {
    acc[key] = categoryBudget.value[`${key}Budget`] - categoryExpense.value[`${key}Expense`]

    return acc
  }, {})
})

const categoryExpenseRatio = computed(() => {
  return Object.keys(CATEGORIES).reduce((acc, key) => {
    let budget = categoryBudget.value[`${key}Budget`]
    const expense = categoryExpense.value[`${key}Expense`]

    if (budget === 0) acc[key] = 100
    else acc[key] = Math.min((expense / budget) * 100, 100)

    return acc
  }, {})
})

const progress = ref(
  Object.keys(CATEGORIES).reduce((acc, key) => {
    acc[key] = 0

    return acc
  }, {}),
)

const fetchCategoryBudget = async () => {
  try {
    categoryBudget.value = await getCategoryBudget()
  } catch (error) {
    console.error('카테고리 별 예산 조회에 실패하였습니다.', error)
  }
}

const fetchCategoryExpense = async () => {
  try {
    const res = await getExpenseStatistic()

    categoryExpense.value = res.categoryExpense
  } catch (error) {
    console.error('카테고리 별 지출 조회에 실패하였습니다.', error)
  }
}

const animateProgress = (key, rate) => {
  let currRate = 0

  const interval = setInterval(() => {
    if (currRate >= rate) {
      clearInterval(interval)
    } else {
      currRate++
      progress.value[key] = currRate
    }
  }, 10)
}

watch(categoryExpenseRatio, (newValue) => {
  Object.keys(CATEGORIES).forEach((key) => {
    animateProgress(key, newValue[key])
  })
})

onMounted(() => {
  fetchCategoryBudget()
  fetchCategoryExpense()
})
</script>

<template>
  <div class="budget-info-container">
    <span class="title">카테고리 별 사용 예산</span>

    <div class="expense-ratio-container">
      <div class="category-container" v-for="(category, key) in CATEGORIES" :key="category">
        <div class="info-container">
          <div class="category-info">
            <span>{{ category }}</span>
            <div class="rest-value">
              {{ formatNumber(categoryRest[key]) }}원
              <span v-if="categoryRest[key] >= 0">남음</span>
              <span v-else>초과</span>
            </div>
          </div>
          <span>{{ categoryExpenseRatio[key] }}%</span>
        </div>
        <div class="budget-bar-container">
          <div
            class="expense-bar"
            :style="{ width: progress[key] + '%' }"
            :class="{
              'is-red': progress[key] >= 90,
              'is-green': progress[key] >= 80,
              'is-blue': progress[key] >= 20,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.budget-info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}

.title {
  font-weight: 700;
}

.expense-ratio-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.category-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-container {
  display: flex;
  justify-content: space-between;
}

.category-info {
  display: flex;
  gap: 0.5rem;
}

.rest-value {
  font-size: 0.875rem;
  color: #646464;
}

.budget-bar-container {
  position: relative;
  height: 0.75rem;
  border-radius: 999px;
  background-color: #d9d9d9;
  overflow: hidden;
}

.expense-bar {
  height: 100%;
  background-color: #a5a5a5;
  transition: width 0.3s ease-out;
}

.is-blue {
  background-color: #3396f4;
}

.is-green {
  background-color: #afd79d;
}

.is-red {
  background-color: #ff5858;
}
</style>
