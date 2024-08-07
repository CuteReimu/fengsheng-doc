import {navbar} from "vuepress-theme-hope";

export default navbar([
  {text: '首页', link: '/'},
  {
    text: '新手入门',
    link: '/welcome/welcome.md',
    activeMatch: '^/welcome/',
  },
  {
    text: '角色技能',
    link: '/skills/base.md',
    activeMatch: '^/skills/',
  },
  {
    text: '官方规则',
    link: '/guide/how_to_play.md',
    activeMatch: '^/guide/',
  },
  {
    text: '个人攻略',
    link: '/strategy/tech.md',
    activeMatch: '^/strategy/',
  },
  {text: '历史赛季', link: '/toplist'},
  {text: '游戏状态', link: '/game_status'},
]);
