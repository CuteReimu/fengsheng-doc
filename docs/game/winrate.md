---
title: 胜率
icon: percent
order: 2
author: "奇葩の灵梦"
pageInfo: [ "Author", "PageView", "Date" ]
breadcrumb: false
editLink: false
next: false
prev: false
toc: false
---

<WinRate></WinRate>

::: note 说明
- 图中的数据排除了部分“低质量对局”，同时排除了机器人的战绩。
- 图中横向的虚线是所有角色胜率的中位数，**位置越上**的角色胜率越高，说明**强度越高**。
- **位置越右**的角色出场次数越多，说明统计的数据量越大，胜率**数值越可信**。
- 位置越右的角色越受欢迎，但会受到另外一些因素的影响：
  - 二扩角色出得较晚，因此位置偏左其实是因为统计量不够。
  - 如果基础角色的位置仍然偏左，那显然是非常不受欢迎了。
:::

<script setup>
import WinRate from "@WinRate";
</script>