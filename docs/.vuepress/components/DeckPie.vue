<template>
  <div class="my-chartjs-wrapper">
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import {Pie} from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {Chart as ChartJS, ArcElement} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, ChartDataLabels);

interface Props {
  labels: string[]
  colors: string[]
  data: number[]
  rotation?: number
}

const props = defineProps<Props>();

const chartData: ChartData<"pie"> = {
  labels: props.labels,
  datasets: [{
    label: "数量",
    data: props.data,
    hoverOffset: 10,
    backgroundColor: props.colors,
    rotation: props.rotation,
  }]
};
const chartOptions: ChartOptions<"pie"> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      align: props.data.some((v) => v < 10) ? "end" : "center",
      color: "#FFFFFF", // 标签颜色
      formatter: (value, ctx) => {
        return props.data.some((v) => v < 10) ?
          `${props.labels[ctx.dataIndex]}${value}张` :
          `${props.labels[ctx.dataIndex]} 共 ${value} 张`// 自定义标签内容
      },
    },
  },
};
</script>

<style scoped>
</style>
