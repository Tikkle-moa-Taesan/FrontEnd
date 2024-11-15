<script setup>
import { Doughnut } from 'vue-chartjs'
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import { computed, ref } from 'vue'

const props = defineProps({
  monthlyBudget: Object,
})

const restBudget = computed(
  () => props.monthlyBudget.thisMonthBudget - props.monthlyBudget.thisMonthExpense,
)

Chart.register(ArcElement, Tooltip, Legend)

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const ctx = chart.ctx
    const { width, height } = chart.chartArea
    ctx.save()
    ctx.font = '14px Poppins'
    ctx.fillStyle = '#646464'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('예산', width / 2, height / 2)
    ctx.restore()
  },
}

const chartLabels = ref(['남은 예산', '지출'])

const chartData = ref({
  labels: chartLabels.value,
  datasets: [
    {
      data: [restBudget.value, props.monthlyBudget.thisMonthExpense],
      backgroundColor: ['#36A2EB', '#646464'],
      hoverBackgroundColor: ['#36A2EB', '#646464'],
    },
  ],
})

const chartOptions = ref({
  maintainAspectRatio: false,
  radius: 100,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    centerText: {},
  },
})

Chart.register(centerTextPlugin)
</script>

<template>
  <div class="doughnut-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.doughnut-container {
  background-color: #f2f2f2;
  border-radius: 10px;
}
</style>
