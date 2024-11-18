<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import AccountInfo from '@/components/asset/AccountInfo.vue'
import AccountTransaction from '@/components/asset/AccountTransaction.vue'

import { getFreeAccount, getSavingAccount } from '@/utils/api'

const route = useRoute()

const accountType = ref(route.params.type)
const accountId = ref(route.params.id)

const account = ref({ accountDetail: {}, transactions: [] })

const page = ref(0)

const isLoading = ref(false)
const hasMoreData = ref(true)

const handleInfiniteScroll = async (fetchFunction) => {
  if (isLoading.value || !hasMoreData.value) return

  isLoading.value = true

  try {
    const res = await fetchFunction(accountId.value, page.value)

    if (page.value === 0) account.value.accountDetail = res.accountDetail

    if (res.transactions.length === 0) {
      hasMoreData.value = false
      return
    }

    account.value.transactions.push(...res.transactions)

    page.value++
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const fetchAccount = async () => {
  const fetchFunction = accountType.value === 'free' ? getFreeAccount : getSavingAccount

  await handleInfiniteScroll(fetchFunction)
}

const onScroll = () => {
  const scrollPosition = scrollY + innerHeight
  const bottomPosition = document.documentElement.scrollHeight

  if (scrollPosition >= bottomPosition - 100 && !isLoading.value) fetchAccount()
}

onMounted(() => {
  fetchAccount()

  addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="account" class="page-container">
    <AccountInfo :account-type="accountType" :account-info="account.accountDetail" />
    <AccountTransaction :account-transaction="account.transactions" />
    <div v-if="isLoading" class="is-loading">loading...</div>
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

.is-loading {
  margin: 0.5rem 0;
  color: #646464;
  text-align: center;
}
</style>
