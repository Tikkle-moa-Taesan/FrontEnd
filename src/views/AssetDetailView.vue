<script setup>
import { ref } from 'vue'
import AccountInfo from '@/components/asset/AccountInfo.vue'
import { useRoute } from 'vue-router'
import AccountTransaction from '@/components/asset/AccountTransaction.vue'

const route = useRoute()
const accountId = ref(route.params.id)

const accountInfo = ref({
  accountId: 1,
  balance: 7730000,
  bankName: '하나은행',
  difference: 50000,
  maturityDate: '2025-11-12',
  interestRate: 4.3,
  accountNumber: '112-543822-11-523',
  accountName: '뱅크월렛 카카오통장',
  transactions: [
    {
      transactionId: 1,
      categoryName: 'Groceries',
      transactionDatetime: '2024-11-15T04:36:01.830Z',
      amount: 50,
      balanceAfter: 4950,
      merchantName: 'Supermarket A',
    },
    {
      transactionId: 2,
      categoryName: 'Dining',
      transactionDatetime: '2024-11-14T10:12:45.123Z',
      amount: 30,
      balanceAfter: 4920,
      merchantName: 'Restaurant B',
    },
    {
      transactionId: 3,
      categoryName: 'Utilities',
      transactionDatetime: '2024-11-13T08:05:34.456Z',
      amount: 120,
      balanceAfter: 4800,
      merchantName: 'Electric Company',
    },
    {
      transactionId: 4,
      categoryName: 'Transportation',
      transactionDatetime: '2024-11-12T18:24:22.789Z',
      amount: 15,
      balanceAfter: 4785,
      merchantName: 'Taxi Service',
    },
    {
      transactionId: 5,
      categoryName: 'Entertainment',
      transactionDatetime: '2024-11-11T21:42:11.110Z',
      amount: 40,
      balanceAfter: 4745,
      merchantName: 'Cinema',
    },
    {
      transactionId: 6,
      categoryName: 'Groceries',
      transactionDatetime: '2024-11-10T14:23:56.220Z',
      amount: 60,
      balanceAfter: 4685,
      merchantName: 'Supermarket C',
    },
    {
      transactionId: 7,
      categoryName: 'Dining',
      transactionDatetime: '2024-11-09T12:15:30.330Z',
      amount: 25,
      balanceAfter: 4660,
      merchantName: 'Cafe D',
    },
    {
      transactionId: 8,
      categoryName: 'Shopping',
      transactionDatetime: '2024-11-08T17:04:45.440Z',
      amount: 100,
      balanceAfter: 4560,
      merchantName: 'Mall E',
    },
    {
      transactionId: 9,
      categoryName: 'Transportation',
      transactionDatetime: '2024-11-07T09:35:12.550Z',
      amount: 15,
      balanceAfter: 4545,
      merchantName: 'Subway',
    },
    {
      transactionId: 10,
      categoryName: 'Health',
      transactionDatetime: '2024-11-06T11:25:34.660Z',
      amount: 80,
      balanceAfter: 4465,
      merchantName: 'Pharmacy F',
    },
    {
      transactionId: 11,
      categoryName: 'Groceries',
      transactionDatetime: '2024-11-05T15:36:28.770Z',
      amount: 45,
      balanceAfter: 4420,
      merchantName: 'Market G',
    },
    {
      transactionId: 12,
      categoryName: 'Dining',
      transactionDatetime: '2024-11-04T19:30:56.880Z',
      amount: 20,
      balanceAfter: 4400,
      merchantName: 'Restaurant H',
    },
    {
      transactionId: 13,
      categoryName: 'Shopping',
      transactionDatetime: '2024-11-03T16:45:20.990Z',
      amount: 150,
      balanceAfter: 4250,
      merchantName: 'Store I',
    },
    {
      transactionId: 14,
      categoryName: 'Transportation',
      transactionDatetime: '2024-11-02T07:50:41.123Z',
      amount: 10,
      balanceAfter: 4240,
      merchantName: 'Bus',
    },
    {
      transactionId: 15,
      categoryName: 'Entertainment',
      transactionDatetime: '2024-11-01T20:33:10.234Z',
      amount: 30,
      balanceAfter: 4210,
      merchantName: 'Concert',
    },
    {
      transactionId: 16,
      categoryName: 'Groceries',
      transactionDatetime: '2024-10-31T13:47:09.345Z',
      amount: 70,
      balanceAfter: 4140,
      merchantName: 'Supermarket J',
    },
    {
      transactionId: 17,
      categoryName: 'Dining',
      transactionDatetime: '2024-10-30T12:21:40.456Z',
      amount: 35,
      balanceAfter: 4105,
      merchantName: 'Cafe K',
    },
    {
      transactionId: 18,
      categoryName: 'Utilities',
      transactionDatetime: '2024-10-29T09:10:15.567Z',
      amount: 110,
      balanceAfter: 3995,
      merchantName: 'Water Company',
    },
    {
      transactionId: 19,
      categoryName: 'Health',
      transactionDatetime: '2024-10-28T18:25:50.678Z',
      amount: 90,
      balanceAfter: 3905,
      merchantName: 'Clinic L',
    },
    {
      transactionId: 20,
      categoryName: 'Transportation',
      transactionDatetime: '2024-10-27T08:56:30.789Z',
      amount: 20,
      balanceAfter: 3885,
      merchantName: 'Train',
    },
  ],
})
</script>

<template>
  <div class="page-container">
    <AccountInfo :account-info="accountInfo" />
    <AccountTransaction :account-transaction="accountInfo.transactions" />
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
