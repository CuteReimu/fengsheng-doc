import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import dotenv from 'dotenv'
import * as path from "node:path";

dotenv.config({path: path.resolve(process.cwd(), '.env.local')})
dotenv.config()

export default defineUserConfig({
  lang: 'ZH-CN',

  title: '《风声·谍战篇》FAQ',
  head: [
    ["link", { rel: "icon", href: '/images/head.jpg' }],
  ],
  theme: defaultTheme({
    logo: '/images/head.jpg',
    lastUpdatedText: "修改日期",
    contributorsText: "贡献者",
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '新手入门',
        prefix: '/welcome',
        children: ['welcome', 'video_introduction', 'score_and_season'],
      },
      {
        text: '角色技能',
        prefix: '/skills',
        children: ['base', 'extend1', 'extend2'],
      },
      {
        text: '攻略文档',
        children: [
          {
            text: '官方规则',
            prefix: '/guide',
            children: ['how_to_play', 'faq'],
          },
          {
            text: '个人攻略',
            prefix: '/strategy',
            children: [
              'tech',
              {
                text: '规则速览',
                link: 'simplified_rules'
              },
            ],
          }
        ],
      },
      { text: '历史赛季', link: '/toplist' },
      {text: '游戏状态', link: '/game_status'},
    ],

    sidebar: {
      '/welcome': ['welcome', 'video_introduction', 'score_and_season'],
      '/skills': ["base", "extend1", "extend2"],
      '/guide': ["how_to_play", "faq"],
      '/strategy': ['tech'],
      '/toplist': 'heading',
      '/game_status': false,
    }
  }),

  bundler: viteBundler(),

  plugins: [
    mdEnhancePlugin({
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
      ],
    }),
    searchProPlugin({
      indexContent: true,
    }),
  ],
})
