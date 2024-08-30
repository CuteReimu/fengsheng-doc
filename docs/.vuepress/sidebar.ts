import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  {
    text: "新手入门",
    icon: "lightbulb",
    link: "/document/welcome/",
    prefix: "/document/welcome",
    children: "structure",
  },
  {
    text: "卡牌与身份",
    icon: "lightbulb",
    link: "/document/card/",
    prefix: "/document/card",
    children: "structure",
  },
  {
    text: "角色技能",
    icon: "address-book",
    link: "/document/skills/",
    prefix: "/document/skills",
    children: "structure",
  },
  {
    text: "官方规则",
    icon: "book",
    link: "/document/guide/",
    prefix: "/document/guide",
    children: "structure",
  },
  {
    text: "个人攻略",
    icon: "lightbulb",
    link: "/document/strategy/",
    prefix: "/document/strategy",
    children: "structure",
  },
]);
