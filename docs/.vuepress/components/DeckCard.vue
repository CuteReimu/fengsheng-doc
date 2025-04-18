<template>
  <div>
    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import {Bar} from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(BarElement, ChartDataLabels, CategoryScale, LinearScale, Tooltip);

const labels = ["试探", "平衡", "威逼", "利诱", "澄清", "破译", "调包", "截获", "误导", "风云变幻", "密令", "调虎离山", "欲擒故纵"];

const chartData: ChartData<"bar"> = {
  labels,
  datasets: [{
    label: "数量",
    data: [12, 8, 14, 8, 6, 10, 12, 12, 10, 2, 6, 4, 6],
    backgroundColor: ["#9ad0f5"],
  }]
};
const chartOptions: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      border: {
        color: '#e5e5e5',
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false
      },
      grid: {
        color: '#e5e5e5',
      },
      beginAtZero: true,
    },
  }
};
</script>

<style scoped>
</style>
