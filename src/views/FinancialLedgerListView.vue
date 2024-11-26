<script setup>
import { onMounted, onUnmounted, provide, ref, watch } from 'vue'

import LedgerTransaction from '@/components/financialLedger/LedgerTransaction.vue'

import { getFinancialLedger } from '@/utils/api'

const props = defineProps({
  financialLedgerId: Number,
})

const hasModifyContent = ref(false)
provide('hasModifyContent', hasModifyContent)

const isLoading = ref(true)

const transactions = ref({ budgetTransactions: [] })

const page = ref(0)
const isAvailableScroll = ref(false)
const hasMoreData = ref(true)

const fetchFinancialLedger = async () => {
  if (props.financialLedgerId === undefined) return

  if (isAvailableScroll.value || !hasMoreData.value) return

  isAvailableScroll.value = true

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
    isAvailableScroll.value = false
  }
}

const onScroll = () => {
  const scrollPosition = scrollY + innerHeight
  const bottomPosition = document.documentElement.scrollHeight

  if (scrollPosition >= bottomPosition - 100 && !isAvailableScroll.value) fetchFinancialLedger()
}

onMounted(() => {
  addEventListener('scroll', onScroll)
})

watch(
  () => props.financialLedgerId,
  async () => {
    page.value = 0
    await fetchFinancialLedger()
    isLoading.value = false
  },
  {
    immediate: true,
  },
)

watch(hasModifyContent, async () => {
  await fetchFinancialLedger()

  hasModifyContent.value = false
})

onUnmounted(() => {
  removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="!isLoading">
    <LedgerTransaction :transactions="transactions.budgetTransactions" />
    <div v-if="isAvailableScroll" class="is-loading">loading...</div>
  </div>
</template>

<style scoped>
.is-loading {
  margin: 0.5rem 0;
  color: #646464;
  text-align: center;
}
</style>
