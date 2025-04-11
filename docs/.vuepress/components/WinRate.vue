<template>
  <Scatter
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import Axios from "axios";

import { Scatter } from 'vue-chartjs';
import {ChartData, ChartOptions, type DefaultDataPoint, Point} from "chart.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ScatterDataPoint,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import {ElMessage} from "element-plus";
ChartJS.register(Title, Tooltip, PointElement, CategoryScale, LinearScale);

const data = ref<{[key: string]: [number, number]}>({});

const chartData = computed<ChartData<"scatter">>(() => {
  return {
    labels: Object.keys(data.value),
    datasets: [{
      data: Object.values(data.value).map((item) => {
        return {x: item[0], y: item[1]/item[0]*100};
      }),
      backgroundColor: 'rgb(255, 99, 132)'
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
