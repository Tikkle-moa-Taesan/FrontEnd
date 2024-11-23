<script setup>
import { onMounted, ref } from 'vue'

import Account from '@/components/asset/Accounts.vue'
import TotalBalance from '@/components/home/TotalBalance.vue'
import Loading from '@/components/commons/Loading.vue'

import { getFreeAccountList, getProfile, getSavingAccountList, getTotalBalance } from '@/utils/api'

const MINIMUM_LOADING_TIME = 500

const isLoading = ref(true)

const profile = ref(null)
const totalBalance = ref(null)

const freeAccountList = ref()
const savingAccountList = ref()

onMounted(async () => {
  const startTime = Date.now()

  profile.value = await getProfile()

  const balance = await getTotalBalance()
  totalBalance.value = balance.total

  freeAccountList.value = await getFreeAccountList()
  savingAccountList.value = await getSavingAccountList()

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
  <Transition name="content">
    <div v-if="!isLoading" class="page-container">
      <TotalBalance :profile="profile" :total-balance="totalBalance" />
      <Account title="자유 입출금 계좌" :accounts="freeAccountList" />
      <Account title="적금 계좌" :accounts="savingAccountList" />
    </div>
  </Transition>

  <Transition name="loading">
    <div v-if="isLoading" class="loading-wrapper">
      <Loading msg="데이터를 가져오고 있어요." />
    </div>
  </Transition>
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

.content-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}

.content-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
