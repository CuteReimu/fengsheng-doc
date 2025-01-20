import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import dotenv from 'dotenv';
import * as path2 from "node:path";
import ElementPlus from 'unplugin-element-plus/vite';
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

dotenv.config({path: path2.resolve(process.cwd(), '.env.local')})
dotenv.config()

export default defineUserConfig({
  alias: {
    "@GameStatus": path.resolve(__dirname, "components/GameStatus.vue"),
    "@SearchPlayer": path.resolve(__dirname, "components/SearchPlayer.vue"),
  },
  lang: "zh-CN",

  title: '《风声·谍战篇》FAQ',
  head: [
    ["link", { rel: "icon", href: '/images/head.jpg' }],
  ],
  theme,
  bundler: viteBundler({
    viteOptions: {
      ssr: { noExternal: ['element-plus'] },
      plugins: [
        ElementPlus({}),
      ],
    }
  }),
});