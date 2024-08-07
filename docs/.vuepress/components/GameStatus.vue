<template>
  <el-row style="margin-top: 10px">
    <el-button plain @click="doRequest">刷新</el-button>
  </el-row>
  <el-row>
    <el-text v-if="gs.length === 0" size="large" style="margin-top: 10px"
      >当前没有房间</el-text
    >
  </el-row>
  <el-row v-for="game in gs">
    <el-text style="margin: 10px 0"
      >房间-{{ game.id }}（{{
        game.turn === 0
          ? "未开局"
          : "第" +
            game.turn +
            "回合，已开局" +
            (game.play_time / 60000).toFixed(0) +
            "分钟"
      }}）</el-text
    >
    <el-table :data="game.players" border>
      <el-table-column prop="name" label="玩家" :min-width="140" />
      <el-table-column prop="role_name" label="角色" :min-width="90" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-text v-html="getStatus(game.players[scope.$index])" />
        </template>
      </el-table-column>
      <el-table-column prop="cards" label="手牌数" />
      <el-table-column label="情报" :min-width="150">
        <template #default="scope">
          <el-button
            type="danger"
            circle
            v-if="game.players[scope.$index].message_cards.length >= 3"
          >
            {{ game.players[scope.$index].message_cards[1] }}
          </el-button>
          <el-button
            type="primary"
            circle
            v-if="game.players[scope.$index].message_cards.length >= 3"
          >
            {{ game.players[scope.$index].message_cards[2] }}
          </el-button>
          <el-button
            type="info"
            circle
            v-if="game.players[scope.$index].message_cards.length >= 3"
          >
            {{ game.players[scope.$index].message_cards[0] }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Axios from "axios";
import { ElRow, ElText, ElButton, ElTable, ElTableColumn } from "element-plus";

const gs = ref([]);

const getStatus = (player) => {
  if (!player.alive) {
    return "已死亡";
  }
  if (player.is_turn) {
    return "回合";
  }
  return "";
};

const doRequest = () => {
  Axios.get(import.meta.env.VITE_REQUEST_URL, {})
    .then((response) => {
      gs.value = response.data;
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
