import theme from "./theme.js";
import {defineUserConfig} from 'vuepress';
import {viteBundler} from '@vuepress/bundler-vite';
import dotenv from 'dotenv';
import * as path from "node:path";

dotenv.config({path: path.resolve(process.cwd(), '.env.local')})
dotenv.config()

export default defineUserConfig({
  lang: "zh-CN",

  title: '《风声·谍战篇》FAQ',
  head: [
    ["link", {rel: "icon", href: '/images/head.jpg'}],
  ],
  theme,

  bundler: viteBundler(),
})
