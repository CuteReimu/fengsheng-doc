<template>
  <el-row>
    <div style="display: flex">
      <ClientOnly>
        <el-autocomplete :fetch-suggestions="getHistory" v-model="name" placeholder="用户名" :debounce="0" @select="onClickRequest"></el-autocomplete>
      </ClientOnly>
    <el-button @click="onClickRequest" :disabled="!name">查询</el-button></div>
  </el-row>
  <el-row>
    <el-text size="large">{{ result }}</el-text>
  </el-row>
  <el-row v-if="result.indexOf('剩余精力：0') !== -1">
    <el-text size="small">如何获得精力？<router-link to="/document/welcome/score_and_season.md#精力系统">跳转到精力系统</router-link></el-text>
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

<script setup lang="ts">
import "element-plus/theme-chalk/dark/css-vars.css";
import { onMounted, ref } from "vue";
import Axios from "axios";
import { ElRow, ElText, ElAutocomplete, ElButton, ElTable, ElTableColumn } from "element-plus";
import { useRoute, useRouter } from "vue-router";

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
        if (line.indexOf("总场次") !== -1) {
          const searchHistory = getHistory().filter((v) => v.value !== name.value);
          searchHistory.unshift({value: name.value});
          if (searchHistory.length > 5) {
            searchHistory.pop();
          }
          localStorage.setItem("search_player_history", JSON.stringify(searchHistory));
        }
      });
      history.value.reverse();
    })
    .catch((error) => {
      console.error(error);
    });
};

const getHistory = () => {
  const history = localStorage.getItem("search_player_history");
  if (history) {
    return JSON.parse(history);
  } else {
    return [];
  }
};

onMounted(() => {
  name.value = route.query.name || "";
  if (name.value) doRequest();
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

.el-row {
  margin-top: 8px;
}

.el-table {
  margin-top: 12px;
}
</style>
