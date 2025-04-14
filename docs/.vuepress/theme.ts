import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import linksCheck from "./linksCheck.js";
import routeLocales from "./routeLocales.js";

import dotenv from 'dotenv';
import * as path2 from "node:path";

dotenv.config({path: path2.resolve(process.cwd(), '.env.local')})
dotenv.config()

export default hopeTheme({
  favicon: "/images/head.jpg",
  hostname: process.env.VITE_HOST_NAME || null,
  repo: "https://github.com/CuteReimu/fengsheng-doc",
  docsDir: "docs",
  docsBranch: "master",
  logo: "/images/head.jpg",
  darkmode: "disable",
  fullscreen: true,
  print: false,
  pageInfo: ["Author", "PageView", "Date", "ReadingTime"],
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Language", "Repo", "Outlook", "Search"],
  },
  routeLocales,

  encrypt: {
    config: {
      "/search": {password: ["fs"], hint: "在群里输入“查询密码”可获取密码。"},
      "/ranklist": {password: ["fs"], hint: "在群里输入“查询密码”可获取密码。"},
    },
  },

  navbar,

  sidebar,

  markdown: {
    // 代码块
    highlighter: {
      type: "shiki",
      langs: ["kotlin", "python", "java", "erlang", "elixir", "console"],
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
      lineNumbers: false,
      notationErrorLevel: true,
      notationWordHighlight: true,
    },
    // 开启标记
    mark: true,
    // 开启属性支持
    attrs: true,
    // 剧透
    spoiler: true,
    // 使用chart.js
    chartjs: false,
    // 使用思维导图
    markmap: true,
    // 脚注
    footnote: true,
    // 任务列表
    tasklist: true,
    // mermaid
    mermaid: true,
    // 样式化
    stylize: [
      {
        matcher: /^红色?$/,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "red" },
              content: content,
            };
        },
      },
      {
        matcher: /^蓝色?$/,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "blue" },
              content: content,
            };
        },
      },
      {
        matcher: /^绿色?$/,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "green" },
              content: content,
            };
        },
      },
      {
        matcher: /^黑色?$/,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "black" },
              content: content,
            };
        },
      },
      {
        matcher: "潜伏战线",
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "red" },
              content: content,
            };
        },
      },
      {
        matcher: "特工机关",
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "blue" },
              content: content,
            };
        },
      },
      {
        matcher: "神秘人",
        replacer: ({ tag, attrs, content }) => {
          if (tag === "strong")
            return {
              tag: tag,
              attrs: { ...attrs, class: "green" },
              content: content,
            };
        },
      },
      {
        matcher: /^./,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "s")
            return {
              tag: tag,
              attrs: { ...attrs, style: "color: #999" },
              content: content,
            };
        },
      },
    ],
    // 支持容器
    hint: true,
    // 支持数学公式
    math: {
      type: "katex",
    },
    // 支持代码块分组
    codeTabs: true,
    linksCheck,
  },

  plugins: {
    icon: {
      assets: "fontawesome",
    },
    slimsearch: {
      indexContent: true,
      suggestion: true,
      filter: (page) => page.path.startsWith("/document/"),
    },
    sitemap: false,
    seo: false,
    git: {
      contributors: {
        info: [
          {
            username: "CuteReimu",
            name: "奇葩の灵梦",
            alias: ["奇葩の灵梦"],
          },
          {
            username: "Death-alter",
            name: "Death",
            alias: ["Death"],
          },
          {
            username: "planetmiku",
            name: "惑星",
            alias: ["惑星"],
          },
          {
            username: "HagridThick",
            name: "二宽",
            alias: ["二宽", "徐晨鸥"],
          }
        ],
        avatar: true,
      }
    }
  },

  footer:
    "我们的项目完全开源，如果你想要对项目做贡献，可以前往我们的" +
    '  <a href="https://github.com/CuteReimu/TheMessage" class="external-link" target="_blank" rel="noopener noreferrer">服务端代码仓库</a>' +
    "  和" +
    '  <a href="https://github.com/Death-alter/TheMessage" class="external-link" target="_blank" rel="noopener noreferrer">客户端代码仓库</a>' +
    "  。",
  copyright: false,
  displayFooter: true,
});
