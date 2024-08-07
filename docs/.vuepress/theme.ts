import {hopeTheme} from "vuepress-theme-hope";

export default hopeTheme({
  logo: '/images/head.jpg',
  darkmode: 'toggle',
  print: false,
  fullscreen: true,
  navbar: [
    {text: '首页', link: '/'},
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
          children: [
            {text: '游戏说明书', link: 'how_to_play'},
            {text: '官方FAQ 2.0', link: 'faq'},
          ],
        },
        {
          text: '个人攻略',
          prefix: '/strategy',
          children: [
            {text: '基本技巧', link: 'tech'},
            {text: '规则速览', link: 'simplified_rules'},
          ],
        }
      ],
    },
    {text: '历史赛季', link: '/toplist'},
    {text: '游戏状态', link: '/game_status'},
  ],

  sidebar: [
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
      text: '官方规则',
      prefix: '/guide',
      children: [
        {text: '游戏说明书', link: 'how_to_play'},
        {text: '官方FAQ 2.0', link: 'faq'},
      ],
    },
    {
      text: '个人攻略',
      prefix: '/strategy',
      children: [
        {text: '基本技巧', link: 'tech'},
        {text: '规则速览', link: 'simplified_rules'},
      ],
    },
  ],

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

  breadcrumb: false,
});