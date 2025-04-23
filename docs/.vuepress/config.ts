import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { getDirname, path } from "vuepress/utils";
import { viteBundler } from '@vuepress/bundler-vite';

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
    "@theme-hope/modules/info/components/PageInfo": path.resolve(__dirname, "components/PageInfo.js"),
    "@theme-hope/modules/info/components/PageViewInfo": path.resolve(__dirname, "components/PageViewInfo.vue"),
  },
  base: process.env.VITE_SITE_BASE as '/' | `/${string}/`,
  lang: "zh-CN",

  title: '《风声·谍战篇》FAQ',
  theme,

  head: [
    [
      "script",
      {
        src: "//unpkg.com/vue@3.5.13/dist/vue.global.prod.js",
      },
    ],
    [
      "script",
      {
        src: "//unpkg.com/vue-router@4.5.0/dist/vue-router.global.prod.js",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/axios@1.8.4/dist/axios.min.js",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//unpkg.com/element-plus@2.9.7/dist/index.css",
      },
    ],
    [
      "script",
      {
        src: "//unpkg.com/element-plus@2.9.8",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/chart.js@4.4.9",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0",
      },
    ],
  ],

  bundler: viteBundler({
    viteOptions: {
      worker: {
        rollupOptions: {
          external: [
            "vue",
            "vue-router",
            "axios",
            "element-plus",
            "chart.js",
            "chartjs-plugin-datalabels",
          ],
        },
      },
    }
  }),
});