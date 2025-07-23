---
title: 牌堆构成
icon: book
author:
  - name: 奇葩的灵梦
    url: https://cutereimu.cn
  - name: 惑星
    url: https://space.bilibili.com/34070734
pageInfo: [ "Author", "PageView", "Date" ]
---

## 总览

::: info 注意

因为引入一扩后建议对卡牌数量进行调整，删掉部分[试探](card.md)。
- 下表中，括号外的数字表示调整之后的数量，括号内的数字表示调整之前的数量。
- 各分类统计图中的统计数据全部基于调整后的卡牌数量。

:::

![](/images/deck.png)

### 按照牌类型分类

<DeckCard></DeckCard>

### 按照方向分类

<DeckPie
  :labels='["←", "↑", "→"]'
  :data='[38, 34, 38]'
  :colors='["#ff4069", "#36a2eb", "#ff9f40"]'
  :rotation='180'
/>

### 按照颜色分类

<DeckPie
  :labels='["红", "红黑", "黑", "蓝黑", "蓝", "红蓝"]'
  :data='[25, 12, 32, 12, 25, 4]'
  :colors='["#ed6e86", "#9e4a5a", "#a0a0a0", "#3a6b99", "#57a0e5", "#9268f7"]'
  :rotation='2 / 110 * 360'
/>

### 按照锁定分类

<DeckPie
  :labels='["锁定", "无锁"]'
  :data='[41, 69]'
  :colors='["#ff4069", "#36a2eb"]'
/>

## 详细牌堆构成

<el-switch
  inactive-text="显示数量调整后卡牌"
  active-text="显示全部118张卡牌"
  v-model="disableLines"
  inline-prompt
  style="--el-switch-off-color: #13ce66"
/>

<el-table :data="deck" border>
  <el-table-column
    prop="name"
    label="卡牌"
    min-width="90"
    align="center"
    :filters="[
      { text: '试探', value: '试探' },
      { text: '平衡', value: '平衡' },
      { text: '威逼', value: '威逼' },
      { text: '利诱', value: '利诱' },
      { text: '澄清', value: '澄清' },
      { text: '破译', value: '破译' },
      { text: '调包', value: '调包' },
      { text: '截获', value: '截获' },
      { text: '误导', value: '误导' },
      { text: '风云变幻', value: '风云变幻' },
      { text: '密令', value: '密令' },
      { text: '调虎离山', value: '调虎离山' },
      { text: '欲擒故纵', value: '欲擒故纵' },
    ]"
    :filter-method="filterHandler"
  />
  <el-table-column prop="color" sortable label="颜色" min-width="80" align="center">
    <template #default="scope">
      <div v-html="getColor(scope.row.color)"></div>
    </template>
  </el-table-column>
  <el-table-column prop="dir" sortable label="方向" min-width="80" align="center">
    <template #default="scope">
      {{ scope.row.dir == "Up" ? "&uarr;" : scope.row.dir == "Left" ? "&larr;" : "&rarr;" }}
    </template>
  </el-table-column>
  <el-table-column prop="lockable" label="锁定" min-width="60" align="center">
    <template #default="scope">
      {{ scope.row.lockable ? "锁定" : "" }}
    </template>
  </el-table-column>
  <el-table-column label="备注" align="center">
    <template #default="scope">
      <div v-html="getComment(scope.row.name, scope.row.comment)"></div>
    </template>
  </el-table-column>
</el-table>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { ElTable, ElTableColumn, ElSwitch } from "element-plus";
import DeckCard from "@DeckCard";
import DeckPie from "@DeckPie";

const filterHandler = (value, row, column) => {
  const property = column['property'];
  return row[property] === value;
};

const getColor = (colors) => {
  return colors.map((color) => {
    let innerText = "";
    switch (color) {
    case "Red": innerText = "红"; break;
    case "Blue": innerText = "蓝"; break;
    case "Black": innerText = "黑"; break;
    }
    return `<span class="${color.toLowerCase()}">${innerText}</span>`;
  }).join("");
};

const getComment = (name, comment) => {
  if (name === "试探") {
    let s = `<span style="color:white; background-color:var(--red-color);">`;
    s += comment.includes("Red") ? "+1" : "-1";
    s += `</span><span style="color:white; background-color:var(--blue-color);">`;
    s += comment.includes("Blue") ? "+1" : "-1";
    s += `</span><span style="color:white; background-color:var(--green-color);">`;
    s += comment.includes("Black") ? "+1" : "-1";
    s += `</span>`;
    return s;
  } else if (name === "密令") {
    let s = "";
    for (let i in comment) {
      s += `<span style="color:white; background-color:var(--${comment[i].toLowerCase()}-color);">`;
      switch (Number(i)) {
      case 0: s += "东"; break;
      case 1: s += "西"; break;
      case 2: s += "静"; break;
      }
      s += "</span>";
    }
    return s;
  }
  return comment;
};

const deck1 = [
  {id: 1, name: "试探", color: ["Black"], dir: "Right", lockable: false, comment: ["Black"]},
  {id: 2, name: "试探", color: ["Black"], dir: "Right", lockable: false, comment: ["Blue"]},
  {id: 3, name: "试探", color: ["Black"], dir: "Right", lockable: false, comment: ["Red", "Black"]},
  {id: 4, name: "试探", color: ["Black"], dir: "Left", lockable: false, comment: ["Red", "Blue"]},
  {id: 5, name: "试探", color: ["Black"], dir: "Left", lockable: false, comment: ["Blue", "Black"]},
  {id: 6, name: "试探", color: ["Black"], dir: "Left", lockable: false, comment: ["Red"]},
  {id: 7, name: "试探", color: ["Red"], dir: "Right", lockable: false, comment: ["Black"]},
  {id: 8, name: "试探", color: ["Red"], dir: "Right", lockable: false, comment: ["Blue"]},
  {id: 9, name: "试探", color: ["Red"], dir: "Right", lockable: false, comment: ["Red", "Black"]},
  {id: 10, name: "试探", color: ["Red"], dir: "Left", lockable: false, comment: ["Red", "Blue"]},
  {id: 11, name: "试探", color: ["Red"], dir: "Left", lockable: false, comment: ["Blue", "Black"]},
  {id: 12, name: "试探", color: ["Red"], dir: "Left", lockable: false, comment: ["Red"]},
  {id: 13, name: "试探", color: ["Blue"], dir: "Right", lockable: false, comment: ["Black"]},
  {id: 14, name: "试探", color: ["Blue"], dir: "Right", lockable: false, comment: ["Blue"]},
  {id: 15, name: "试探", color: ["Blue"], dir: "Right", lockable: false, comment: ["Red", "Black"]},
  {id: 16, name: "试探", color: ["Blue"], dir: "Left", lockable: false, comment: ["Red", "Blue"]},
  {id: 17, name: "试探", color: ["Blue"], dir: "Left", lockable: false, comment: ["Blue", "Black"]},
  {id: 18, name: "试探", color: ["Blue"], dir: "Left", lockable: false, comment: ["Red"]},
  {id: 19, name: "平衡", color: ["Black"], dir: "Left", lockable: true},
  {id: 20, name: "平衡", color: ["Black"], dir: "Right", lockable: true},
  {id: 21, name: "平衡", color: ["Blue"], dir: "Left", lockable: true},
  {id: 22, name: "平衡", color: ["Red"], dir: "Right", lockable: true},
  {id: 23, name: "平衡", color: ["Red", "Black"], dir: "Up", lockable: false},
  {id: 24, name: "平衡", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {id: 25, name: "平衡", color: ["Red", "Black"], dir: "Left", lockable: false},
  {id: 26, name: "平衡", color: ["Blue", "Black"], dir: "Right", lockable: false},
  {id: 27, name: "威逼", color: ["Red"], dir: "Left", lockable: false},
  {id: 28, name: "威逼", color: ["Red"], dir: "Left", lockable: false},
  {id: 29, name: "威逼", color: ["Red"], dir: "Left", lockable: false},
  {id: 30, name: "威逼", color: ["Red"], dir: "Right", lockable: false},
  {id: 31, name: "威逼", color: ["Blue"], dir: "Left", lockable: false},
  {id: 32, name: "威逼", color: ["Blue"], dir: "Right", lockable: false},
  {id: 33, name: "威逼", color: ["Blue"], dir: "Right", lockable: false},
  {id: 34, name: "威逼", color: ["Blue"], dir: "Right", lockable: false},
  {id: 35, name: "威逼", color: ["Black"], dir: "Left", lockable: false},
  {id: 36, name: "威逼", color: ["Black"], dir: "Left", lockable: false},
  {id: 37, name: "威逼", color: ["Black"], dir: "Right", lockable: false},
  {id: 38, name: "威逼", color: ["Black"], dir: "Right", lockable: false},
  {id: 39, name: "威逼", color: ["Blue", "Black"], dir: "Left", lockable: false},
  {id: 40, name: "威逼", color: ["Red", "Black"], dir: "Right", lockable: false},
  {id: 41, name: "利诱", color: ["Black"], dir: "Left", lockable: true},
  {id: 42, name: "利诱", color: ["Black"], dir: "Right", lockable: true},
  {id: 43, name: "利诱", color: ["Black"], dir: "Left", lockable: true},
  {id: 44, name: "利诱", color: ["Black"], dir: "Right", lockable: true},
  {id: 45, name: "利诱", color: ["Black"], dir: "Left", lockable: true},
  {id: 46, name: "利诱", color: ["Black"], dir: "Right", lockable: true},
  {id: 47, name: "利诱", color: ["Blue"], dir: "Left", lockable: true},
  {id: 48, name: "利诱", color: ["Red"], dir: "Right", lockable: true},
  {id: 49, name: "澄清", color: ["Red"], dir: "Up", lockable: true},
  {id: 50, name: "澄清", color: ["Red"], dir: "Up", lockable: true},
  {id: 51, name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {id: 52, name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {id: 53, name: "澄清", color: ["Blue"], dir: "Up", lockable: true},
  {id: 54, name: "澄清", color: ["Blue"], dir: "Up", lockable: true},
  {id: 55, name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {id: 56, name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {id: 57, name: "破译", color: ["Red", "Black"], dir: "Left", lockable: true},
  {id: 58, name: "破译", color: ["Blue", "Black"], dir: "Left", lockable: true},
  {id: 59, name: "破译", color: ["Red"], dir: "Left", lockable: true},
  {id: 60, name: "破译", color: ["Blue"], dir: "Left", lockable: true},
  {id: 61, name: "破译", color: ["Black"], dir: "Left", lockable: true},
  {id: 62, name: "破译", color: ["Red", "Black"], dir: "Right", lockable: true},
  {id: 63, name: "破译", color: ["Blue", "Black"], dir: "Right", lockable: true},
  {id: 64, name: "破译", color: ["Red"], dir: "Right", lockable: true},
  {id: 65, name: "破译", color: ["Blue"], dir: "Right", lockable: true},
  {id: 66, name: "破译", color: ["Black"], dir: "Right", lockable: true},
  {id: 67, name: "调包", color: ["Red"], dir: "Up", lockable: false},
  {id: 68, name: "调包", color: ["Red"], dir: "Left", lockable: false},
  {id: 69, name: "调包", color: ["Red"], dir: "Right", lockable: false},
  {id: 70, name: "调包", color: ["Blue"], dir: "Up", lockable: false},
  {id: 71, name: "调包", color: ["Blue"], dir: "Left", lockable: false},
  {id: 72, name: "调包", color: ["Blue"], dir: "Right", lockable: false},
  {id: 73, name: "调包", color: ["Black"], dir: "Left", lockable: false},
  {id: 74, name: "调包", color: ["Black"], dir: "Right", lockable: false},
  {id: 75, name: "调包", color: ["Red", "Black"], dir: "Up", lockable: false},
  {id: 76, name: "调包", color: ["Red", "Black"], dir: "Right", lockable: false},
  {id: 77, name: "调包", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {id: 78, name: "调包", color: ["Blue", "Black"], dir: "Left", lockable: false},
  {id: 79, name: "截获", color: ["Red"], dir: "Up", lockable: false},
  {id: 80, name: "截获", color: ["Red"], dir: "Up", lockable: false},
  {id: 81, name: "截获", color: ["Red"], dir: "Up", lockable: true},
  {id: 82, name: "截获", color: ["Blue"], dir: "Up", lockable: false},
  {id: 83, name: "截获", color: ["Blue"], dir: "Up", lockable: false},
  {id: 84, name: "截获", color: ["Blue"], dir: "Up", lockable: true},
  {id: 85, name: "截获", color: ["Black"], dir: "Up", lockable: false},
  {id: 86, name: "截获", color: ["Black"], dir: "Up", lockable: false},
  {id: 87, name: "截获", color: ["Black"], dir: "Up", lockable: true},
  {id: 88, name: "截获", color: ["Black"], dir: "Up", lockable: true},
  {id: 89, name: "截获", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {id: 90, name: "截获", color: ["Red", "Black"], dir: "Up", lockable: false},
  {id: 91, name: "误导", color: ["Red"], dir: "Up", lockable: false},
  {id: 92, name: "误导", color: ["Red"], dir: "Left", lockable: false},
  {id: 93, name: "误导", color: ["Red"], dir: "Right", lockable: false},
  {id: 94, name: "误导", color: ["Blue"], dir: "Up", lockable: false},
  {id: 95, name: "误导", color: ["Blue"], dir: "Left", lockable: false},
  {id: 96, name: "误导", color: ["Blue"], dir: "Right", lockable: false},
  {id: 97, name: "误导", color: ["Black"], dir: "Left", lockable: false},
  {id: 98, name: "误导", color: ["Black"], dir: "Right", lockable: false},
  {id: 99, name: "误导", color: ["Blue", "Black"], dir: "Left", lockable: false},
  {id: 100, name: "误导", color: ["Red", "Black"], dir: "Right", lockable: false},
  {id: 101, name: "风云变幻", color: ["Black"], dir: "Up", lockable: true},
  {id: 102, name: "风云变幻", color: ["Black"], dir: "Up", lockable: true},
  {id: 103, name: "密令", color: ["Blue", "Black"], dir: "Up", lockable: true, comment: ["Blue", "Black", "Red"]},
  {id: 104, name: "密令", color: ["Blue"], dir: "Right", lockable: false, comment: ["Black", "Blue", "Red"]},
  {id: 105, name: "密令", color: ["Blue"], dir: "Left", lockable: false, comment: ["Blue", "Red", "Black"]},
  {id: 106, name: "密令", color: ["Red", "Black"], dir: "Up", lockable: true, comment: ["Red", "Black", "Blue"]},
  {id: 107, name: "密令", color: ["Red"], dir: "Left", lockable: false, comment: ["Black", "Red", "Blue"]},
  {id: 108, name: "密令", color: ["Red"], dir: "Right", lockable: false, comment: ["Red", "Blue", "Black"]},
  {id: 109, name: "调虎离山", color: ["Black"], dir: "Up", lockable: false},
  {id: 110, name: "调虎离山", color: ["Black"], dir: "Up", lockable: true},
  {id: 111, name: "调虎离山", color: ["Red", "Black"], dir: "Left", lockable: true},
  {id: 112, name: "调虎离山", color: ["Blue", "Black"], dir: "Right", lockable: true},
  {id: 113, name: "欲擒故纵", color: ["Red", "Black"], dir: "Up", lockable: false},
  {id: 114, name: "欲擒故纵", color: ["Red", "Blue"], dir: "Left", lockable: false},
  {id: 115, name: "欲擒故纵", color: ["Red", "Blue"], dir: "Right", lockable: false},
  {id: 116, name: "欲擒故纵", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {id: 117, name: "欲擒故纵", color: ["Red", "Blue"], dir: "Left", lockable: false},
  {id: 118, name: "欲擒故纵", color: ["Red", "Blue"], dir: "Right", lockable: false},
];
const disabledLines = [0, 3, 8, 11, 13, 16, 54, 55];
const deck2 = deck1.filter((card) => !disabledLines.includes(card.id - 1));
const disableLines = ref(false); 
const deck = computed(() => disableLines.value ? deck1 : deck2);

// Watch for changes in disableLines to preserve scroll position
watch(disableLines, () => {
  const scrollY = window.scrollY;
  nextTick(() => {
    window.scrollTo(0, scrollY);
  }, 0);
});
</script>

<style scoped>
:deep(.el-table__header-wrapper .el-table__header) {
  margin: 0;
}

:deep(.el-table__body-wrapper .el-table__body) {
  margin: 0;
}

:deep(th) {
  border: none;
}

:deep(td) {
  border: none;
}
</style>
