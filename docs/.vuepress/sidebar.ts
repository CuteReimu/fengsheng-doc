import {sidebar} from "vuepress-theme-hope";

export default sidebar({
  '/document/': 'structure',
  '/develop/': 'structure',
  '/toplist': [
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
    {
      text: "排行",
      icon: "trophy",
      link: "/ranklist",
    },
    {
      text: "历史赛季",
      icon: "trophy",
      link: "/toplist",
    },
  ],
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
    {
      text: "排行",
      icon: "trophy",
      link: "/ranklist",
    },
    {
      text: "历史赛季",
      icon: "trophy",
      link: "/toplist",
    },
  ],
  '/search': [
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
    {
      text: "排行",
      icon: "trophy",
      link: "/ranklist",
    },
    {
      text: "历史赛季",
      icon: "trophy",
      link: "/toplist",
    },
  ],
  '/ranklist': [
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
    {
      text: "排行",
      icon: "trophy",
      link: "/ranklist",
    },
    {
      text: "历史赛季",
      icon: "trophy",
      link: "/toplist",
    },
  ],
  '/': false,
});
