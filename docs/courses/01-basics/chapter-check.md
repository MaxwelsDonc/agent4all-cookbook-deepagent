# 本章自测

## 这一节你会学到什么

这一节不讲新概念。

它只做一件事：帮你判断自己有没有真的看懂第一章。

如果你答不上来，不代表你学不会，只代表某个概念还需要回去再看一遍。

## 一句话讲清楚

第一章过关的标准不是背术语，而是能用自己的话说清楚：

> Agent 是什么，它和聊天机器人有什么区别，以及 Deep Agents 为什么适合处理复杂任务。

## 为什么需要自测

很多人学技术时会有一种错觉：

> 我刚才好像看懂了。

但真正到写代码时，又不知道 `model`、`messages`、`context` 分别是什么。

所以在进入第二章之前，我们先做一次小检查。

第二章会开始准备环境、安装依赖、配置 API Key、运行代码。那些步骤会更具体，也更容易遇到报错。

如果第一章的地图没建立起来，第二章就会变成机械复制命令。

## 自测 1：Agent 是什么

用自己的话回答：

```text
Agent 和普通聊天机器人最大的区别是什么？
```

参考答案：

> 普通聊天机器人主要回答问题；Agent 不只是回答，它会围绕目标思考下一步，必要时使用工具，并一步一步完成任务。

你不需要说得和参考答案一样，只要包含这三个意思就可以：

- 不只是聊天。
- 会围绕目标行动。
- 可以使用工具或执行步骤。

## 自测 2：电脑里的人

把下面概念连到对应说法：

| 概念 | 你能不能说出它像什么 |
| --- | --- |
| Model |  |
| Prompt |  |
| Messages |  |
| Context |  |
| Tools |  |
| Permission |  |

参考答案：

| 概念 | 可以这样理解 |
| --- | --- |
| Model | 他的脑子 |
| Prompt | 你对他说的话 |
| Messages | 你们之间的聊天记录 |
| Context | 他当前能看到的资料 |
| Tools | 他能使用的电脑工具 |
| Permission | 你允许他做什么、不允许他做什么 |

## 自测 3：三个框架的关系

补全下面三句话：

```text
LangChain 更像是 ______。
LangGraph 更像是 ______。
Deep Agents 更像是 ______。
```

参考答案：

```text
LangChain 更像是基础零件。
LangGraph 更像是流程和状态系统。
Deep Agents 更像是已经配置好常用能力的 Agent 工作台。
```

如果你能说出这个层次，就不会再以为自己必须先学完 LangChain 和 LangGraph 才能开始用 Deep Agents。

## 自测 4：看懂一段代码

看这段代码，不用运行：

```python
agent = create_deep_agent(
    model="...",
    tools=[],
    system_prompt="你是一个耐心的新手教练。"
)

result = agent.invoke({
    "messages": [
        {"role": "user", "content": "帮我解释什么是 Agent"}
    ]
})
```

回答：

1. 哪一行表示模型？
2. 哪一行表示 Agent 的身份和规则？
3. 哪一部分是对话记录？
4. 用户这次真正说的话在哪里？

参考答案：

1. `model="..."`
2. `system_prompt="你是一个耐心的新手教练。"`
3. `"messages": [...]`
4. `"content": "帮我解释什么是 Agent"`

## 自测 5：什么时候需要 Deep Agents

下面哪些任务更适合用 Deep Agents？

```text
1. 把一句英文翻译成中文。
2. 给我解释一个概念。
3. 帮我调研资料、保存笔记、整理学习计划，并根据反馈调整。
4. 阅读多个文件，提取重点，生成一份结构化报告。
```

参考答案：

- 第 1 个通常不需要。
- 第 2 个通常不需要。
- 第 3 个适合。
- 第 4 个适合。

判断标准很简单：

> 如果任务需要多步骤、工具、文件、中间结果、长期记忆或人工确认，就更适合 Deep Agents。

## 你应该看到什么结果

完成本章后，你应该能做到：

- 用一句话解释 Agent。
- 说出 Agent 和普通聊天机器人的区别。
- 解释 model、prompt、messages、context、token 的基本意思。
- 说清 LangChain、LangGraph、Deep Agents 的层次关系。
- 判断一个任务是否需要 Deep Agents。
- 知道官方文档第一遍应该怎么看。

如果这些都能做到，你就可以进入第二章。

## 现在要记住什么

第一章结束时，你不需要记住所有细节。

可以用这张表给自己减压：

| 现在要记住 | 现在不用掌握 |
| --- | --- |
| Agent 是能围绕目标做事的软件助手 | 怎么从零实现 Agent |
| Model 是脑子 | 怎么选择最合适的模型 |
| Prompt 是你说的话 | 怎么写完美 prompt |
| Messages 是对话记录 | 消息格式的所有细节 |
| Context 是当前能看到的信息 | 复杂的 context engineering |
| Tools 是 Agent 能用的工具 | 怎么写复杂工具 |
| Deep Agents 适合复杂任务 | Deep Agents 内部实现原理 |
| LangChain、LangGraph、Deep Agents 有层次关系 | 三个框架的完整源码 |

如果你现在只能说出左边这一列，也已经够进入第二章了。

## 如果你还没完全懂

可以按下面方式回看：

| 卡在哪里 | 回看哪一节 |
| --- | --- |
| 不知道 Agent 是什么 | [什么是 Agent](./what-is-agent.md) |
| 分不清聊天机器人和 Agent | [什么是 Agent](./what-is-agent.md) |
| 分不清 LangChain、LangGraph、Deep Agents | [LangChain、LangGraph 和 DeepAgents 是什么关系](./langchain-langgraph-deepagents.md) |
| 看不懂 model、messages、context | [Model、Token、Prompt、Messages 和 Context](./model-token-prompt-messages-context.md) |
| 不知道 deep 在哪里 | [DeepAgent 到底 deep 在哪里](./why-deep-agent.md) |

## 小结

第一章的目标不是让你会写代码。

第一章的目标是让你带着一张地图进入第二章：

```text
Agent 是电脑里的任务执行者
Model 是脑子
Prompt 是你说的话
Messages 是聊天记录
Context 是当前可参考信息
Tools 是能使用的工具
Deep Agents 是更完整的 Agent 工作台
```

下一章，我们会开始真正动手：准备环境，并跑通第一个最小 Agent。
