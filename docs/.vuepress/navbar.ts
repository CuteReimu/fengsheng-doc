import {navbar} from "vuepress-theme-hope";

export default navbar([
  {
    text: '首页',
    icon: 'home',
    link: '/',
  },
  {
    text: '新手入门',
    icon: 'lightbulb',
    link: '/welcome/',
    activeMatch: '^/welcome/',
  },
  {
    text: '角色技能',
    icon: 'book',
    link: '/skills/',
    activeMatch: '^/skills/',
  },
  {
    text: '官方规则',
    icon: 'book',
    link: '/guide/',
    activeMatch: '^/guide/',
  },
  {
    text: '个人攻略',
    icon: 'lightbulb',
    link: '/strategy/',
    activeMatch: '^/strategy/',
  },
  {
    text: '历史赛季',
    icon: 'trophy',
    link: '/toplist',
  },
  {
    text: '游戏状态',
    icon: 'gamepad',
    link: '/game_status',
  },
]);
