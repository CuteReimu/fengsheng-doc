import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { getDirname, path } from "vuepress/utils";
import { viteBundler } from '@vuepress/bundler-vite';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  alias: {
    "@DeckCard": path.resolve(__dirname, "components/DeckCard.vue"),
    "@DeckPie": path.resolve(__dirname, "components/DeckPie.vue"),
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
            "chart.js",
            "chartjs-plugin-datalabels",
          ],
        },
      },
    }
  }),
});