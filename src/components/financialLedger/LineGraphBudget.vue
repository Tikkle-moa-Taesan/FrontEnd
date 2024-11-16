<script setup>
import { ref } from 'vue'

import { Line } from 'vue-chartjs'
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

Chart.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const chartData = ref({
  labels: ['6월', '7월', '8월', '9월', '10월', '11월'],
  datasets: [
    {
      label: '예산',
      data: [50000, 51221, 59502, 54980, 55000, 55000],
      borderColor: '#74b7f8',
      backgroundColor: '#74b7f8',
      fill: false,
      tension: 0.1,
    },
    {
      label: '지출',
      data: [45000, 48000, 65000, 54000, 57000, 45000],
      borderColor: 'gray',
      backgroundColor: 'gray',
      fill: false,
      tension: 0.1,
    },
  ],
})

const chartOptions = ref({
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      min: 40000,
      max: 70000,
      ticks: {
        stepSize: 10000,
      },
    },
  },
})
</script>

<template>
  <div class="line-graph-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped></style>
