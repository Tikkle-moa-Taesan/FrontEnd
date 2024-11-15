<script setup>
import { formatHour } from '@/utils/formatDate'
import formatNumber from '@/utils/formatNumber'

defineProps({
  transaction: Object,
})
</script>

<template>
  <div class="detail-container">
    <div class="description">
      <span>{{ transaction.merchantName }}</span>
      <span class="text-gray">{{ formatHour(transaction.transactionDatetime) }}</span>
    </div>
    <div class="money">
      <span class="spending-money">-{{ formatNumber(transaction.amount) }}</span>
      <span class="text-gray">잔액 {{ formatNumber(transaction.balanceAfter) }}</span>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.money {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.5rem;
}

.text-gray {
  font-size: 0.875rem;
  color: #646464;
}
</style>
