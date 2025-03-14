---
icon: code
order: 3
author: 奇葩の灵梦
pageInfo: ["Author", "PageView", "Date", "Word"]
---

# 目录结构

- <VPIcon icon="folder" /> **src** - 代码文件夹
  - <VPIcon icon="folder" /> **main** - 项目代码
    - <VPIcon icon="folder" /> **java** - Java代码
    - <VPIcon icon="folder" /> **kotlin** - Kotlin代码
      - <VPIcon icon="folder" /> **card** - 卡牌相关代码
      - <VPIcon icon="folder" /> **gm** - GM命令，见[服务器代码仓库的README](https://github.com/CuteReimu/TheMessage?tab=readme-ov-file#%E5%85%B3%E4%BA%8Egm%E5%91%BD%E4%BB%A4)
      - <VPIcon icon="folder" /> **handler** - 客户端发来的协议处理（协议层）
      - <VPIcon icon="folder" /> **network** - 网络层代码（基于netty框架）
      - <VPIcon icon="folder" /> **phase** - 各个阶段的逻辑
      - <VPIcon icon="folder" /> **skill** - 角色技能
      - <VPIcon icon="file" /> **Config.kt** - 配置文件的解析
      - <VPIcon icon="file" /> **Game.kt** - 游戏的主要逻辑
      - <VPIcon icon="file" /> **HumanPlayer.kt** - 真人玩家
      - <VPIcon icon="file" /> **Image.kt** - 生成图像相关的代码
      - <VPIcon icon="file" /> **MessageCardValue.kt** - 情报分数计算逻辑（AI用）
      - <VPIcon icon="file" /> **Player.kt** - 玩家
      - <VPIcon icon="file" /> **QQPusher.kt** - 推送到QQ群相关代码
      - <VPIcon icon="file" /> **Recorder.kt** - 录像相关代码
      - <VPIcon icon="file" /> **RobotPlayer.kt** - 机器人玩家
      - <VPIcon icon="file" /> **ScoreFactory.kt** - 分数与段位系统
      - <VPIcon icon="file" /> **Statistics.kt** - 统计玩家的一些数据
      - <VPIcon icon="file" /> **其它文件** - 框架相关代码
    - <VPIcon icon="folder" /> **proto** - 协议文件
      - <VPIcon icon="file" /> **common.proto** - 一些枚举定义、卡牌结构体定义等需要在其它文件都使用到的通用定义
      - <VPIcon icon="file" /> **errorcode.proto** - 目前只存放了一条协议`error_message_toc`
      - <VPIcon icon="file" /> **fengsheng.proto** - 与角色技能无关的大部分游戏协议
      - <VPIcon icon="file" /> **record.proto** - 服务器存储录像使用protobuf进行序列化和反序列化（与客户端无关）
      - <VPIcon icon="file" /> **role.proto** - 角色技能协议
    - <VPIcon icon="folder" /> **resources** - 资源文件
  - <VPIcon icon="folder" /> **test** - 单元测试代码
- <VPIcon icon="file" /> **其它文件** - 工程相关文件

---

机器人的逻辑分为三种：

- 在空闲时点使用的卡牌和主动技能：写在对应卡牌或技能文件最下方的`ai`函数中。
- 卡牌和主动技能的后续效果、所有触发类技能：写在对应卡牌或技能文件下的名为`executeXXX`子类的`resolve`方法中。
- 其它AI（例如是否接收情报、如何传递情报、是否救濒死等）：写在`RobotPlayer.kt`中。

  
