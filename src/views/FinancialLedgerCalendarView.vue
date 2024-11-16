<script setup>
import { ref } from 'vue'

import Calendar from '@/components/financialLedger/Calendar.vue'

const financialData = ref({
  1: { income: 100000, expense: 50000 },
  2: { income: 0, expense: 25000 },
  3: { income: 50000, expense: 0 },
  4: { income: 200000, expense: 100000 },
  5: { income: 0, expense: 50000 },
  6: { income: 150000, expense: 75000 },
  7: { income: 0, expense: 30000 },
  8: { income: 70000, expense: 20000 },
  9: { income: 0, expense: 5000 },
  10: { income: 120000, expense: 80000 },
  11: { income: 0, expense: 10000 },
  12: { income: 90000, expense: 40000 },
  13: { income: 0, expense: 15000 },
  14: { income: 130000, expense: 95000 },
  15: { income: 0, expense: 35000 },
  16: { income: 200000, expense: 110000 },
  17: { income: 0, expense: 60000 },
  18: { income: 80000, expense: 30000 },
  19: { income: 0, expense: 500000 },
  20: { income: 50000, expense: 0 },
  21: { income: 0, expense: 45000 },
  22: { income: 140000, expense: 85000 },
  23: { income: 0, expense: 25000 },
  24: { income: 160000, expense: 105000 },
  25: { income: 0, expense: 50000 },
  26: { income: 190000, expense: 85000 },
  27: { income: 0, expense: 30000 },
  28: { income: 220000, expense: 115000 },
  29: { income: 0, expense: 40000 },
  30: { income: 180000, expense: 95000 },
})
</script>

<template>
  <div class="calendar-page-container">
    <Calendar :financial-data="financialData" />
  </div>
</template>

<style scoped></style>
