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
        children: ['/skills/base', '/skills/extend1'],
      },
    ],

    sidebar: {
      '/skills': [
        {
          title: "角色技能",
          collapsible: false,
          children: ["base", "extend1"],
        }
      ]
    }
  }),

  bundler: viteBundler(),

  plugins: [
    mdEnhancePlugin({
      // 开启标记
      mark: true,
    }),
  ],
})
