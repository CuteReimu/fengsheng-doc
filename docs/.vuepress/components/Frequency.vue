<template>
  <Line
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import Axios from "axios";

import {Line} from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  LineElement,
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import {ElMessage} from "element-plus";

ChartJS.register(Title, Tooltip, PointElement, LineElement, CategoryScale, LinearScale, Legend, Annotation);

interface DataType {
  date: string
  count: number
  pc: number
}

const data = ref<DataType[]>([]);

const chartData = computed<ChartData<"line">>(() => {
  const rawData = data.value;

  if (rawData.length === 0) {
    return {
      datasets: []
    };
  }

  // 计算需要显示的起始日期（强制最多30天范围）
  const maxDisplayDate = new Date(rawData[rawData.length - 1].date);
  const minDisplayDate = new Date(maxDisplayDate);
  minDisplayDate.setDate(minDisplayDate.getDate() - 30); // 始终显示最后30天

  const completeData: DataType[] = [];
  const currentDate = new Date(minDisplayDate);

  for (let i = 0; i <= 30; i++) {
    const dateStr = currentDate.toISOString().slice(0, 10);
    const value = rawData.find((value) => value.date === dateStr);
    if (value) completeData.push(value);
    else completeData.push({ date: dateStr, count: 0, pc: 0 });

    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate > maxDisplayDate) break;
  }

  return {
    labels: completeData.map(item => item.date.slice(5)),
    datasets: [{
      label: '场次',
      data: completeData.map(item => item.count),
      borderColor: '#e10602',
      backgroundColor: '#e10602',
      tension: 0.4,
    }, {
      label: '参与人次',
      data: completeData.map(item => item.pc),
      borderColor: '#2932e1',
      backgroundColor: '#2932e1',
      tension: 0.4,
    }]
  };
});
const chartOptions = computed<ChartOptions<"line">>(() => {
  const rawData = data.value;

  if (rawData.length === 0) {
    return {};
  }

  const maxDisplayDate = new Date(rawData[rawData.length - 1].date);
  const minDisplayDate = new Date(maxDisplayDate);
  minDisplayDate.setDate(minDisplayDate.getDate() - 29); // 始终显示最后30天

  return {
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0 // 日期标签倾斜显示
        },
      },
      y: {
        type: 'linear',
        position: 'right',
      },
    },
    plugins: {
      title: {
        display: true,
        text: '近期场次与参与人次',
        font: {size: 20}
      },
      datalabels: null,
      legend: {
        labels: {
          boxHeight: 2,
          borderWidth: 0,
        },
      },
      tooltip: {
        usePointStyle: true,
        borderWidth: 2,
        boxWidth: 8,
        boxPadding: 5,
      },
      annotation: {
        annotations: {
          newLine: {
            xMin: '04-12',
            xMax: '04-12',
            borderColor: 'rgb(59, 169, 120)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: "统计规则调整", // 修改标签文本
              position: 'start',
              backgroundColor: 'rgb(59, 169, 120, 0.8)',
            }
          }
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }
});

const doRequest = () => {
  Axios.get(import.meta.env.VITE_REQUEST_URL.replace("getallgames", "frequency"), {})
      .then((response) => {
        data.value = response.data.data;
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
