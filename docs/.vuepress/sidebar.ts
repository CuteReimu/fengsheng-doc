import {sidebar} from "vuepress-theme-hope";

export default sidebar({
  '/document/': 'structure',
  '/develop/': 'structure',
  '/game_status': [
    {
      text: "观战",
      icon: "gamepad",
      link: "/game_status",
    },
    {
      text: "查询",
      icon: "magnifying-glass",
      link: "/search",
    },
  ],
  '/search': [
    {
      text: "观战",
      icon: "gamepad",
      link: "/game_status.md",
    },
    {
      text: "查询",
      icon: "magnifying-glass",
      link: "/search.md",
    },
  ],
  '/': false,
});
