# 01. DeepAgent 零基础入门

这门课解决一个问题：你到底在学什么？

在开始安装依赖、复制代码之前，我们先把 Agent、DeepAgent、LangChain、LangGraph 这些名字放到一张清晰的地图里。

## 这一课你会学到什么

- Agent 可以先理解成什么。
- Agent 和普通聊天机器人有什么区别。
- DeepAgent 的 “deep” 主要体现在哪里。
- LangChain、LangGraph 和 DeepAgents 是什么关系。
- 为什么后面要学习 model、prompt、tools、planning、filesystem、memory 和 subagent。

## 一句话讲清楚

Agent 可以先理解成一个住在电脑里的任务执行者。

Deep Agents 可以先理解成一套“已经帮你装好常用能力的 Agent 工作台”：它不是只有一个模型，也不是一段提示词，而是把模型、工具、规划、文件系统、上下文管理、子 Agent、记忆和人工确认等能力组合起来。

你现在只要先知道：Deep Agents 是用来帮你更快搭出复杂 Agent 的。

这门课不会一上来要求你掌握所有细节。我们先建立地图，让你知道每个名字大概站在什么位置。

## 名字先别被绕晕

你会在不同地方看到几个很像的名字：

| 名字 | 先怎么理解 |
| --- | --- |
| Deep Agents | LangChain 官方文档里的工具/项目名 |
| DeepAgents | 同一个名字的连写形式，很多文章会这样写 |
| `deepagents` | Python 里安装和导入时可能看到的包名 |
| DeepAgent | 课程里有时泛指“深度 Agent”这个学习主题 |

刚入门时不用纠结这些写法。

本课程会尽量用 Deep Agents 指官方工具，用 DeepAgent 指我们正在学习的这个方向。

你以后还会在官方文档里看到一个词：agent harness。

它可以先理解成“Agent 工作台”。现在不用背，看到它时知道是在说 Deep Agents 这种帮你组织复杂 Agent 能力的东西就够了。

## 这一章的贯穿例子

这一章会反复使用同一个例子：

> 我想做一个“帮助小白学习 DeepAgent 的 Agent”。

它一开始只会回答问题。

后来它会有清晰角色，会理解你的学习时间，会保存学习计划，会使用工具，会根据反馈调整。

你可以把第一章理解成：先看懂这个学习助手由哪些部分组成，后面再一步一步把它做出来。

## 这一章不做什么

为了不把新手一下子推到报错里，第一章先不做这些事：

- 不安装 Python。
- 不申请 API Key。
- 不配置环境变量。
- 不要求你运行代码。

这些会放到第二章。

第一章只负责一件事：让你先看懂地图。

## 为什么先学这门课

很多人第一次学 Agent 会被一堆词砸晕：

```text
model
token
prompt
messages
context
tools
tool calling
LangChain
LangGraph
DeepAgents
memory
subagent
permission
```

如果直接从安装和代码开始，你可能能复制成功，但不知道自己到底跑起来了什么。

所以第一门课先做三件事：

1. 建立 Agent 的直觉。
2. 看清 LangChain、LangGraph、Deep Agents 的层次关系。
3. 理解 Deep Agents 为什么适合处理更长、更复杂的任务。

## 章节

1. [什么是 Agent](./what-is-agent.md)
2. [LangChain、LangGraph 和 DeepAgents 是什么关系](./langchain-langgraph-deepagents.md)
3. [Model、Token、Prompt、Messages 和 Context](./model-token-prompt-messages-context.md)
4. [DeepAgent 到底 deep 在哪里](./why-deep-agent.md)
5. [本章自测](./chapter-check.md)

## 这门课的目标

学完这一门，你不一定马上会写复杂代码，但你应该能用自己的话解释：

> Agent 是一个可以在电脑里理解任务、使用工具并一步步完成目标的软件助手。

你还应该能说清楚：

```text
LangChain：提供模型、消息、工具等基础零件
LangGraph：负责流程、状态和可控执行
Deep Agents：在上面提供更完整的长任务 Agent 工作台
```

通过本章自测后，再进入第二章准备环境和运行代码。

下一节先从最重要的问题开始：什么是 Agent？
