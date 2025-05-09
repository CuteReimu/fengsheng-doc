import {sidebar} from "vuepress-theme-hope";

export default sidebar({
  '/document/': [
    {
      text: '卡牌与身份',
      icon: 'lightbulb',
      prefix: 'card/',
      children: 'structure',
    },
    {
      text: '角色列表',
      icon: 'address-book',
      prefix: 'skills/',
      children: 'structure',
    },
    {
      text: '玩家攻略',
      icon: 'lightbulb',
      prefix: 'strategy/',
      children: 'structure',
    }
  ],
  '/': false,
});
