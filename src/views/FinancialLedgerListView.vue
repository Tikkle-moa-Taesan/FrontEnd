<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

import LedgerTransaction from '@/components/financialLedger/LedgerTransaction.vue'

import { getFinancialLedger } from '@/utils/api'

const props = defineProps({
  financialLedgerId: Number,
})

const transactions = ref({ budgetTransactions: [] })

const page = ref(0)

const isLoading = ref(false)
const hasMoreData = ref(true)

const fetchFinancialLedger = async () => {
  if (props.financialLedgerId === undefined) return

  if (isLoading.value || !hasMoreData.value) return

  isLoading.value = true

  try {
    const res = await getFinancialLedger(props.financialLedgerId, page.value)

    if (res.budgetTransactions.length === 0) {
      hasMoreData.value = false
      return
    }

    transactions.value.budgetTransactions.push(...res.budgetTransactions)

    page.value++
  } catch (error) {
    console.error('가계부 내역을 불러오는 데 실패하였습니다.', error)
  } finally {
    isLoading.value = false
  }
}

const onScroll = () => {
  const scrollPosition = scrollY + innerHeight
  const bottomPosition = document.documentElement.scrollHeight

  if (scrollPosition >= bottomPosition - 100 && !isLoading.value) fetchFinancialLedger()
}

onMounted(() => {
  addEventListener('scroll', onScroll)
})

watch(
  () => props.financialLedgerId,
  () => fetchFinancialLedger(),
)

onUnmounted(() => {
  removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <LedgerTransaction :transactions="transactions.budgetTransactions" />
    <div v-if="isLoading" class="is-loading">loading...</div>
  </div>
</template>

<style scoped>
.is-loading {
  margin: 0.5rem 0;
  color: #646464;
  text-align: center;
}
</style>
