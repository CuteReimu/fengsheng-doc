import {sidebar} from "vuepress-theme-hope";

export default sidebar([
  {
    text: '新手入门',
    icon: 'lightbulb',
    collapsible: true,
    prefix: '/welcome',
    children: ['welcome.md', 'video_introduction.md', 'score_and_season.md', 'welcome_simplified.md'],
  },
  {
    text: '角色技能',
    icon: 'address-book',
    collapsible: true,
    prefix: '/skills',
    children: ['base.md', 'extend1.md', 'extend2.md'],
  },
  {
    text: '官方规则',
    icon: 'book',
    collapsible: true,
    prefix: '/guide',
    children: ['how_to_play.md', 'announcement.md', 'faq.md', 'advanced.md'],
  },
  {
    text: '个人攻略',
    icon: 'lightbulb',
    collapsible: true,
    prefix: '/strategy',
    children: ['how_to_select_role.md', 'tech.md', 'simplified_rules.md'],
  },
]);
