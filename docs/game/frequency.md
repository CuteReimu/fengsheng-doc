---
title: 近期活跃
icon: chart-line
order: 4
author: "奇葩的灵梦"
pageInfo: [ "Author", "PageView", "Date" ]
breadcrumb: false
editLink: false
next: false
prev: false
toc: false
gitInclude:
  - ../.vuepress/components/Frequency.vue
---

<Frequency></Frequency>

::: note 说明
**近期每日活跃度**图中，“**参与人次**”仅含真人玩家。例如，一场游戏中有 2 个真人玩家，则**参与人次**会加 2 。

满足以下任一条件的对局才会被统计：
- 对局中有至少 2 名真人玩家
- 对局中仅有 1 名真人玩家，其分数不少于 100

:::

<script setup>
import Frequency from "@Frequency";
</script>
