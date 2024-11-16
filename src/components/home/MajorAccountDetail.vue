<script setup>
import router from '@/router'
import formatNumber from '@/utils/formatNumber'
import { ref } from 'vue'

const props = defineProps({
  account: Object,
})

const handleAccountClick = () => {
  router.push({ name: 'asset-detail', params: { type: 'free', id: props.account.accountId } })
}

const isPositive = ref(props.account.difference > 0 ? true : false)
</script>

<template>
  <div @click="handleAccountClick" class="account-container">
    <div class="account-info-container">
      <div class="bank-img-container"></div>

      <div class="account-info">
        <span>{{ formatNumber(account.balance) }}원</span>
        <span class="account-name">{{ account.accountName }}</span>
      </div>
    </div>

    <div class="difference">
      <img v-if="isPositive" src="@/assets/icons/triangle-up.png" alt="상향삼각형" />
      <img v-else src="@/assets/icons/triangle-down.png" alt="하향삼각형" />
      <span :class="isPositive ? 'text-blue' : 'text-red'">{{
        formatNumber(account.balanceDifference)
      }}</span>
    </div>
  </div>
</template>

<style scoped>
.account-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-info-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.bank-img-container {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  background-color: #e8e8e8;
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.account-info .account-name {
  color: #646464;
}

.difference {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.difference > img {
  width: 1rem;
  height: 0.875rem;
}
</style>
