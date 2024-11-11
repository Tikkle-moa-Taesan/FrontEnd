<script setup>
import { computed, ref } from 'vue'
import MajorAccountDetail from './MajorAccountDetail.vue'
import formatNumber from '@/utils/formatNumber'

const response = ref([
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
    bankName: '은행1',
    accountName: '통장1',
    difference: -87322,
  },
  {
    accountId: 5,
    balance: 394554,
    bankName: '은행2',
    accountName: '통장2',
    difference: 15120,
  },
  {
    accountId: 6,
    balance: 1963552,
    bankName: '은행3',
    accountName: '통장3',
    difference: 15120,
  },
])

const majorAccountList = computed(() => response.value.slice(0, 3))
const restAccountList = computed(() => response.value.slice(3))

const restTotalBalance = computed(() =>
  restAccountList.value.reduce((sum, account) => sum + account.balance, 0),
)
</script>

<template>
  <div class="major-accounts-container">
    <h2>자유 입출금 계좌</h2>

    <span>전날 대비</span>

    <div class="account-list">
      <MajorAccountDetail
        v-for="account in majorAccountList"
        :key="account.accountId"
        :account="account"
      />

      <div class="rest-info-container">
        <img class="etc-img" src="@/assets/images/etc.png" alt="기타" />
        <div class="rest-info">
          <span>{{ formatNumber(restTotalBalance) }} 원</span>
          <span class="rest-count">그 외 {{ restAccountList.length }}개</span>
        </div>
      </div>
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

.rest-info-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.rest-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rest-info .rest-count {
  color: #646464;
}

.etc-img {
  width: 2.75rem;
  height: 2.75rem;
}
</style>
