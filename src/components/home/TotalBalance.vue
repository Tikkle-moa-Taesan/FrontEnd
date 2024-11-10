<script setup>
import { computed, ref } from 'vue'

const userName = ref('소샤이')

const totalBalance = ref(1234567890)
const formattedTotalBalance = computed(() => totalBalance.value.toLocaleString())
</script>

<template>
  <div class="total-balance-container">
    <div class="info-container">
      <span class="title">{{ userName }}님의 총 자산</span>
      <span class="total-balance">{{ formattedTotalBalance }} 원</span>
    </div>

    <div class="img-container"></div>
  </div>
</template>

<style scoped>
.total-balance-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #74b7f8;
  border-radius: 10px;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-container > span {
  font-weight: 700;
  color: white;
}

.info-container .total-balance {
  font-size: 1.25rem;
}

.img-container {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background-color: white;
}
</style>
