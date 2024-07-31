import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'ZH-CN',

  title: '《风声·谍战篇》FAQ',
  head: [
    ["link", { rel: "icon", href: '/images/head.jpg' }],
  ],
  theme: defaultTheme({
    logo: '/images/head.jpg',
    navbar: [
      { text: '首页', link: '/' },
      { text: '新手入门', link: '/welcome' },
      {
        text: '角色技能',
        children: ['/skills/base', '/skills/extend1', '/skills/extend2'],
      },
      {
        text: '攻略文档',
        children: ['/guide/video_introduction', '/guide/how_to_play', '/guide/faq'],
      },
    ],

    sidebar: {
      '/welcome': 'heading',
      '/skills': ["base", "extend1", "extend2"],
      '/guide': ["video_introduction", "how_to_play", "faq"],
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
  ],
})
