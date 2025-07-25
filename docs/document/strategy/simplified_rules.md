---
title: 三分钟读懂规则
icon: book
order: 5
author:
  - name: 惑星
    url: https://space.bilibili.com/34070734
shortTitle: 规则速览
toc: false
---

游戏开始时，你会获得一个身份：

- 如果你是**潜伏战线**，你的获胜条件就是你或者你的队友任意一人收集3张**红色**情报
- 如果你是**特工机关**，你的获胜条件就是你或者你的队友任意一人收集3张**蓝色**情报。
- 如果你是[**神秘人**](../card/secret_task.md)，你的获胜条件就是完成身份卡上的任务，并且**神秘人**之间各自为战。

选择完身份后，选择角色卡，角色卡按照是否有<img src="/images/mask.svg" style="transform: scaleY(-1);" width="20" height="20" />标志分为**隐藏角色**和**公开角色**

- **公开角色**：游戏开始时**正面朝上**角色，技能满足条件即可发动。
- **隐藏角色**：游戏开始时**正面朝下**角色，面朝下时只能发动写有**翻开此角色牌**的技能，翻开后才可发动其他技能。

然后每名玩家回合依次进行：**摸牌阶段**——**出牌阶段**——**传递阶段**——**争夺阶段**——**接收阶段**

### **摸牌阶段**

从牌堆摸三张牌以及使用摸牌阶段的技能。

### **出牌阶段**

只有当前回合玩家，可以使用**出牌阶段**的卡牌和技能，比如[【平衡】](../card/card.md)[【澄清】](../card/card.md)[【威逼】](../card/card.md)[【利诱】](../card/card.md)等。不再使用卡牌和技能后，进入传递阶段

### **传递阶段**

当前回合玩家，选择一张手牌当作情报面朝下传递，如果不能传递则会直接失败，不会触发死亡。

带<img src="/images/lock.png" width="20" height="20" alt="锁定">标志的情报可以对一名玩家锁定，令其必须选择接收。情报传递方式一共有三种：

- **向左&larr;**：从左手边的下家开始传递，若下家选择不接收，则按照**顺时针方向**继续传给下家，直到有人选择接收，传递到传出者时，传出者必须选择接收。
- **向右&rarr;**：与向左&larr;同理，只是改为**逆时针**传递。
- **向上&uarr;**：选择另一位玩家，将情报传递到他面前，若他选择不接收，则将退回到你面前。

[**密令**](../card/card.md)让其他人代替你传递情报，此时传出者为[**密令**](../card/card.md)对象，只有他可以发动写有**传出情报**的技能。[**欲擒故纵**](../card/card.md)则是选情报区的情报面朝上传递，按情报箭头方向传递。

### **争夺阶段**

当传递阶段有人选择接收情报时，立刻进入争夺阶段，情报**不再传递**。从**待收情报面前玩家**开始，逆时针依次询问是否使用卡牌或技能，使用后立刻生效，然后继续重复上述步骤询问，直到没人使用卡牌或技能，结束争夺阶段。

### **接收阶段**

待收情报面前的玩家将情报放入自己的情报区，结算**情报被接收后**和**接收情报后**的技能，结算后若满足胜利条件，立即宣胜。值得注意的是当接收情报后，刚好满足濒死条件（情报区有三张或以上**黑色**情报）和宣胜条件时，会跳过濒死，直接宣胜，比如已收集两张**红色**和两张**黑色**情报的**潜伏战线**接收**红**&zwnj;**黑**情报时，会直接宣胜。

当濒死无人[澄清](../card/card.md)时，你就会死亡，可以将最多3张手牌交给任意一名角色，然后弃置你的所有手牌和情报。
