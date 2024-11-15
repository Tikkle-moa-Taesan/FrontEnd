<script setup>
defineProps({
  accountTransaction: Array,
})
</script>

<template>
  <div class="account-transaction-container"></div>
</template>

<style scoped>
.account-transaction-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}
</style>
