import {sidebar} from "vuepress-theme-hope";

export default sidebar([
  {
    text: '新手入门',
    collapsible: true,
    prefix: '/welcome',
    children: ['welcome', 'video_introduction', 'score_and_season'],
  },
  {
    text: '角色技能',
    collapsible: true,
    prefix: '/skills',
    children: ['base', 'extend1', 'extend2'],
  },
  {
    text: '官方规则',
    collapsible: true,
    prefix: '/guide',
    children: ['how_to_play', 'faq'],
  },
  {
    text: '个人攻略',
    collapsible: true,
    prefix: '/strategy',
    children: ['tech', 'simplified_rules'],
  },
]);
