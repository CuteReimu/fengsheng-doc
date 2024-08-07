import {hopeTheme} from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  logo: '/images/head.jpg',
  darkmode: 'toggle',
  print: false,
  fullscreen: true,
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
  },

  footer: "我们的项目完全开源，如果你想要对项目做贡献，可以前往我们的" +
    "  <a href=\"https://github.com/CuteReimu/TheMessage\" class=\"external-link\" target=\"_blank\" rel=\"noopener noreferrer\">服务端代码仓库</a>" +
    "  和" +
    "  <a href=\"https://github.com/Death-alter/TheMessage\" class=\"external-link\" target=\"_blank\" rel=\"noopener noreferrer\">客户端代码仓库</a>" +
    "  。",
  copyright: false,
  displayFooter: true,
});