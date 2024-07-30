import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress/cli'
import {viteBundler} from '@vuepress/bundler-vite'
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  lang: 'ZH-CN',

  title: '《风声·谍战篇》FAQ',
  description: '这是《风声·谍战篇》相关的FAQ文档',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      {text: '首页', link: '/'},
      {
        text: '角色技能',
        children: ['/skills/base', '/skills/extend1', '/skills/extend2'],
      },
    ],

    sidebar: {
      '/skills': [
        {
          title: "角色技能",
          collapsible: false,
          children: ["base", "extend1", "extend2"],
        }
      ]
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
      ],
    }),
  ],
})
