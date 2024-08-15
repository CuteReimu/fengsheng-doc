import {sidebar} from "vuepress-theme-hope";

export default sidebar([
  {
    text: '新手入门',
    icon: 'lightbulb',
    link: '/welcome/',
    prefix: '/welcome',
    children: 'structure',
  },
  {
    text: '角色技能',
    icon: 'address-book',
    link: '/skills/',
    prefix: '/skills',
    children: 'structure',
  },
  {
    text: '官方规则',
    icon: 'book',
    link: '/guide/',
    prefix: '/guide',
    children: 'structure',
  },
  {
    text: '个人攻略',
    icon: 'lightbulb',
    link: '/strategy/',
    prefix: '/strategy',
    children: 'structure',
  },
]);
