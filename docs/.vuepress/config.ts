import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  alias: {
    "@GameStatus": path.resolve(__dirname, "components/GameStatus.vue"),
    "@SearchPlayer": path.resolve(__dirname, "components/SearchPlayer.vue"),
    "@RankList": path.resolve(__dirname, "components/RankList.vue"),
    "@WinRate": path.resolve(__dirname, "components/WinRate.vue"),
    "@DeckCard": path.resolve(__dirname, "components/DeckCard.vue"),
    "@DeckPie": path.resolve(__dirname, "components/DeckPie.vue"),
    "@Frequency": path.resolve(__dirname, "components/Frequency.vue"),
  },
  base: process.env.VITE_SITE_BASE as '/' | `/${string}/`,
  lang: "zh-CN",

  title: '《风声·谍战篇》FAQ',
  theme,
});