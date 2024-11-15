<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import AccountInfo from '@/components/asset/AccountInfo.vue'
import AccountTransaction from '@/components/asset/AccountTransaction.vue'

import { getFreeAccount, getSavingAccount } from '@/utils/api'

const route = useRoute()

const accountType = ref(route.params.type)
const accountId = ref(route.params.id)

const account = ref()

const fetchFreeAccount = async () => {
  try {
    account.value = await getFreeAccount(accountId.value)
  } catch (error) {
    console.error(error)
  }
}

const fetchSavingAccount = async () => {
  try {
    account.value = await getSavingAccount(accountId.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (accountType.value == 'free') fetchFreeAccount()
  else fetchSavingAccount()
})
</script>

<template>
  <div v-if="account" class="page-container">
    <AccountInfo :account-type="accountType" :account-info="account.accountDetail" />
    <AccountTransaction :account-transaction="account.transactions" />
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
