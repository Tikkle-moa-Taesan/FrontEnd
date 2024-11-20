<script setup>
import { onMounted, ref } from 'vue'

import Account from '@/components/asset/Accounts.vue'
import TotalBalance from '@/components/home/TotalBalance.vue'

import { getFreeAccountList, getSavingAccountList } from '@/utils/api'

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

onMounted(() => {
  fetchFreeAccountList()
  fetchSavingAccountList()
})
</script>

<template>
  <div class="page-container">
    <TotalBalance />
    <Account title="자유 입출금 계좌" :accounts="freeAccountList" />
    <Account title="적금 계좌" :accounts="savingAccountList" />
  </div>
</template>

<style scoped></style>
