<script setup>
import { onMounted, ref } from 'vue'

import Account from '@/components/asset/Accounts.vue'
import TotalBalance from '@/components/home/TotalBalance.vue'

import { getFreeAccountList, getProfile, getSavingAccountList, getTotalBalance } from '@/utils/api'

const profile = ref(null)
const totalBalance = ref(null)

const freeAccountList = ref()
const savingAccountList = ref()

onMounted(async () => {
  profile.value = await getProfile()

  const balance = await getTotalBalance()
  totalBalance.value = balance.total

  freeAccountList.value = await getFreeAccountList()
  savingAccountList.value = await getSavingAccountList()
})
</script>

<template>
  <div class="page-container">
    <TotalBalance :profile="profile" :total-balance="totalBalance" />
    <Account title="자유 입출금 계좌" :accounts="freeAccountList" />
    <Account title="적금 계좌" :accounts="savingAccountList" />
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
