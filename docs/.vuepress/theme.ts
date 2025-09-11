import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

import dotenv from 'dotenv';
import * as path2 from "node:path";

dotenv.config({path: path2.resolve(process.cwd(), '.env.local'), override: true})
dotenv.config()

export default hopeTheme({
  author: {
    name: "奇葩的灵梦",
    url: "https://cutereimu.cn",
  },
  favicon: "/images/head.jpg",
  hostname: process.env.VITE_HOST_NAME || null,
  repo: "https://github.com/CuteReimu/fengsheng-doc",
  docsDir: "docs",
  docsBranch: "master",
  logo: "/images/head.jpg",
  darkmode: "disable",
  fullscreen: true,
  print: true,
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Language", "Repo", "Outlook", "Search"],
  },

  navbar,

  sidebar,

  markdown: {
    attrs: true,
    // 开启标记
    mark: true,
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
    linksCheck: {
      build: "error",
    },
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
    redirect: false,
    sitemap: false,
    seo: false,
    git: {
      contributors: {
        info: [
          {
            username: "CuteReimu",
            name: "奇葩的灵梦",
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
      },
    },

    photoSwipe: false,
  },

  footer: process.env.VITE_FOOTER,
  license: "CC BY-NC-SA 4.0",
  copyright: '© 2025 奇葩的灵梦 | 基于 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="noopener noreferrer" target="_blank">CC BY-NC-SA 4.0</a> 共享',
}, { custom: true });
