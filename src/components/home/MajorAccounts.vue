<script setup>
import { computed, onMounted, ref } from 'vue'
import MajorAccountDetail from './MajorAccountDetail.vue'
import formatNumber from '@/utils/formatNumber'
import { getFreeAccountList } from '@/utils/api'

const freeAccountList = ref()

const fetchFreeAccountList = async () => {
  try {
    freeAccountList.value = await getFreeAccountList()
  } catch (error) {
    console.error('자유 입출금 계좌 데이터를 불러오는 데 실패했습니다.', error)
  }
}

onMounted(fetchFreeAccountList)

const majorAccountList = computed(() => {
  return freeAccountList.value ? freeAccountList.value.slice(0, 3) : []
})

const restAccountList = computed(() => {
  return freeAccountList.value ? freeAccountList.value.slice(3) : []
})

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
