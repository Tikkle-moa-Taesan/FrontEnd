<script setup>
import formatNumber from '@/utils/formatNumber'
</script>

<template>
  <div class="summary-container">
    <span class="title">지난 달 내역</span>

    <div class="income-and-expense">
      <div class="value-container">
        <span>지출</span>
        <span>
          <span class="expense-value"> {{ formatNumber(2000000) }} </span>
          원
        </span>
      </div>
      <div class="value-container">
        <span>수입</span>
        <span>
          <span class="income-value"> {{ formatNumber(1000000) }} </span>
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
  font-size: 1.125rem;
  font-weight: 700;
  color: #646464;
}

.income-and-expense {
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-weight: 600;
}

.value-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #646464;
}

.value-container .expense-value {
  color: #ff3939;
}

.value-container .income-value {
  color: #3396f4;
}
</style>
