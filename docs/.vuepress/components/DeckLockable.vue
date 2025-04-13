<template>
  <div class="my-chartjs-wrapper">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {Chart as ChartJS, ArcElement} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, ChartDataLabels);

const labels = ["锁定", "无锁"];

const chartData: ChartData<"doughnut"> = {
  labels,
  datasets: [{
    label: "数量",
    data: [41, 69],
    hoverOffset: 4,
    backgroundColor: ["#ff4069", "#36a2eb"],
  }]
};
const chartOptions: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      color: "#FFFFFF", // 标签颜色
      formatter: (value, ctx) => {
        return `${labels[ctx.dataIndex]} 共 ${value} 张`; // 自定义标签内容
      },
    },
  },
};
</script>

<style scoped>
</style>
