import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress/cli'
import {viteBundler} from '@vuepress/bundler-vite'
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'ZH-CN',

  title: '《风声·谍战篇》FAQ',
  description: '这是《风声·谍战篇》相关的FAQ文档',

  theme: defaultTheme({
    logo: '/images/head.jpg',

    navbar: [
      {text: '首页', link: '/'},
      {text: '新手入门', link: '/welcome'},
      {
        text: '角色技能',
        children: ['/skills/base', '/skills/extend1', '/skills/extend2'],
      },
      {text: 'FAQ', link: '/faq'},
      {
        text: '新手攻略',
        children: ['/guide/video_introduction'],
      },
    ],

    sidebar: {
      '/welcome': 'heading',
      '/skills': [
        {
          title: "角色技能",
          collapsible: false,
          children: ["base", "extend1", "extend2"],
        }
      ],
      '/faq': 'heading',
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
          matcher: /^红色?/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: red;" },
                content: content,
              };
          },
        },
        {
          matcher: /^蓝色?/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: blue;" },
                content: content,
              };
          },
        },
        {
          matcher: /^绿色?/,
          replacer: ({ tag,  attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: green;" },
                content: content,
              };
          },
        },
        {
          matcher: /^黑色?/,
          replacer: ({ tag,  attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: black;" },
                content: content,
              };
          },
        },
        {
          matcher: "潜伏",
          replacer: ({ tag, attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: red;" },
                content: content,
              };
          },
        },
        {
          matcher: "军情",
          replacer: ({ tag, attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: blue;" },
                content: content,
              };
          },
        },
        {
          matcher: "神秘人",
          replacer: ({ tag,  attrs, content }) => {
            if (tag === "strong")
              return {
                tag: tag,
                attrs: { ...attrs, style: "color: green;" },
                content: content,
              };
          },
        },
      ],
    }),
  ],
})
