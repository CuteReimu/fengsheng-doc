import {sidebar} from "vuepress-theme-hope";

export default sidebar([
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
]);
