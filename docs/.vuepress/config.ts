import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  alias: {
    "@DeckCard": path.resolve(__dirname, "components/DeckCard.vue"),
    "@DeckPie": path.resolve(__dirname, "components/DeckPie.vue"),
  },
  base: process.env.VITE_SITE_BASE as '/' | `/${string}/`,
  lang: "zh-CN",

  title: '《风声》桌游规则整理',
  theme,
});