<template>
  <div style="margin-bottom: 10px;">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPage"
      :page-size="20"
      @current-change="currentChange"
    />
  </div>
  <div>
    <el-table border :data="result2">
      <el-table-column prop="rank" label="名次"></el-table-column>
      <el-table-column label="玩家">
        <template #default="scope">
          <router-link :to="'search.md?name='+result2[scope.$index].name" >
            {{result2[scope.$index].name}}
          </router-link>
        </template></el-table-column>
      <el-table-column prop="tier" label="段位"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import "element-plus/theme-chalk/dark/css-vars.css";
import { onMounted, ref, computed } from "vue";
import Axios from "axios";
import {ElPagination, ElTable, ElTableColumn} from "element-plus";

const result = ref([]);

const result2 = computed(() => {
  return result.value.slice((currentPage.value-1)*20, currentPage.value*20);
});

const currentPage = ref(1);

const currentChange = n => {
  currentPage.value = n;
};

const totalPage = computed(() => Math.ceil(result.value.length))

const doRequest = () => {
  Axios.get(import.meta.env.VITE_REQUEST_URL.replace("getallgames", "ranklist2"), {})
    .then((response) => {
      let value = [];
      response.data.result.split("\n").forEach((line) => {
        if (!line) return;
        let arr = line.split(/[：·]/);
        value.push({"rank": arr[0], "name": arr[1], "tier": arr[2], "score": arr[3]});
      });
      result.value = value;
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  doRequest();
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
