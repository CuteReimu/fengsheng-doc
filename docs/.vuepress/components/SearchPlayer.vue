<template>
  <el-row>
    <div style="display: flex">
    <el-input v-model="name" placeholder="用户名"></el-input>
    <el-button @click="onClickRequest" :disabled="!name">查询</el-button></div>
  </el-row>
  <el-row>
    <el-text size="large">{{ result }}</el-text>
  </el-row>
  <el-table border :data="winRate" v-if="winRate.length > 0">
    <el-table-column prop="role" label="身份"></el-table-column>
    <el-table-column prop="win_rate" label="胜率"></el-table-column>
    <el-table-column prop="ave_win_rate" label="平均胜率"></el-table-column>
    <el-table-column prop="count" label="场次"></el-table-column>
  </el-table>
  <el-table border :data="history" v-if="history.length > 0">
    <el-table-column prop="role" label="角色"></el-table-column>
    <el-table-column prop="alive" label="存活"></el-table-column>
    <el-table-column prop="identity" label="身份"></el-table-column>
    <el-table-column prop="is_win" label="胜负"></el-table-column>
    <el-table-column prop="tier" label="段位"></el-table-column>
    <el-table-column prop="score" label="分数"></el-table-column>
  </el-table>
</template>

<script setup>
import "element-plus/theme-chalk/dark/css-vars.css";
import {onMounted, ref} from "vue";
import Axios from "axios";
import { ElRow, ElText, ElInput, ElButton, ElTable, ElTableColumn } from "element-plus";
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const router = useRouter();

const name = ref("");
const result = ref("");
const winRate = ref([]);
const history = ref([]);

const onClickRequest = () => {
  router.push({ path: route.path, query: { name: name.value } });
  doRequest();
};
const doRequest = () => {
  const url = import.meta.env.VITE_REQUEST_URL.replace("getallgames", "getscore?name=" + name.value)
  Axios.get(url, {})
    .then((response) => {
      let is_win_rate = false;
      let is_history = false;
      result.value = "";
      winRate.value = [];
      history.value = [];
      response.data.result.split("\n").forEach((line) => {
        if (!line) return;
        if (line === "---------------------------------") {
          if (!is_win_rate) {
            is_win_rate = true;
          } else {
            is_win_rate = false;
            is_history = true;
          }
          return;
        }
        if (line.startsWith("剩余精力")) {
          result.value += "，" + line;
        } else if (line.startsWith("身份\t 胜率\t 平均胜率\t 场次") || line.startsWith("最近") && line.endsWith("场战绩")) {
        } else if (is_win_rate) {
          const [role, win_rate, ave_win_rate, count] = line.split("\t").map((x) => x.trim());
          winRate.value.push({ role, win_rate, ave_win_rate, count });
        } else if (is_history) {
          const [role0, identity0, is_win, tier, score] = line.split(",");
          const identity = identity0.replace("神秘人[", "").replace("]", "");
          const role = role0.replace("(死亡)", "");
          const alive = role0.includes("(死亡)") ? "死亡" : "存活";
          history.value.push({ role, alive, identity, is_win, tier, score });
        } else {
          result.value += line;
        }
      });
      history.value.reverse();
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  name.value = route.query.name || "";
  if (name.value) doRequest();
})
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

.el-row {
  margin-top: 8px;
}

.el-table {
  margin-top: 12px;
}
</style>
