<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import FloatingNav from '@/components/commons/FloatingNav.vue'
import MonthlySummary from '@/components/financialLedger/MonthlySummary.vue'

const route = useRoute()

const isBudget = computed(() => route.meta.isBudget == true)
</script>

<template>
  <div class="page-container">
    <MonthlySummary v-if="!isBudget" />

    <RouterView />

    <FloatingNav class="floating-nav" />
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

.floating-nav {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: max-content;
}
</style>
