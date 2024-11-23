<script setup>
import { onMounted, ref } from 'vue'

import Account from '@/components/asset/Accounts.vue'
import TotalBalance from '@/components/home/TotalBalance.vue'

import { getFreeAccountList, getSavingAccountList } from '@/utils/api'
import Loading from '@/components/commons/Loading.vue'

const isLoading = ref(true)

const MINIMUM_LOADING_TIME = 500

const freeAccountList = ref()
const savingAccountList = ref()

const fetchFreeAccountList = async () => {
  try {
    freeAccountList.value = await getFreeAccountList()
  } catch (error) {
    console.error('자유 입출금 계좌 데이터를 불러오는 데 실패하였습니다.', error)
  }
}

const fetchSavingAccountList = async () => {
  try {
    savingAccountList.value = await getSavingAccountList()
  } catch (error) {
    console.error('적금 계좌 데이터를 불러오는 데 실패하였습니다.', error)
  }
}

onMounted(async () => {
  const startTime = Date.now()

  await fetchFreeAccountList()
  await fetchSavingAccountList()

  const elapsedTime = Date.now() - startTime

  if (elapsedTime < MINIMUM_LOADING_TIME) {
    setTimeout(() => {
      isLoading.value = false
    }, MINIMUM_LOADING_TIME - elapsedTime)
  } else {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="!isLoading" class="page-container">
    <TotalBalance />
    <Account title="자유 입출금 계좌" :accounts="freeAccountList" />
    <Account title="적금 계좌" :accounts="savingAccountList" />
  </div>

  <div v-else class="loading-wrapper">
    <Loading msg="데이터를 가져오고 있어요." />
  </div>
</template>

<style scoped>
.loading-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1.5rem;
  background-color: #f2f2f2;
  border-radius: 10px;
}
</style>
