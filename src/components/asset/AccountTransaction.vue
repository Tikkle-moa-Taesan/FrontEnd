<script setup>
import { computed } from 'vue'
import AccountTransactionDay from './AccountTransactionDay.vue'

const props = defineProps({
  accountTransaction: Array,
})

const groupingByDate = (transactions) => {
  return transactions.reduce((acc, transactions) => {
    const date = transactions.transactionDatetime

    if (!acc[date]) acc[date] = []

    acc[date].push(transactions)

    return acc
  }, {})
}

const groupedTransaction = computed(() => {
  return groupingByDate(props.accountTransaction)
})
</script>

<template>
  <div
    class="account-transaction-container"
    :class="{ 'no-content': accountTransaction.length == 0 }"
  >
    <AccountTransactionDay
      v-if="accountTransaction.length > 0"
      v-for="(transactions, date) in groupedTransaction"
      :key="date"
      :date="date"
      :transactions="transactions"
    />

    <div v-else class="no-transaction">
      <img class="ghost-img" src="@/assets/images/ghost.png" alt="유령" />
      <span class="msg">아직 거래내역이 없어요</span>
    </div>
  </div>
</template>

<style scoped>
.account-transaction-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}

.no-content {
  flex: 1;
  justify-content: center;
}

.no-transaction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.no-transaction .ghost-img {
  width: 10rem;
}

.no-transaction .msg {
  color: #646464;
}
</style>
