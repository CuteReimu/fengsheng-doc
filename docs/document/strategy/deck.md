---
shortTitle: 牌堆构成
icon: book
order: -1
author: 奇葩の灵梦
---

# 牌堆构成（个人整理）

::: info 注意
- 有一张[密令](../welcome/welcome.md#卡牌效果)的颜色在某些版本是错误的，具体见[官方公告](../guide/announcement.md#关于密令的勘误)，本表格中是修正后的数据。
:::

<el-table :data="deck" :row-class-name="tableRowClassName" border>
  <el-table-column prop="name" sortable label="卡牌" min-width="90" align="center"/>
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
  <el-table-column label="锁定" min-width="60" align="center">
    <template #default="scope">
      <img src="/images/lock.png" width="20" height="20" alt="锁定" v-if="scope.row.lockable">
    </template>
  </el-table-column>
  <el-table-column prop="comment" label="备注" align="center">
    <template #default="scope">
      <div v-html="getComment(scope.row.name, scope.row.comment)"></div>
    </template>
  </el-table-column>
</el-table>

<script setup>
import "element-plus/theme-chalk/dark/css-vars.css";
import { ElTable, ElTableColumn } from "element-plus";

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
      console.log(i);
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

const disabledLines = [0, 3, 8, 11, 13, 16, 54, 55];
const tableRowClassName = ({row, rowIndex}) => disabledLines.includes(rowIndex) ? 'warning-row' : '';

const deck = [
  {name: "试探", color: ["Black"], dir: "Right", lockable: false, comment: ["Black"]},
  {name: "试探", color: ["Black"], dir: "Right", lockable: false, comment: ["Blue"]},
  {name: "试探", color: ["Black"], dir: "Right", lockable: false, comment: ["Red", "Black"]},
  {name: "试探", color: ["Black"], dir: "Left", lockable: false, comment: ["Red", "Blue"]},
  {name: "试探", color: ["Black"], dir: "Left", lockable: false, comment: ["Blue", "Black"]},
  {name: "试探", color: ["Black"], dir: "Left", lockable: false, comment: ["Red"]},
  {name: "试探", color: ["Red"], dir: "Right", lockable: false, comment: ["Black"]},
  {name: "试探", color: ["Red"], dir: "Right", lockable: false, comment: ["Blue"]},
  {name: "试探", color: ["Red"], dir: "Right", lockable: false, comment: ["Red", "Black"]},
  {name: "试探", color: ["Red"], dir: "Left", lockable: false, comment: ["Red", "Blue"]},
  {name: "试探", color: ["Red"], dir: "Left", lockable: false, comment: ["Blue", "Black"]},
  {name: "试探", color: ["Red"], dir: "Left", lockable: false, comment: ["Red"]},
  {name: "试探", color: ["Blue"], dir: "Right", lockable: false, comment: ["Black"]},
  {name: "试探", color: ["Blue"], dir: "Right", lockable: false, comment: ["Blue"]},
  {name: "试探", color: ["Blue"], dir: "Right", lockable: false, comment: ["Red", "Black"]},
  {name: "试探", color: ["Blue"], dir: "Left", lockable: false, comment: ["Red", "Blue"]},
  {name: "试探", color: ["Blue"], dir: "Left", lockable: false, comment: ["Blue", "Black"]},
  {name: "试探", color: ["Blue"], dir: "Left", lockable: false, comment: ["Red"]},
  {name: "平衡", color: ["Black"], dir: "Left", lockable: true},
  {name: "平衡", color: ["Black"], dir: "Right", lockable: true},
  {name: "平衡", color: ["Blue"], dir: "Left", lockable: true},
  {name: "平衡", color: ["Red"], dir: "Right", lockable: true},
  {name: "平衡", color: ["Red", "Black"], dir: "Up", lockable: false},
  {name: "平衡", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {name: "平衡", color: ["Red", "Black"], dir: "Left", lockable: false},
  {name: "平衡", color: ["Blue", "Black"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Red"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Red"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Red"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Red"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Blue"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Blue"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Blue"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Blue"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Black"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Black"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Black"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Black"], dir: "Right", lockable: false},
  {name: "威逼", color: ["Blue", "Black"], dir: "Left", lockable: false},
  {name: "威逼", color: ["Red", "Black"], dir: "Right", lockable: false},
  {name: "利诱", color: ["Black"], dir: "Left", lockable: true},
  {name: "利诱", color: ["Black"], dir: "Right", lockable: true},
  {name: "利诱", color: ["Black"], dir: "Left", lockable: true},
  {name: "利诱", color: ["Black"], dir: "Right", lockable: true},
  {name: "利诱", color: ["Black"], dir: "Left", lockable: true},
  {name: "利诱", color: ["Black"], dir: "Right", lockable: true},
  {name: "利诱", color: ["Blue"], dir: "Left", lockable: true},
  {name: "利诱", color: ["Red"], dir: "Right", lockable: true},
  {name: "澄清", color: ["Red"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Red"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Blue"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Blue"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {name: "澄清", color: ["Black"], dir: "Up", lockable: true},
  {name: "破译", color: ["Red", "Black"], dir: "Left", lockable: true},
  {name: "破译", color: ["Blue", "Black"], dir: "Left", lockable: true},
  {name: "破译", color: ["Red"], dir: "Left", lockable: true},
  {name: "破译", color: ["Blue"], dir: "Left", lockable: true},
  {name: "破译", color: ["Black"], dir: "Left", lockable: true},
  {name: "破译", color: ["Red", "Black"], dir: "Right", lockable: true},
  {name: "破译", color: ["Blue", "Black"], dir: "Right", lockable: true},
  {name: "破译", color: ["Red"], dir: "Right", lockable: true},
  {name: "破译", color: ["Blue"], dir: "Right", lockable: true},
  {name: "破译", color: ["Black"], dir: "Right", lockable: true},
  {name: "调包", color: ["Red"], dir: "Up", lockable: false},
  {name: "调包", color: ["Red"], dir: "Left", lockable: false},
  {name: "调包", color: ["Red"], dir: "Right", lockable: false},
  {name: "调包", color: ["Blue"], dir: "Up", lockable: false},
  {name: "调包", color: ["Blue"], dir: "Left", lockable: false},
  {name: "调包", color: ["Blue"], dir: "Right", lockable: false},
  {name: "调包", color: ["Black"], dir: "Left", lockable: false},
  {name: "调包", color: ["Black"], dir: "Right", lockable: false},
  {name: "调包", color: ["Red", "Black"], dir: "Up", lockable: false},
  {name: "调包", color: ["Red", "Black"], dir: "Right", lockable: false},
  {name: "调包", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {name: "调包", color: ["Blue", "Black"], dir: "Left", lockable: false},
  {name: "截获", color: ["Red"], dir: "Up", lockable: false},
  {name: "截获", color: ["Red"], dir: "Up", lockable: false},
  {name: "截获", color: ["Red"], dir: "Up", lockable: true},
  {name: "截获", color: ["Blue"], dir: "Up", lockable: false},
  {name: "截获", color: ["Blue"], dir: "Up", lockable: false},
  {name: "截获", color: ["Blue"], dir: "Up", lockable: true},
  {name: "截获", color: ["Black"], dir: "Up", lockable: false},
  {name: "截获", color: ["Black"], dir: "Up", lockable: false},
  {name: "截获", color: ["Black"], dir: "Up", lockable: true},
  {name: "截获", color: ["Black"], dir: "Up", lockable: true},
  {name: "截获", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {name: "截获", color: ["Red", "Black"], dir: "Up", lockable: false},
  {name: "误导", color: ["Red"], dir: "Up", lockable: false},
  {name: "误导", color: ["Red"], dir: "Left", lockable: false},
  {name: "误导", color: ["Red"], dir: "Right", lockable: false},
  {name: "误导", color: ["Blue"], dir: "Up", lockable: false},
  {name: "误导", color: ["Blue"], dir: "Left", lockable: false},
  {name: "误导", color: ["Blue"], dir: "Right", lockable: false},
  {name: "误导", color: ["Black"], dir: "Left", lockable: false},
  {name: "误导", color: ["Black"], dir: "Right", lockable: false},
  {name: "误导", color: ["Blue", "Black"], dir: "Left", lockable: false},
  {name: "误导", color: ["Red", "Black"], dir: "Right", lockable: false},
  {name: "风云变幻", color: ["Black"], dir: "Up", lockable: true},
  {name: "风云变幻", color: ["Black"], dir: "Up", lockable: true},
  {name: "密令", color: ["Blue", "Black"], dir: "Up", lockable: true, comment: ["Blue", "Black", "Red"]},
  {name: "密令", color: ["Blue"], dir: "Right", lockable: false, comment: ["Black", "Blue", "Red"]},
  {name: "密令", color: ["Blue"], dir: "Left", lockable: false, comment: ["Blue", "Red", "Black"]},
  {name: "密令", color: ["Red", "Black"], dir: "Up", lockable: true, comment: ["Red", "Black", "Blue"]},
  {name: "密令", color: ["Red"], dir: "Left", lockable: false, comment: ["Black", "Red", "Blue"]},
  {name: "密令", color: ["Red"], dir: "Right", lockable: false, comment: ["Red", "Blue", "Black"]},
  {name: "调虎离山", color: ["Black"], dir: "Up", lockable: false},
  {name: "调虎离山", color: ["Black"], dir: "Up", lockable: true},
  {name: "调虎离山", color: ["Red", "Black"], dir: "Left", lockable: true},
  {name: "调虎离山", color: ["Blue", "Black"], dir: "Right", lockable: true},
  {name: "欲擒故纵", color: ["Red", "Black"], dir: "Up", lockable: false},
  {name: "欲擒故纵", color: ["Red", "Blue"], dir: "Left", lockable: false},
  {name: "欲擒故纵", color: ["Red", "Blue"], dir: "Right", lockable: false},
  {name: "欲擒故纵", color: ["Blue", "Black"], dir: "Up", lockable: false},
  {name: "欲擒故纵", color: ["Red", "Blue"], dir: "Left", lockable: false},
  {name: "欲擒故纵", color: ["Red", "Blue"], dir: "Right", lockable: false},
];
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

.warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>
