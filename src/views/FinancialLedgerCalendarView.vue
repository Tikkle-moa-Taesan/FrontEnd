<script setup>
import { computed, ref, watch } from 'vue'

import Calendar from '@/components/financialLedger/Calendar.vue'

import { getAllFinancialLedger } from '@/utils/api'
import { formatDate } from '@/utils/formatDate'

const props = defineProps({
  financialLedgerId: Number,
})

const allTransactions = ref([])

const fetchAllFinancialLedger = async () => {
  try {
    const res = await getAllFinancialLedger(props.financialLedgerId)
    console.log(res)
    allTransactions.value = res.budgetTransactions
  } catch (error) {
    console.error('가계부 내역을 불러오는 데 실패하였습니다.', error)
  }
}

const groupingByDate = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const formattedDate = formatDate(transaction.transactionDatetime)

    if (!acc[formattedDate]) acc[formattedDate] = []

    acc[formattedDate].push(transactions)

    return acc
  }, {})
}

const calculatingByDate = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transactionDatetime).getDate()

    if (!acc[date]) acc[date] = { income: 0, expense: 0 }

    if (transaction.transactionType === 'income') acc[date].income += transaction.amount
    else if (transaction.transactionType === 'expense') acc[date].expense += transaction.amount

    return acc
  }, {})
}

const groupedTransaction = computed(() => {
  return groupingByDate(allTransactions?.value || [])
})

const financialData = computed(() => {
  return calculatingByDate(allTransactions?.value || [])
})

watch(
  props,
  () => {
    fetchAllFinancialLedger()
  },
  { immediate: true },
)
</script>

<template>
  <div class="calendar-page-container">
    <Calendar :financial-data="financialData" />
  </div>
</template>

<style scoped></style>
