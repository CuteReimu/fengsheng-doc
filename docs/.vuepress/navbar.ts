import {navbar} from "vuepress-theme-hope";

export default navbar([
  {
    text: '首页',
    icon: 'home',
    link: '/',
  },
  {
    text: 'FAQ文档',
    icon: 'book',
    link: '/document/welcome/welcome.md',
    activeMatch: '^/document/',
  },
  {
    text: '开发相关',
    icon: 'code',
    link: '/develop/',
    activeMatch: '^/develop/',
  },
  {
    text: '游戏状态',
    icon: 'gamepad',
    prefix: '/game/',
    activeMatch: '^/game/',
    children: [
      'game_status.md',
      'search.md',
      'winrate.md',
      'frequency.md',
      'ranklist.md',
    ]
  },
]);
