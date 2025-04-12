<template>
  <Scatter
    :height="300"
    :data="chartData"
    :options="chartOptions"
    :plugins="[ChartDataLabels]"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Axios from "axios";

import { Scatter } from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ScatterDataPoint,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ElMessage } from "element-plus";
ChartJS.register(Title, Tooltip, PointElement, CategoryScale, LinearScale);

const data = ref<{[key: string]: [number, number]}>({});

const chartData = computed<ChartData<"scatter">>(() => {
  const d = Object.entries(data.value).filter(([,item]) => {
    return item[0] >= 10;
  })
  return {
    labels: d.map(([key]) => key),
    datasets: [{
      data: d.map(([key, item]) => {
        return {label: key, x: item[0], y: item[1]/item[0]*100};
      }),
      backgroundColor: 'rgb(59, 169, 120)'
    }],
  };
});
const chartOptions: ChartOptions<"scatter"> = {
  plugins: {
    title: {
      display: true,
      text: '角色出场率与胜率分布',
      font: {size: 20}
    },
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function ({raw, dataset}) {
          const p = raw as ScatterDataPoint;
          let trialsAmount = 0;
          for (let i = 0; i < dataset.data.length; i++) {
            trialsAmount += dataset.data[i] as number;
          }
          return [`出场次数：${p.x}`, `胜率：${p.y.toFixed(2)}%`];
        },
      }
    },
    datalabels: {
      color: "rgb(59, 169, 120)", // 标签颜色
      anchor: "center", // 标签位置（相对于点）
      align: "top",     // 文本对齐方式
      formatter: (value) => {
        console.log(value);
        return value.label; // 自定义标签内容
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '出场次数',
        font: {size: 18},
      }
    },
    y: {
      title: {
        display: true,
        text: '胜率（%）',
        font: {size: 18},
      }
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

const doRequest = () => {
  Axios.get(import.meta.env.VITE_REQUEST_URL.replace("getallgames", "winrate2"), {})
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.error(error);
        ElMessage.error("加载失败");
      });
};

onMounted(() => {
  doRequest();
});
</script>

<style scoped>
</style>
