<script setup>
import { ref } from 'vue'
import FreeAccount from './FreeAccount.vue'

const freeAccounts = ref([
  {
    accountId: 1,
    balance: 1300000,
    bankName: '하나은행',
    accountName: '뱅크월렛 카카오통장',
    difference: -26000,
  },
  {
    accountId: 2,
    balance: 500000,
    bankName: '우리은행',
    accountName: 'WEWE 우리통장',
    difference: 3000,
  },
  {
    accountId: 3,
    balance: 84651254,
    bankName: '카카오뱅크',
    accountName: '어피치 분홍통장',
    difference: 15120,
  },
  {
    accountId: 4,
    balance: 51254,
    bankName: '카카오뱅크',
    accountName: '무지 노란통장',
    difference: -87322,
  },
])
</script>

<template>
  <div class="free-accounts-container">
    <h2>자유 입출금 계좌</h2>

    <div class="account-list">
      <FreeAccount v-for="account in freeAccounts" :key="account.accountId" :account="account" />
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
