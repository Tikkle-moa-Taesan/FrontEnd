<script setup>
import FreeAccount from './account.vue'

defineProps({
  title: String,
  accounts: Object,
})
</script>

<template>
  <div class="free-accounts-container">
    <h2>{{ title }}</h2>

    <div class="account-list">
      <FreeAccount v-for="account in accounts" :key="account.accountId" :account="account" />
    </div>
  </div>
</template>

<style scoped>
.free-accounts-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}

.free-accounts-container > h2 {
  font-weight: 600;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
