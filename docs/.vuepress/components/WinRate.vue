<template>
  <Scatter
    :height="300"
    :data="chartData"
    :options="chartOptions"
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
  Legend,
  LegendItem,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ElMessage } from "element-plus";
ChartJS.register(Title, Tooltip, PointElement, CategoryScale, LinearScale, Legend, ChartDataLabels);

const data = ref<{[key: string]: [number, number]}>({});

const labels = [
    ["张一挺", "黄济仁", "裴玲", "阿芙罗拉", "李醒", "小九", "商玉", "邵秀", "肥原龙川", "李宁玉", "白沧浪", "连鸢", "韩梅", "SP顾小梦", "端木静", "SP李宁玉", "王富贵", "鄭文先", "程小蝶", "顾小梦", "鬼脚", "老鳖", "白小年", "老汉", "王魁", "白菲菲", "白昆山", "吴志国", "金生火", "玄青子", "毛不拔", "王田香"],
    ["秦圆圆", "SP程小蝶", "老虎", "钱敏", "SP连鸢", "盛老板", "简先生", "高桥智子", "玛利亚", "青年小九", "青年韩梅", "池镜海", "SP端木静"],
    ["陈安娜", "凌素秋", "成年韩梅", "哑炮", "陈大耳", "边云疆", "金自来", "间谍阿芙罗拉", "小铃铛", "SP白菲菲", "李书云", "成年小九", "秦无命", "SP韩梅", "SP小九", "孙守謨", "王响"]
];

const chartData = computed<ChartData<"scatter">>(() => {
  const d = Object.entries(data.value).filter(([,item]) => {
    return item[0] >= 10;
  });
  const colors = d.map(([key]) => {
    if (labels[0].includes(key)) return "rgb(59, 169, 120)";
    if (labels[1].includes(key)) return "#e10602";
    if (labels[2].includes(key)) return "#2932e1";
    throw new Error("Unknown label: " + key);
  });
  return {
    labels: d.map(([key]) => key),
    datasets: [{
      data: d.map(([key, item], index) => {
        return {label: key, x: item[0], y: item[1]/item[0]*100, color: colors[index]};
      }),
      backgroundColor: colors,
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
      display: true,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 5,
        boxHeight: 5,
        generateLabels: (): LegendItem[] => [  // 自定义生成图例项
          {
            text: "基础角色",
            fontColor: "rgb(59, 169, 120)",
            fillStyle: "rgb(59, 169, 120)",
            lineWidth: 0,
          },
          {
            text: "一扩角色",
            fontColor: "#e10602",
            fillStyle: "#e10602",
            lineWidth: 0,
          },
          {
            text: "二扩角色",
            fontColor: "#2932e1",
            fillStyle: "#2932e1",
            lineWidth: 0,
          },
        ].reverse()
      },
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
      color: (ctx) => (ctx.dataset.data[ctx.dataIndex] as any).color, // 标签颜色
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
