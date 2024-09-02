---
order: 2
author: 奇葩の灵梦
pageInfo: ["Author", "Date", "Word"]
---

# 技能相关架构

```markmap
---
markmap:
  colorFreezeLevel: 2
---

# Skill

## 大部分技能
- ActiveSkill
  - MainPhaseSkill
- TriggeredSkill

## 生成出的技能
- InvalidSkill
- OneTurnSkill
  - CannotPlayCard
  - MustReceiveMessage

## 特殊的技能
- BeforeDieSkill
- ChangeDrawCardCountSkill
- ChangeGameResultSkill
- WinSkill
- ConvertCardSkill

## 传情报相关
- SendMessageDirectionSkill
- SendMessageCanLockSkill
- SendMessageCardSkill
```

技能`Skill`是基类。其中有个变量叫做`isInitialSkill`，表示是否是开局就拥有的技能，只有`isInitialSkill=true`的技能会被无效。

```kotlin
interface Skill {
    /** 技能ID */
    val skillId: SkillId
    /** 只有初始技能会被无效，技能产生出来的二段技能不会被无效。 */
    val isInitialSkill: Boolean
}
```

- 有一种特殊的技能叫`InvalidSkill`，它是某个技能被无效后套了一个壳，回合结束的时候会放出来。

```kotlin
class InvalidSkill private constructor(val originSkill: Skill) : Skill {
    override val skillId = SkillId.INVALID

    override val isInitialSkill = false

    companion object {
        /** 将玩家的所有技能无效 */
        fun deal(player: Player) {
            player.skills = player.skills.map { if (it.isInitialSkill) InvalidSkill(it) else it }
        }
       
        /** 解除无效 */
        fun reset(game: Game) {
            for (player in game.players) {
                val skills = player!!.skills
                if (skills.any { it is InvalidSkill })
                    player.skills = skills.map { if (it is InvalidSkill) it.originSkill else it }
            }
        }
    }
}
```

- 有一种特殊的技能叫`OneTurnSkill`，回合结束就失去这个技能。

```kotlin
interface OneTurnSkill : Skill {
    companion object {
        fun reset(game: Game) {
            for (p in game.players) {
                val skills = p!!.skills
                if (skills.any { it is OneTurnSkill })
                    p.skills = skills.filterNot { it is OneTurnSkill }
            }
        }
    }
}
```

技能分为两类，`ActiveSkill`和`TriggeredSkill`

- `ActiveSkill`是出牌阶段、争夺阶段、有人濒死时主动使用的技能。下面有一种特殊的子类：
  - `MainPhaseSkill`是仅在出牌阶段可以使用的技能，这种技能如果没有使用，直接点结束出牌阶段，会弹提示。
- `TriggeredSkill`是其它时间触发的技能。

::: warning 注意
`InvalidSkill`只继承于`Skill`，不继承于`ActiveSkill`和`TriggeredSkill`
:::

如果一个玩家不可能可以使用技能且不可能可以出牌，则争夺阶段、濒死求澄清会被跳过。

- 当一个玩家有`ActiveSkill`的技能并且`canUse`方法判断争夺阶段可以使用技能，或者他是隐藏角色并且从未正面过，说明他可能可以使用技能。
- 当一个玩家有牌且没有被禁止出所有牌，说明他可能可以出牌。

## 不能出牌

有一个特殊的技能叫`CannotPlayCard`，拥有这个技能的玩家不能出牌，它继承于`OneTurnSkill`，它有两个参数，被禁的卡牌类型列表、是否是禁了所有牌。

```kotlin
class CannotPlayCard(
    /** 被禁用的卡牌类型 */
    private val cardType: List<card_type> = emptyList(),
    /** 是否禁用所有牌 */
    val forbidAllCard: Boolean = false
) : OneTurnSkill {
    override val skillId = SkillId.UNKNOWN

    override val isInitialSkill = false

    fun cannotPlayCard(cardType: card_type) = forbidAllCard || cardType in this.cardType
}
```

::: info 注意
【禁闭】【强令】【调虎离山】会让目标玩家/所有玩家获得一个`CannotPlayCard`技能。
:::

## 卡牌转化

有一种特殊的技能叫`ConvertCardSkill`，拥有这个技能的玩家的卡牌会被转化，它有三个参数，A、B、是否必须必须转化。

当玩家打出的卡牌实际是A时：

1. 如果A必须当作B使用，且玩家想要当作的卡牌并不是B，则一定不能使用。
2. 如果上一行不成立，玩家想要当作的卡牌本来就是A时，不发生转化，直接打出。
3. 如果A必须/可以当作B使用，玩家想要当作的卡牌是B，则发生转化。

::: info 注意
SP李宁玉的应变继承于`ConvertCardSkill(Jie_Huo, Wu_Dao, false)`。
变则通让所有玩家获得一个继承于`ConvertCardSkill(A, B,true)`和`OneTurnSkill`的技能。
:::

## 必须接收/必须不能接收情报

有一种特殊的技能叫`MustReceiveCardSkill`，本回合必须接收/必须不能接收情报，它继承于`OneTurnSkill`

::: info 注意
小铃铛和边云疆会让别人获得一个继承于`MustReceiveCardSkill`和的技能。
:::

## 传情报相关的技能

- 有一种特殊的技能叫`SendMessageDirectionSkill`，它会影响可以传出情报的方向
- 有一种特殊的技能叫`SendMessageCanLockSkill`，它会影响传出的情报是否能锁定
- 有一种特殊的技能叫`SendMessageCardSkill`，它会影响能传出哪张情报

相同类型的技能，后来的技能会使先来的技能失效

## 身份规则以外宣胜的技能

有一种特殊的技能叫`WinSkill`，它会在身份规则以外宣胜

## 影响游戏结果的技能

有一种特殊的技能叫`ChangeGameResultSkill`，它会影响游戏结果

## 自己死亡前的技能

有一种特殊的技能叫`BeforeDieSkill`。对于这种技能，自己无需存活也能发动。

## 影响摸牌阶段摸牌数量的技能

有一种特殊的技能叫`ChangeDrawCardCountSkill`，它会影响摸牌阶段摸牌的数量。