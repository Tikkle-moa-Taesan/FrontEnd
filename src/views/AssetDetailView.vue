<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AccountInfo from '@/components/asset/AccountInfo.vue'
import AccountTransaction from '@/components/asset/AccountTransaction.vue'
import FilterModal from '@/components/financialLedger/FilterModal.vue'

import { postFreeAccount, postSavingAccount } from '@/utils/api'

const route = useRoute()

const isModalShown = ref(false)

const accountType = ref(route.params.type)
const accountId = ref(route.params.id)

const account = ref({ accountDetail: {}, transactions: [] })

const filterCondition = ref({
  period: 0,
  transactionType: null,
})

const periodText = computed(() => {
  switch (filterCondition.value.period) {
    case 0:
      return '이번 달'
    case 3:
      return '3개월'
    case 6:
      return '6개월'
  }
})

const transactionTypeText = computed(() => {
  switch (filterCondition.value.transactionType) {
    case null:
      return '입출금 전체'
    case 'expense':
      return '출금만'
    case 'income':
      return '입금만'
  }
})

const page = ref(0)

const isLoading = ref(false)
const hasMoreData = ref(true)

const handleInfiniteScroll = async (fetchFunction) => {
  if (isLoading.value || !hasMoreData.value) return

  isLoading.value = true

  try {
    const res = await fetchFunction(accountId.value, page.value, filterCondition.value)

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
  const fetchFunction = accountType.value === 'free' ? postFreeAccount : postSavingAccount

  await handleInfiniteScroll(fetchFunction)
}

const onScroll = () => {
  const scrollPosition = scrollY + innerHeight
  const bottomPosition = document.documentElement.scrollHeight

  if (scrollPosition >= bottomPosition - 100 && !isLoading.value) fetchAccount()
}

const handleSettingClick = () => {
  isModalShown.value = true
}

const handleSettingBtnClick = (condition) => {
  filterCondition.value = condition

  if (condition.transactionType === 'null') filterCondition.value.transactionType = null

  isModalShown.value = false
}

const handleCloseIconClick = () => {
  isModalShown.value = false
}

onMounted(() => {
  fetchAccount()

  addEventListener('scroll', onScroll)
})

watch(filterCondition, async () => {
  page.value = 0
  account.value.transactions = []
  hasMoreData.value = true

  await fetchAccount()
})

onUnmounted(() => {
  removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="account" class="page-container">
    <AccountInfo :account-info="account.accountDetail" :account-type="accountType" />

    <div class="transactions-container">
      <div class="filter-container">
        <div class="filter-text">{{ transactionTypeText }} | {{ periodText }}</div>
        <img
          alt="설정"
          class="setting-icon"
          src="@/assets/icons/setting.png"
          @click="handleSettingClick"
        />
      </div>
      <AccountTransaction :account-transaction="account.transactions" />
    </div>
    <div v-if="isLoading" class="is-loading">loading...</div>
  </div>

  <div v-if="isModalShown" class="modal-wrapper">
    <FilterModal ref="modalRef" @click="handleSettingBtnClick" @closeModal="handleCloseIconClick" />
  </div>
</template>

<style scoped>
.is-loading {
  margin: 0.5rem 0;
  color: #646464;
  text-align: center;
}

.transactions-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-text {
  font-size: 14px;
  color: #646464;
}

.setting-icon {
  width: 1.25rem;
}

.modal-wrapper {
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 430px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
</style>
