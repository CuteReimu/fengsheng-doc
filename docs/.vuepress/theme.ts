import {hopeTheme} from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  iconAssets: "fontawesome",
  repo: 'https://github.com/CuteReimu/fengsheng-doc',
  docsDir: 'docs',
  docsBranch: 'master',
  logo: '/images/head.jpg',
  darkmode: 'toggle',
  print: false,
  fullscreen: true,
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Language", "Repo", "Outlook", "Search"],
  },

  navbar,

  sidebar,

  plugins: {
    mdEnhance: {
      // 开启标记
      mark: true,
      // 启用提示容器
      hint: true,
      // 开启属性支持
      attrs: true,
      // 使用 KaTeX 启用 TeX 支持
      katex: true,
      // 样式化
      stylize: [
        {
          matcher: /^红色?$/,
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "red"},
                content: content,
              };
          },
        },
        {
          matcher: /^蓝色?$/,
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "blue"},
                content: content,
              };
          },
        },
        {
          matcher: /^绿色?$/,
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "green"},
                content: content,
              };
          },
        },
        {
          matcher: /^黑色?$/,
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "black"},
                content: content,
              };
          },
        },
        {
          matcher: "潜伏战线",
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "red"},
                content: content,
              };
          },
        },
        {
          matcher: "特工机关",
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "blue"},
                content: content,
              };
          },
        },
        {
          matcher: "神秘人",
          replacer: ({tag, attrs, content}) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: {...attrs, class: "green"},
                content: content,
              };
          },
        },
      ],
    },
    searchPro: {
      indexContent: true,
      filter: (page) => page.path.indexOf('/', 1) !== -1,
    },
    photoSwipe: false,
    notice: [{
      path: "/",
      title: "已知bug",
      content: "<ul><li>在争夺阶段有人进入濒死状态，盛老板发动技能<strong>如臂指使</strong>查看其他角色手牌时，无法令其他角色使用澄清。</li><li>李书云发动技能<strong>定论</strong>将待收情报收归手牌时，在手牌中并没有这张牌。</li></ul>",
      showOnce: true,
    }],
  },

  footer: "我们的项目完全开源，如果你想要对项目做贡献，可以前往我们的" +
    "  <a href=\"https://github.com/CuteReimu/TheMessage\" class=\"external-link\" target=\"_blank\" rel=\"noopener noreferrer\">服务端代码仓库</a>" +
    "  和" +
    "  <a href=\"https://github.com/Death-alter/TheMessage\" class=\"external-link\" target=\"_blank\" rel=\"noopener noreferrer\">客户端代码仓库</a>" +
    "  。",
  copyright: false,
  displayFooter: true,
});