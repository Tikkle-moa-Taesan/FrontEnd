<script setup>
import { Doughnut } from 'vue-chartjs'
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js'
import { computed, ref } from 'vue'

const props = defineProps({
  monthlyExpenses: Object,
})

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
    ctx.fillText('지출', width / 2, height / 2)
    ctx.restore()
  },
}

const chartLabels = ref([
  '식비',
  '생활',
  '주거/통신',
  '금융',
  '교통',
  '육아',
  '문화/여가',
  '반려동물',
  '경조/선물',
])
const chartDatasets = computed(() => Object.values(props.monthlyExpenses.category))

const chartData = ref({
  labels: chartLabels.value,
  datasets: [
    {
      data: chartDatasets.value,
      backgroundColor: [
        '#4BC0C0',
        '#36A2EB',
        '#FF6384',
        '#FF9F40',
        '#FFCD56',
        '#C9CBCF',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
      ],
      hoverBackgroundColor: [
        '#4BC0C0',
        '#36A2EB',
        '#FF6384',
        '#FF9F40',
        '#FFCD56',
        '#C9CBCF',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
      ],
    },
  ],
})

const chartOptions = ref({
  maintainAspectRatio: false,
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
  width: 45%;
}
</style>
