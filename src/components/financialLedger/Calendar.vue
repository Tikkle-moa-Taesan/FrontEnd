<script setup>
import formatNumber from '@/utils/formatNumber'
import { onMounted, ref, watch } from 'vue'

defineProps({
  financialData: Object,
})

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth())
const dates = ref([])

const updateCalendar = () => {
  const year = selectedYear.value
  const month = selectedMonth.value

  const firstDay = new Date(year, month, 1).getDay() // 당월의 첫 번째 요일
  const lastDate = new Date(year, month + 1, 0).getDate() // 당월의 마지막 날짜

  // 달력에 빈칸 추가
  dates.value = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: lastDate }, (v, k) => k + 1),
  )
}

onMounted(() => {
  updateCalendar()
})

watch([selectedYear, selectedMonth], updateCalendar)
</script>

<template>
  <div class="calendar-container">
    <div class="days">
      <div class="day" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
    </div>
    <div class="dates">
      <div class="date" v-for="date in dates" :key="date">
        <span class="date-value">{{ date }}</span>
        <div class="income-and-expense">
          <span v-if="financialData[date] && financialData[date].expense != 0" class="expense"
            >-{{ formatNumber(financialData[date].expense) }}</span
          >
          <span v-if="financialData[date] && financialData[date].income != 0" class="income"
            >+{{ formatNumber(financialData[date].income) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  padding: 0.5rem 0;
  border-radius: 10px;
  background-color: white;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
}

.day {
  font-size: 0.875rem;
  text-align: center;
  color: #646464;
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.date {
  display: flex;
  flex-direction: column;
  height: 4rem;
}

.date .date-value {
  padding: 0.25rem 0.25rem;
  font-size: 10px;
  text-align: end;
}

.income-and-expense {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.5rem;
  padding: 0.5rem 0.25rem;
}

.expense {
  color: #ff4a4a;
  font-size: 0.5rem;
}

.income {
  color: #3396f4;
  font-size: 0.5rem;
}

.date.null {
  visibility: hidden;
}
</style>
