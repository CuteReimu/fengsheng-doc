<template>
  <div class="my-chartjs-wrapper">
    <Doughnut
        :data="chartData"
        :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import {Doughnut} from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {Chart as ChartJS, ArcElement} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, ChartDataLabels);

const labels = ["红", "红黑", "黑", "蓝黑", "蓝", "红蓝"];

const chartData: ChartData<"doughnut"> = {
  labels,
  datasets: [{
    label: "数量",
    data: [25, 12, 32, 12, 25, 4],
    hoverOffset: 4,
    backgroundColor: ["#ed6e86", "#9e4a5a", "#a0a0a0", "#3a6b99", "#57a0e5", "#9268f7"],
    rotation: 2 / 110 * 360,
  }]
};
const chartOptions: ChartOptions<"doughnut"> = {
  cutout: 1,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      align: "end",
      color: "#FFFFFF", // 标签颜色
      formatter: (value, ctx) => {
        return `${labels[ctx.dataIndex]} ${value}张`; // 自定义标签内容
      },
    },
  },
};
</script>

<style scoped>
</style>
