---
title: 术语解释
icon: book
order: 1
author:
  - name: 二宽
    url: https://github.com/HagridThick
  - name: 惑星
    url: https://space.bilibili.com/34070734
  - name: 奇葩的灵梦
    url: https://cutereimu.cn
toc:
  levels: 3
---

### 双色情报

双色情报视为拥有两种颜色的**一张**情报。

例如：**红**&zwnj;**黑**双色情报，就既视为**红色**情报，又视为**黑色**情报，因为含有**黑色**，所以不视为非**黑色**情报。[澄清](../card/card.md)时可以将含**黑色**的双色情报整张移除。

### 纯色情报

纯色情报指的是仅有一种颜色的情报，比如纯**红**，纯**蓝**，纯**黑**。

情报没有特指纯色时，均是带有该颜色就符合条件：
- 纯**红**、**红**&zwnj;**黑**、**红**&zwnj;**蓝**均算作**红色**
- 纯**黑**、**蓝**&zwnj;**黑**、**红**&zwnj;**黑**均算作**黑色**
- 纯**蓝**、**蓝**&zwnj;**黑**、**红**&zwnj;**蓝**均算作**蓝色**

### 角色性别

角色正面朝上时才有角色性别，背面朝下时为没有性别，面朝下的男性角色不能与[秦圆圆【比翼双飞】](../skills/extend1.md#q-秦圆圆-风尘侠女)。

### 交给

若没有特别说明，将以卡牌面朝下的方式交给。

### 弃置

若没有特别说明，将需要弃置的卡牌面朝上置入弃牌堆。

### 置入情报区

置入情报区不视为接收情报，只视为收集情报，不会触发“接收”的相关技能。

### 展示

指亮出相关卡牌，让所有玩家都看到，展示的卡牌留在其原来的区域中，展示后将复原状态。

::: tip 举例
展示牌堆顶的一张牌，则亮出牌堆顶的一张牌，让所有玩家都看清后，将其翻回面朝下，保持在牌堆顶。
:::

### 可以

当文字描述中有“可以”时，以此“可以”为界，之后的文字，你可以选择结算（使用），或不结算。当你选择不结算（使用）后，“可以”之后的文字则全部不会结算，你不能只选择其中一部分结算。

### 然后

当文字描述中有“然后”时，以此“然后”为界，若之前的文字没法完全结算，则“然后”之后的文字都不结算。

### 出牌阶段

当前回合玩家独占的阶段，只有当前回合玩家才可以使用出牌阶段的手牌或技能；

如无特别说明，不能在其他玩家的出牌阶段中使用出牌阶段的手牌或技能。

### 出牌阶段限一次

指每个你的出牌阶段，都可以使用一次。

### 传递阶段

传递阶段开始时，当前回合玩家须选择一张手牌当作情报传出，若无法传出情报，则会被判出局，无法取得游戏胜利，弃置角色牌，手牌及情报区的所有情报，角色不算死亡，不会触发相关技能及引发相关胜利。

传出情报前，只有当前回合玩家可以使用传递阶段的手牌或技能。

::: info 情报面前角色死亡，是否继续传递？
在死亡结算后情报立即传至下一个人（无论死亡角色是否被锁定）。如果死亡角色是传出者，则弃置该情报进入下一回合。
:::

### 争夺阶段

争夺阶段属于公共阶段，只要符合条件，所有玩家都可以使用争夺阶段的手牌或技能。

争夺阶段不是传递阶段，不会再进行传递阶段的情报的传递，情报的移动均由手牌或技能造成，当没有玩家再使用手牌或技能后，争夺阶段立刻结束。

::: info 情报面前角色死亡，是否继续争夺？
在死亡结算后将继续争夺。如果争夺阶段结束情报仍在该死亡角色面前，则弃置该情报进入下一回合。
:::

### 争夺阶段限一次

指每个回合的争夺阶段，都可以使用一次。

### 接收情报

争夺阶段结束时，情报停留在哪位玩家的面前，其便是情报的接收者。

接收情报的时候，按照以下顺序处理：
1. 接收者翻开面前的待收情报，将其置入自己的情报区；
2. 触发接收情报的相关技能，若有多个角色的技能同时触发，则**从当前回合玩家开始逆时针**顺序发动，若同一名角色的多个技能同时触发，则由其决定顺序；
3. 检查胜利条件，达到胜利条件的必须宣告胜利；如果有多名角色均满足胜利条件，则都宣告胜利。
4. 收集了三张**黑色**情报的角色进入濒死，若此时有多名角色收集了三张**黑色**情报，则以**从当前回合玩家开始逆时针顺序**进入濒死；
5. **从结算濒死的玩家开始逆时针顺序**依次询问，可以对濒死角色使用[【澄清】](../card/card.md)，可以使用角色濒死时的技能；一旦他面前的**黑色**情报数量小于三张，他**立即脱离濒死，不再继续询问**；
6. 直到没人再有动作后，濒死的角色若还有三张**黑色**情报，则他将会死亡；
7. 其他角色进入濒死（指4中出现同时濒死的情况，没有则直接处理8）；
8. 所有在6中确定会死亡的角色死亡（自此，他的状态变为已死亡，不能成为技能和卡牌的目标，且所有除“死亡前”以外的技能失效）；
9. 确定死亡的角色后，检定是否有死亡相关的胜利条件（[**神秘人**任务](../card/secret_task.md)）；
10. 死亡角色触发其“死亡前”的技能（若有多个死亡角色触发技能，则按照死亡顺序结算）；
11. 处理角色的死亡，可以选择至多三张手牌交给另一名角色，弃置其剩余的手牌以及情报区中的所有情报；
12. 处理“死亡前”技能触发的相关事件（如涉及到情报的置入，处理顺序如接收情报）。

::: warning 注意

如果场上只剩下一个阵营的多名玩家存活，由于死亡不展示身份牌，无法确定是否为同阵营，因此游戏将继续进行。如果场上只剩下一名玩家存活，则他宣告胜利，他的队友共同胜利。

:::

### 情报传出者

情报传出者通常是当前进行回合的玩家。

如果玩家使用了[【密令】](../card/card.md)，则情报传出者为被[【密令】](../card/card.md)的玩家，其可以发动相关的传出情报时的技能。

情报传出者在传出情报时就已经确定，之后无论使用任何牌或者技能对待收情报进行争夺，都不会改变情报传出者。“你传出的情报被接收时”的相关技能都只能在你是情报传出者时发动。

### 锁定（必须接收）与不能接收

如果一名角色同时锁定（**必须接收**）了，同时又因为其他情况被限制**不能**选择**接收**情报，**必须接收**优先于**不能接收**。

