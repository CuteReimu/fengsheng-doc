---
icon: book
order: 1
author: 奇葩の灵梦
---

# 风声规则补充说明

*在确定完整规则的过程中，我和官方设计师持续进行了深入的讨论，对每个细节都进行了确认。因此，本篇详细规则**可以作为官方规则的补充说明**。*

::: important 重要
和三国杀不同，本作风声没有任何“插入式结算”，全部都是“排队结算”（可以理解为游戏王中的“XX场合”）。
:::

## 技能分类

技能分为三类：**被动技能**、**主动技能**、**触发类技能**。

- **被动技能**指只要角色面朝上就持续生效的技能。例如：可以把XX牌当作XX牌使用。
- **主动技能**指在**空闲时点**可以选择发动的技能。
- **触发类技能**指由某些事件触发的技能。

任何技能一经发动，一定会一直结算直到技能结算结束，不会由于任何原因被插入。任何卡牌效果一旦开始结算，则一定会一直结算直到卡牌效果结算结束，然后才会进入**结算卡牌效果后**，不会由于任何原因被插入。

### 空闲时点

游戏中定义了的空闲时点有：**出牌阶段**、**传递阶段开始时**、**传递阶段**、**争夺阶段**、**濒死求澄清**。

在这些空闲时点，玩家可以选择使用卡牌或主动技能。

### 事件

游戏中有很多个“节点”：**结算卡牌效果时**、**结算卡牌效果后**、**等待死亡角色给三张牌**、**传出情报时**、**接收情报时**、**回合结束时**，以及上述所有空闲时点。

当发生了任何“事件”，都会记录下来，在下文中的1进行检查。

当进入一个“节点”时，会按照如下顺序进行结算：

1. 首先按照从当前回合玩家开始逆时针顺序依次检查所有玩家，是否有**触发类技能**可以发动，并清空所有“事件”记录。**所有玩家都检查过一遍后，进入下一步。**
2. 如果在上一步中，有任何玩家发动了技能，可能产生了新的“事件”，新的“事件”又会被记录下来，再次重复1。
3. 检查收集情报类的胜利条件。
4. 拥有三张**黑**情报的人进入濒死状态。（关于濒死结算在下文中介绍）
5. 执行本该结算的事情，如正在结算的卡牌效果；或进入空闲时点，由玩家选择是否操作。

::: tip 举例
- [凌素秋](../skills/extend2.md#l-凌素秋-棋手)对[简先生](../skills/extend1.md#j-简先生-话剧演员)使用[试探](../card/card.md)，触发了[简先生](../skills/extend1.md#j-简先生-话剧演员)被[试探](../card/card.md)结算后的事件，[简先生](../skills/extend1.md#j-简先生-话剧演员)发动**从容应对**抽取了[凌素秋](../skills/extend2.md#l-凌素秋-棋手)一张手牌，此时对于前述事件没有其它触发类技能的结算。但由于产生了新的事件——[简先生](../skills/extend1.md#j-简先生-话剧演员)获取了[凌素秋](../skills/extend2.md#l-凌素秋-棋手)的手牌，因此[凌素秋](../skills/extend2.md#l-凌素秋-棋手)可以对[简先生](../skills/extend1.md#j-简先生-话剧演员)发动**寸步不让**。
- [程小蝶（SP）](../skills/extend1.md#c-程小蝶-sp-梨园义士)发动**共焚**，将情报置入多名角色的情报区，全部结算后，即将回到**争夺阶段空闲时点**。此时先检查事件，有置入情报的事件，因此由[钱敏](../skills/extend1.md#q-钱敏-调查科员)发动**先发制人**，然后再进行胜利条件和濒死与死亡的结算，全部结算后回到**争夺阶段空闲时点**。
:::

## 濒死与死亡

### 濒死结算

当有人拥有三张**黑**情报时，进入濒死状态，从濒死角色自己开始，逆时针顺序询问是否有人使用澄清或相关技能。

- 如果一轮下来没有人使用澄清，则他会被标记为“确定将要死亡”。
- 如果有人使用澄清或技能使其**黑**情报数量减少：
  - 若**黑**情报数量仍然大于等于3张，则继续向该名玩家继续询问（而不是重新询问一轮）
  - 若**黑**情报数量小于3张，则不再询问，濒死玩家被救活。

如果有多名玩家此时都有三张**黑**情报，则同时进入濒死状态，由当前回合玩家开始逆时针依次进行求澄清操作。所有濒死的玩家都进行过求澄清操作后，已经被标记为“确定将要死亡”的角色死亡。自此，他的状态变为已死亡，不能成为技能和卡牌的目标，且所有除“死亡前”以外的技能失效。

### 死亡结算

在**濒死结算**的最后，如果有人死亡，则进行死亡结算。

1. 检查与死亡相关的[**神秘人**任务](../card/secret_task.md)的胜利条件。
2. 触发上述死亡玩家的死亡事件。（此处属于一个触发“节点”，如果产生了新的事件也会按照上文所说的方式连续触发）
3. 等待死亡玩家选择是否将三张手牌交给一名存活玩家。如果有多名玩家同时死亡，则依次进行给三张牌的操作。
4. 所有死亡玩家弃掉所有手牌和情报。

::: warning 注意
我们在上文提到，对于每个“节点”的第3步，都会进行收集情报类的胜利条件的检查。但是，在**濒死结算**和**死亡结算**过程中，为防止混乱，会暂停对这一项的检查，延后至**濒死结算**和**死亡结算**结束后的下一个“节点”中进行检查。
:::

## 宣胜

在上文中可以看到，一共有两处可以发生宣胜的时机，外加特殊的[**搅局者**](../card/secret_task.md)，总计有三处可以发生宣胜的时机：
- 进入“节点”结算完正在结算的**触发类技能**后，进行收集情报类的胜利条件的判断。
- **死亡结算**开始时，进行与死亡相关的胜利条件的判断。
- **回合结束时**，在进行完其它所有结算后，进行[**搅局者**](../card/secret_task.md)的胜利条件的判断。

关于收集情报类的胜利条件的检查，按照如下顺序：
1. 依次检查每名玩家，如果他获得了三张**红色**或**蓝色**情报：
   - 如果他是**潜伏战线**、**特工机关**、[**双面间谍**](../card/secret_task.md)且获得满足宣胜条件，则将其和所有同阵营玩家加入胜利玩家列表中；
   - 如果他没满足宣胜条件，且场上有[**诱变者**](../card/secret_task.md)，则将[**诱变者**](../card/secret_task.md)加入胜利玩家列表中。
2. 检查所有能够宣胜的技能（例如SP韩梅、SP小九），将胜利玩家加入胜利玩家列表中。
3. 检查当前是否为[**簒夺者**](../card/secret_task.md)的回合，并且胜利玩家列表不为空。如果是，则清空胜利玩家列表，把[**簒夺者**](../card/secret_task.md)加入胜利玩家列表中。
4. 检查共赢类的技能（例如顾小梦、秦圆圆）。

关于与死亡相关的胜利条件和[**搅局者**](../card/secret_task.md)的胜利条件的判断，只需将上述第1步替换为相关[**神秘人**任务](../card/secret_task.md)的判断即可，第2步其实不会发生（如果发生了则早就有人宣胜了），后续保持不变即可。