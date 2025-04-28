import {navbar} from "vuepress-theme-hope";

export default navbar([
  {
    text: '首页',
    icon: 'home',
    link: '/',
  },
  {
    text: '规则文档',
    icon: 'book',
    link: '/document/',
    activeMatch: '^/document/',
  },
]);
