<script setup>
import { ref } from 'vue'

import formatNumber from '@/utils/formatNumber'

defineProps({
  financialLedgerInfo: Object,
})

const month = ref(new Date().getMonth() + 1)
</script>

<template>
  <div class="summary-container">
    <div class="title">
      <span> {{ month }}월 내역 </span>
      <img class="arrow-img" src="@/assets/icons/arrow-down.png" alt="화살표" />
    </div>

    <div class="income-and-expense">
      <div class="value-container">
        <span>지출</span>
        <span>
          <span class="expense-value">
            {{ formatNumber(financialLedgerInfo?.monthExpense || 0) }}
          </span>
          원
        </span>
      </div>
      <div class="value-container">
        <span>수입</span>
        <span>
          <span class="income-value">
            {{ formatNumber(financialLedgerInfo?.monthIncome || 0) }}
          </span>
          원
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.summary-container .title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.summary-container .arrow-img {
  width: 1rem;
  height: 0.7rem;
}

.income-and-expense {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-weight: 500;
}

.value-container {
  display: flex;
  gap: 1rem;
}

.value-container .expense-value {
  color: #ff3939;
}

.value-container .income-value {
  color: #3396f4;
}
</style>
