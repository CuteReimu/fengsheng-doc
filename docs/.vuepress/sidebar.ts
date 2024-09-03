import {sidebar} from "vuepress-theme-hope";

export default sidebar({
  '/document/': [
    {
      text: "新手入门",
      icon: "lightbulb",
      link: "/document/welcome/",
      prefix: "welcome",
      children: "structure",
    },
    {
      text: "卡牌与身份",
      icon: "lightbulb",
      link: "/document/card/",
      prefix: "card",
      children: "structure",
    },
    {
      text: "角色技能",
      icon: "address-book",
      link: "/document/skills/",
      prefix: "skills",
      children: "structure",
    },
    {
      text: "官方规则",
      icon: "book",
      link: "/document/guide/",
      prefix: "guide",
      children: "structure",
    },
    {
      text: "个人攻略",
      icon: "lightbulb",
      link: "/document/strategy/",
      prefix: "strategy",
      children: "structure",
    },
  ],
  '/develop/': 'structure',
  '/': false,
});
