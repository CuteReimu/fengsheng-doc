<template>
  <Line
    :data="chartData"
    :options="chartOptions"
  />
  <p></p>
  <Bar
      :data="chartData2"
      :options="chartOptions2"
  />
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import Axios from "axios";

import {Line, Bar} from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  LineElement,
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import {AnnotationOptions} from 'chartjs-plugin-annotation';
import {ElMessage} from "element-plus";

ChartJS.register(Title, Tooltip, BarElement, PointElement, LineElement, CategoryScale, LinearScale, Legend, Annotation);

interface DataType {
  date: string
  count: number
  pc: number
}

const hours = ref<number[]>([]);

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
    }, {
      label: '活人局系数',
      type: 'bar',
      data: completeData.map(item => item.pc - item.count),
      backgroundColor: 'rgba(59, 169, 120, 0.4)',
      borderColor: 'rgba(59, 169, 120, 0.4)',
    }]
  };
});
const chartOptions = computed<ChartOptions<"line">>(() => {
  const rawData = data.value;

  if (rawData.length === 0) {
    return {};
  }

  const annotations: AnnotationOptions[] = [];

  const maxDisplayDate = new Date(rawData[rawData.length - 1].date);
  const minDisplayDate = new Date(maxDisplayDate);
  minDisplayDate.setDate(minDisplayDate.getDate() - 30); // 始终显示最后30天

  let totalCount = 0, totalPc = 0, count = 0;
  const currentDate = new Date(minDisplayDate);
  for (let i = 0; i < 30; i++) { // 小于30，近期均值不包含今天
    const dateStr = currentDate.toISOString().slice(0, 10);
    if (currentDate.getDay() === 0) {
      annotations.push(
          {
            xMin: dateStr.slice(5, 10),
            xMax: dateStr.slice(5, 10),
            borderColor: 'rgb(59, 169, 120)',
            borderWidth: 1,
            borderDash: [5, 4],
          }
      )
    }
    const value = rawData.find((value) => value.date.slice(0, 10) === dateStr);
    if (value) {
      totalCount += value.count;
      totalPc += value.pc;
    }
    count++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const aveCount = Math.round(totalCount / count * 10) / 10;
  const avePc = Math.round(totalPc / count * 10) / 10;
  annotations.push(
    {
      yMin: avePc - aveCount,
      yMax: avePc - aveCount,
      borderColor: 'rgba(59, 169, 120, 0.4)',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        display: true,
        content: `${avePc - aveCount}`, // 修改标签文本
        position: 'start',
        backgroundColor: 'rgba(59, 169, 120, 0.7)',
      }
    },
    {
      yMin: avePc,
      yMax: avePc,
      borderColor: 'rgba(41,50,225)',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        display: true,
        content: `${avePc}`, // 修改标签文本
        position: 'start',
        backgroundColor: 'rgba(41,50,225,0.7)',
      }
    },
    {
      yMin: aveCount,
      yMax: aveCount,
      borderColor: 'rgba(225,6,2)',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        display: true,
        content: `${aveCount}`, // 修改标签文本
        position: 'start',
        backgroundColor: 'rgba(225,6,2,0.7)',
      }
    },
  );
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
        text: '近期每日活跃度',
        font: {size: 20}
      },
      datalabels: null,
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          boxHeight: 8,
          borderWidth: 0,
        },
      },
      tooltip: {
        usePointStyle: true,
        borderWidth: 0,
        boxWidth: 8,
        boxPadding: 5,
        itemSort: (a, b) => {
          if (a.datasetIndex <= 1 && b.datasetIndex <= 1)
            return b.datasetIndex - a.datasetIndex;
          return a.datasetIndex - b.datasetIndex;
        },
      },
      annotation: {
        annotations
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }
});

const chartData2 = computed<ChartData<"bar">>(() => {
  const h = hours.value;
  const total = h.reduce((sum, value) => sum + value, 0);
  return {
    labels: h.map(((_, index) => index+0.5)),
    datasets: [{
      label: '活跃系数',
      data: h.map((value) => value / total * 100),
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      borderColor: 'rgba(54, 162, 235, 1)',
      barPercentage: 1.0,
      categoryPercentage: 1.0,
    }]
  };
});
const chartOptions2 = computed<ChartOptions<"bar">>(() => {
  return {
    scales: {
      x: {
        grid: {
          offset: false,
        },
        type: 'linear',
        min: 0,
        max: 24,
        offset: false,
        ticks: {
          autoSkip: false,
          callback: (value) => {
            const hour = Math.floor(value as number);
            return `${hour}:00`;
          },
          stepSize: 2,
        },
        stacked: true,
      },
      y: {
        title: {
          display: true,
          text: '活跃系数',
          font: {size: 18},
        },
        beginAtZero: true,
      }
    },
    plugins: {
      title: {
        display: true,
        text: '全天活跃度',
        font: {size: 20}
      },
      datalabels: null,
      tooltip: {
        callbacks: {
          title: ([ctx]) => {
            const hour = Math.floor(ctx.parsed.x);
            return `${hour}:00 - ${hour+1}:00`;
          }
        }
      },
      legend: {
        display: false,
      },
    },
  };
});

const doRequest = () => {
  Axios.get(import.meta.env.VITE_REQUEST_URL.replace("getallgames", "frequency"), {})
      .then((response) => {
        data.value = response.data.data;
        hours.value = response.data.hours;
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
