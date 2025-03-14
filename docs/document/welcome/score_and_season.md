---
icon: trophy
order: -2
author: 奇葩の灵梦
---

# 排行与赛季

*本篇是针对线上的特殊系统的数据解读，如果你不关心这些深入的问题可以忽略。*

## 精力系统

为了避免玩家一直打人机局，我们引入了精力系统。

1. 新注册有10精力，每次打一局人机局会消耗1精力，精力不够不能进行人机局。
2. 每天在群里输入`签到`可以随机获得1到3精力，运气爆棚可以获得4精力。<span class="red">如果超过一周未进行游戏，则无法通过签到获得精力。</span>
3. 只要有至少一个真人和你一起玩，你不光不会消耗精力，还会获得 $\text{本局游戏真人数}\times 2$ 精力。胜利方还会额外加 $\text{本局游戏真人数}\times 2$ 排位分数。
4. 优化游卡风声的代码或者写游卡风声相关的文档可以获得**大量精力奖励**，详情可以在群里询问。

## 排位分数与段位

**排位分数**是一个反映你实力的数值，数值越高代表你的实力越强。可以在群里输入`排行`来查看当前大家的分数。

[详细的排位分数计算方法](#详细的排位分数计算方法)由于篇幅很长，放在了本文末，感兴趣的可以前往了解。

为了让新人更好的上分，我们对低段位进行了段位保护：

- 如果你的分数低于360分（其实是362分），则每60分会有四次段位保护，例如你当前分数是365分，不管应该输多少分都只会掉到362分，再输一次掉到361分，直到掉到359分才会失去保护。
- 如果你的分数低于180分，则每10分会有一次段位保护，例如你当前分数是172分，不管应该输多少分都只会掉到170分。和上一条同时生效。
- 如果你的分数低于60分，则每局最多掉2分。和前两条同时生效。
- 不会掉到0分以下。

太长不看：!!最低0分。低于60分每局最多掉2分。只要高于以下分数，无论一局掉多少分，最多掉到该分数，再输一局才会继续掉：0~180分每隔10分，0~2、59~62、119~122、179~182、239~242、299~302、359~362中的每1分。!!

另外，在加入了人机之后，我们为了鼓励真人局，还会有额外的真人局奖励，具体可以在上面的[精力系统](#精力系统)中查看。

**这里列出了段位分数对照表**

|      段位       |     分数      |     备注     |
|:-------------:|:-----------:|:----------:|
|  ☀️ X - ☀️ I  |   ≥ 2000    | 每100分一个小段位 |
|  👑 V - 👑 I  | 1500 - 1999 | 每100分一个小段位 |
|  💎 V - 💎 I  | 1000 - 1499 | 每100分一个小段位 |
|  💍 V - 💍 I  |  600 - 999  | 每80分一个小段位  |
| 🏅 III - 🏅 I |  360 - 599  | 每80分一个小段位  |
| 🏅 V - 🏅 IV  |  240 - 359  | 每60分一个小段位  |
| 🥈 III - 🥈 I |  60 - 239   | 每60分一个小段位  |
| 🥉 III - 🥉 I |   0 - 59    | 每20分一个小段位  |

## 赛季

从2024年1月开始，我们正式进入了每三个月一个赛季的模式。赛季结算时，所有人的赛季场次和胜场都会清空，段位分数会减半。并且会以赛季中达到过的最高分数进行排名，实力较强者会上榜到[历史赛季](/toplist.md)页面。

除此之外，还会根据当前赛季达到的最高段位获得赛季勋章，在游戏中可以看到历史获得的勋章。

| 当前赛季最高段位 | 获得勋章 |
|:--------:|:----:|
|   ☀️ I   |  ☀️  |
|   👑 I   |  👑  |
| 💎 I 以上  |  💎  |
| 💍 I 以上  |  💍  |
| 🏅 I 以上  |  🏅  |
| 🏅 II 以下 |  无   |

## 详细的排位分数计算方法

*以下为详细的排位分数计算方法，较为复杂，对此不感兴趣的可以忽略。*

::: important 重要
以下所说的**身份**和[**神秘人**任务](../card/secret_task.md)，都指的是游戏开始时分发的，游戏过程中因为技能改变的不算。
:::

如果你的身份是**潜伏战线**或**特工机关**，那么你会有固定的输赢分数变化：

| 人数 | 赢   | 输   |
|----|-----|-----|
| 5  | +14 | -7  |
| 6  | +21 | -7  |
| 7  | +24 | -12 |
| 8  | +36 | -12 |
| 9  | +48 | -12 |

然后我们可以根据过往的游戏数据得到不同[**神秘人**任务](../card/secret_task.md)胜率。如果你的身份是**神秘人**：

- 如果你赢了，则得分为 $\text{上述固定分数}\times\dfrac{\text{所有身份平均胜率}}{\text{神秘任务的胜率}}$

- 如果你输了，则扣分为 $\text{上述固定分数}\times\dfrac{100\%-\text{所有身份平均胜率}}{100\%-\text{神秘任务的胜率}}$

::: tip 举例
你是5人局[双面间谍](../card/secret_task.md)，所有身份人均胜率为 $34.88\%$ ，双面间谍胜率为 $29.71\%$ ：

- 你赢了的得分为 $14\times\dfrac{34.88\%}{29.71\%} \simeq 16.436$

- 你输了的扣分为 $7\times\dfrac{100\%-34.88\%}{100\%-29.71\%} \simeq 5.677$
:::

::: info 特别说明

1. 上述所说的不同[**神秘人**任务](../card/secret_task.md)胜率只计算**不含人机**的对局，并且会根据实时胜率动态变化。
2. 如果是9人局，因为样本太少，则取8人局的胜率。
3. 某些身份胜率过低或过高（与样本太少也有关），倍率会变得很大，可能会出现赢一局获得几百分的不可控情况，影响公平性。因此我们取 $8\%$ ~ $50\%$ 为合理的胜率区间，超出这个区间的胜率会被限制在这个区间内进行计算。

:::

::: code-tabs#code

@tab Kotlin

```kotlin
// if (你是神秘人) {
    // allWinRate 为所有身份平均胜率，secretWinRate 为神秘任务的胜率

    // 赢了的得分计算方式
    score *= allWinRate / secretWinRate.coerceIn(8.0..50.0)

    // 输了的扣分计算方式
    score *= (100.0 - allWinRate) / (100.0 - secretWinRate.coerceIn(8.0..50.0))
// }
```

@tab Python

```python
if 你是神秘人:
    # all_win_rate 为所有身份平均胜率，secret_win_rate 为神秘任务的胜率

    # 赢了的得分计算方式
    score *= all_win_rate / min(50.0, max(8.0, secret_win_rate))

    # 输了的扣分计算方式
    score *= (100.0 - all_win_rate) / (100.0 - min(50.0, max(8.0, secret_win_rate)))
```

:::

**以上是第一步**

---

再计算所有赢的人的平均分和所有输的人的平均分之差，每差 $10$ 分（不足 $10$ 分的部分直接舍掉），分数变化 $1\%$ 。

::: tip 举例
- 如果赢的人平均分比输的人平均分多 $200$ 分，则分数变化减少 $20\%$ ，变为 $0.8$ 倍。
- 如果赢的人平均分比输的人平均分少 $200$ 分，则分数变化增加 $20\%$ ，变为 $1.2$ 倍。
:::

::: info 特例
1. 如果你的分数过高或过低，意义就不大了。因此我们取 $180$ ~ $2000$ 分为合理的分数区间，超出这个区间的分数会被限制在这个区间内进行计算。
2. 这个倍数最低变为0.01倍，不会变为负数。
3. 如果赢的人平均分比输的人平均分多太多，即使赢了分数也没变化，会影响游戏性。因此我们规定，如果你作为除**神秘人**获胜且分差为正，则分差会除以 $max(\dfrac{\text{阵营方单个阵营的人数}}{\text{获胜人数}}, 1.0)$ 。由此，当一个高分玩家作为**神秘人**单独赢了一局时，分数不会增加太少。
:::

::: code-tabs#code

@tab Kotlin

```kotlin
var winnerTotalScore = winnerScores.sumOf { score ->
    score.coerceIn(180..2000)
}
val winnerAveScore = winnerTotalScore / winnerScores.size

var loserTotalScore = loserScores.sumOf { score ->
    score.coerceIn(180..2000)
}
val loserAveScore = loserTotalScore / loserScores.size

val diff = (loserAveScore - winnerAveScore) / 10
if (player.isWinner()) {
    diff /= when {
        player.identity != BLACK || diff >= 0 -> 1.0
        winnerScores.size + loserScores.size <= 6 -> max(2.0 / winnerScores.size, 1.0)
        else -> max(3.0 / winnerScores.size, 1.0)
    }
}
// 每10分变化1%
val multiply = max(1.0 + diff / 100.0, 0.1)
```

@tab Python

```python
winner_total_score = 0
for score in winnerScores:
    winner_total_score += min(2000, max(180, score))
winner_ave_score = winner_total_score // len(winner_scores)

loser_total_score = 0
for score in loserScores:
    loser_total_score += min(2000, max(180, score))
loser_ave_score = loser_total_score // len(loser_scores)

diff = (loser_ave_score - winner_ave_score) // 10
if player.is_winner() and player.identity == BLACK and diff < 0:
    if len(winner_scores) + len(loser_scores) <= 6:
        diff = diff / max(2.0 / winnerScores.size, 1.0)
    else:
        diff = diff / min(3.0 / winnerScores.size, 1.0)
# 每10分变化1%
multiply = max(1.0 + diff / 100, 0.1)
```

:::

**以上是第二步**

---

第一步和第二步之间是**减分则乘算，加分则加算，先乘后加**{.red}的关系。

::: tip 举例
- 第一步会使你的分数乘以 $1.2$ 倍（加 $0.2$ 倍），第二步会使你的分数乘以 $1.2$ 倍（加 $0.2$ 倍），则总计为 $1.4$ 倍（ $1 + 0.2 + 0.2 = 1.4$ ）。
- 第一步会使你的分数乘以 $1.2$ 倍（加 $0.2$ 倍），第二步会使你的分数乘以 $0.8$ 倍，则总计为 $1$ 倍（ $1 \times 0.8 + 0.2 = 1$ ）。
- 第一步会使你的分数乘以 $0.8$ 倍，第二步会使你的分数乘以 $0.8$ 倍，则总计为 $0.64$ 倍（ $1 \times 0.8 \times 0.8 = 0.64$ ）。
:::

然后，如果你是被[顾小梦](../skills/base.md#g-顾小梦-译电科科员)带赢的，如果这局[顾小梦](../skills/base.md#g-顾小梦-译电科科员)总计带赢了3个人，则[顾小梦](../skills/base.md#g-顾小梦-译电科科员)赢的分数不变，这3个人赢的分数都除以3。

最后取整：如果你加分了，不足 $0.05$ 分的部分就不算了，超过 $0.05$ 分的部分就直接进一。如果你扣分了，超过 $0.95$ 分的部分进一，不足 $0.95$ 分的部分就不扣了。

::: code-tabs#code

@tab Kotlin

```kotlin
v = ceil(round(v * 10.0) / 10.0).toInt()
// 0.04乘以10再round为0，相当于舍去了
// 0.05乘以10再round为1，除以10再ceil为1，相当于直接进一了
// -0.94乘以10再round为-9，除以10再ceil为0，相当于不扣了
// -0.95乘以10再round为-10，除以10再ceil为-1，相当于直接进一了
```

@tab Python

```python
v = math.ceil(round(v * 10) / 10)
# 0.04乘以10再round为0，相当于舍去了
# 0.05乘以10再round为1，除以10再ceil为1，相当于直接进一了
# -0.94乘以10再round为-9，除以10再ceil为0，相当于不扣了
# -0.95乘以10再round为-10，除以10再ceil为-1，相当于直接进一了
```

:::

::: info 特例

1. 为防止减分倍率过大导致赢了得 $0$ 分和输了扣 $0$ 分的情况，额外规定：如果你赢了，至少能得 $1$ 分，如果你输了，至少扣 $1$ 分。
2. 如果全场所有人都赢了或者所有人都输了，则这局不计分。

:::

<style scoped>
  table {
    text-wrap: nowrap;
  }

  .katex {
    text-wrap: nowrap;
  }
</style>
