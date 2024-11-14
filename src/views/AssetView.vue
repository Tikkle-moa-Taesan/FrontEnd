<script setup>
import { ref } from 'vue'

import Account from '@/components/asset/Accounts.vue'
import TotalBalance from '@/components/home/TotalBalance.vue'

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

const savingAccount = ref([
  {
    accountId: 1,
    balance: 300000,
    bankName: '하나은행',
    difference: 50000,
    maturityDate: '2025-11-12T06:07:35.718Z',
    interestRate: 4.3,
    accountName: '하나 적금통장',
  },
  {
    accountId: 2,
    balance: 5000000,
    bankName: '우리은행',
    difference: 50000,
    maturityDate: '2025-02-12T06:07:35.718Z',
    interestRate: 3.2,
    accountName: '우리우리 적금통장',
  },
  {
    accountId: 3,
    balance: 770000,
    bankName: '카카오은행',
    difference: 50000,
    maturityDate: '2026-04-13T06:07:35.718Z',
    interestRate: 3.7,
    accountName: '피치피치 적금통장',
  },
])
</script>

<template>
  <div class="page-container">
    <TotalBalance />
    <Account title="자유 입출금 계좌" :accounts="freeAccounts" />
    <Account title="적금 계좌" :accounts="savingAccount" />
  </div>
</template>

<style scoped>
.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem;
  background-color: #f2f2f2;
}
</style>
