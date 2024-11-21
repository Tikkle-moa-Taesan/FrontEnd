<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import FloatingNav from '@/components/commons/FloatingNav.vue'
import MonthlySummary from '@/components/financialLedger/MonthlySummary.vue'

import { getFinancialLedgerId } from '@/utils/api'
import router from '@/router'

const route = useRoute()

const isBudget = computed(() => route.meta.isBudget == true)

const date = ref(`${new Date().getFullYear()}${new Date().getMonth() + 1}`)

const financialLedgerInfo = ref(null)

const fetchFinancialLedgerInfo = async () => {
  try {
    financialLedgerInfo.value = await getFinancialLedgerId(date.value)

    if (financialLedgerInfo.value === -1) router.push({ name: 'total-budget-set' })
  } catch (error) {
    console.error('가계부 ID를 불러오는 데 실패하였습니다.', error)
  }
}

onMounted(() => {
  fetchFinancialLedgerInfo()
})
</script>

<template>
  <div class="page-container">
    <MonthlySummary v-if="!isBudget" :financial-ledger-info="financialLedgerInfo" />

    <RouterView :financial-ledger-id="financialLedgerInfo?.budgetId" />

    <FloatingNav class="floating-nav" />
  </div>
</template>

<style scoped>
.floating-nav {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  max-width: calc(430px - 3rem);
}
</style>
