import {navbar} from "vuepress-theme-hope";

export default navbar([
  {
    text: '首页',
    icon: 'home',
    link: '/',
  },
  {
    text: '文档',
    icon: 'book',
    link: '/document/welcome/welcome.md',
    activeMatch: '^/document/',
  },
  {
    text: '开发',
    icon: 'code',
    link: '/develop/server/kotlin_intro.md',
    activeMatch: '^/develop/',
  },
  {
    text: '赛季',
    icon: 'trophy',
    link: '/toplist',
  },
  {
    text: '观战',
    icon: 'gamepad',
    link: '/game_status',
  },
]);
