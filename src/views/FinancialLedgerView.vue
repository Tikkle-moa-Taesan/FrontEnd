<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import FloatingNav from '@/components/commons/FloatingNav.vue'
import MonthlySummary from '@/components/financialLedger/MonthlySummary.vue'
import Loading from '@/components/commons/Loading.vue'

import { getFinancialLedgerId } from '@/utils/api'
import router from '@/router'

const route = useRoute()

const isBudget = computed(() => route.meta.isBudget == true)

const date = ref([new Date().getFullYear(), new Date().getMonth() + 1])

const financialLedgerInfo = ref(null)
const isEmpty = ref(false)

const fetchFinancialLedgerInfo = async () => {
  try {
    const res = await getFinancialLedgerId(
      `${date.value[0]}${date.value[1].toString().padStart(2, '0')}`,
    )

    if (res === -1) {
      router.push({ name: 'total-budget-set' })
      return
    }

    if (res === 'empty') {
      isEmpty.value = true
      return
    }

    financialLedgerInfo.value = res
    isEmpty.value = false
  } catch (error) {
    console.error('가계부 ID를 불러오는 데 실패하였습니다.', error)
  }
}

watch(
  date,
  () => {
    fetchFinancialLedgerInfo()
  },
  { immediate: true },
)
</script>

<template>
  <div class="page-container">
    <MonthlySummary v-if="!isBudget" v-model="date" :financial-ledger-info="financialLedgerInfo" />

    <div v-if="!isEmpty">
      <RouterView :financial-ledger-id="financialLedgerInfo?.budgetId" />
    </div>
    <div v-else class="empty">
      <Loading msg="가계부 내역이 존재하지 않아요." />
    </div>

    <FloatingNav class="floating-nav" />
  </div>
</template>

<style scoped>
.page-container {
  padding-bottom: 4rem;
}

.floating-nav {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  max-width: calc(430px - 3rem);
}

.empty {
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}
</style>
