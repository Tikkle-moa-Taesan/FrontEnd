<script setup>
import { ref } from 'vue'
import MajorAccountDetail from './MajorAccountDetail.vue'

const accounts = ref([
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
])
</script>

<template>
  <div class="major-accounts-container">
    <h2>자유 입출금 계좌</h2>

    <span>전날 대비</span>

    <div class="account-list">
      <MajorAccountDetail v-for="account in accounts" :key="account.accountId" :account="account" />
    </div>
  </div>
</template>

<style scoped>
.major-accounts-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
}

.major-accounts-container > h2 {
  font-weight: 600;
}

.major-accounts-container > span {
  text-align: end;
  font-size: 0.875rem;
  color: #646464;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
