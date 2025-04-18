<template>
  <Scatter
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

import {Scatter, Bar} from 'vue-chartjs';
import {ChartData, ChartOptions} from "chart.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ScatterDataPoint,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  LegendItem,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Annotation from 'chartjs-plugin-annotation';
import {ElMessage} from "element-plus";

ChartJS.register(Title, Tooltip, BarElement, PointElement, CategoryScale, LinearScale, Legend, ChartDataLabels, Annotation);

const data = ref<{ [key: string]: [number, number] }>({});

const labels = [
  ["张一挺", "黄济仁", "裴玲", "阿芙罗拉", "李醒", "小九", "商玉", "邵秀", "肥原龙川", "李宁玉", "白沧浪", "连鸢", "韩梅", "SP顾小梦", "端木静", "SP李宁玉", "王富贵", "鄭文先", "程小蝶", "顾小梦", "鬼脚", "老鳖", "白小年", "老汉", "王魁", "白菲菲", "白昆山", "吴志国", "金生火", "玄青子", "毛不拔", "王田香"],
  ["秦圆圆", "SP程小蝶", "老虎", "钱敏", "SP连鸢", "盛老板", "简先生", "高桥智子", "玛利亚", "青年小九", "青年韩梅", "池镜海", "SP端木静"],
  ["陈安娜", "凌素秋", "成年韩梅", "哑炮", "陈大耳", "边云疆", "金自来", "间谍阿芙罗拉", "小铃铛", "SP白菲菲", "李书云", "成年小九", "秦无命", "SP韩梅", "SP小九", "孙守謨", "王响"]
];

const winRates = ref<{[key: string]: number}>({
  "总胜率": 32.42,
  "潜伏/军情": 34.64,
  "神秘人": 25.01,
  "镇压者": 17.66,
  "簒夺者": 26.21,
  "双面间谍": 26.68,
  "诱变者": 40.31,
  "先行者": 25.38,
  "搅局者": 21.00,
  "清道夫": 19.71,
});

const chartData = computed<ChartData<"scatter">>(() => {
  const d = Object.entries(data.value).filter(([, item]) => {
    return item[0] > 0;
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
        return {label: key, x: item[0], y: item[1] / item[0] * 100, color: colors[index]};
      }),
      backgroundColor: colors,
    }],
  };
});
const chartOptions = computed<ChartOptions<"scatter">>(() => {
  // 排序后取中间值
  const sortedY = Object.values(data.value).filter(item => {
    return item[0] > 0;
  }).map(item => item[1] / item[0]).sort();
  const mid = Math.floor(sortedY.length / 2)

  let medianY = 0; // 中位数
  if (sortedY.length > 0) {
    medianY = sortedY.length % 2 !== 0
        ? sortedY[mid]
        : (sortedY[mid - 1] + sortedY[mid]) / 2;
    medianY = Math.round(medianY * 10000) / 100;
  }

  return {
    aspectRatio: 1,
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
          title: (a) => {
            return a.map(i => i.label).join(" ");
          },
          label: ({raw, dataset}) => {
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
          return value.label; // 自定义标签内容
        }
      },
      annotation: {
        annotations: {
          medianLine: {
            yMin: medianY,
            yMax: medianY,
            borderColor: 'rgba(255,87,34,0.65)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: `${medianY}`, // 修改标签文本
              position: 'start',
              backgroundColor: 'rgba(255,87,34,0.8)',
            }
          }
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
        },
        ticks: {
          autoSkip: true,
          stepSize: 2.5,
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  }
});

const chartData2 = computed<ChartData<"bar">>(() => {
  const h = winRates.value;
  return {
    labels: Object.keys(h),
    datasets: [{
      label: '胜率',
      data: Object.values(h),
      backgroundColor: "#9ad0f5",
    }]
  };
});
const chartOptions2 = computed<ChartOptions<"bar">>(() => {
  const h = winRates.value;
  return {
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
        title: {
          display: true,
          text: '胜率（%）',
          font: {size: 18},
        },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: '各身份胜率统计',
        font: {size: 20}
      },
      datalabels: {
        color: "#FFFFFF", // 标签颜色
        formatter: (value) => {
          return `${value.toFixed()}%`; // 自定义标签内容
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            return `${ctx.raw}%`;
          }
        }
      },
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          medianLine: {
            yMin: h["总胜率"],
            yMax: h["总胜率"],
            borderColor: 'rgba(255,87,34)',
            borderWidth: 2,
            borderDash: [6, 6],
          }
        }
      },
    },
  };
});


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
