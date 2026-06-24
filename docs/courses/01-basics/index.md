# 01. DeepAgent 零基础入门

这门课解决一个问题：

> 你到底在学什么？

在开始安装依赖、复制代码之前，我们先把 Agent、Deep Agents、LangChain、LangGraph 这些名字放到一张清晰的地图里。

## 这一章先看懂什么

Agent 可以先理解成一个住在电脑里的任务执行者。

Deep Agents 可以先理解成一套“已经帮你装好常用能力的 Agent 工作台”。它不是只有一个模型，也不是一段提示词，而是把模型、工具、规划、文件系统、上下文管理、子 Agent、记忆和人工确认等能力组合起来。

这一章不要求你马上掌握所有细节。

你只需要先知道：

> MaxLance Assistant 未来会是一个帮助初学者学习 DeepAgent 的助手，而这一章是在看懂它由哪些部件组成。

## 为什么先学这一章

很多人第一次学 Agent，会被一堆名词砸晕：`model`、`token`、`prompt`、`messages`、`context`、`tools`、`tool calling`、`LangChain`、`LangGraph`、`Deep Agents`、`memory`、`subagent`、`permission`……

如果直接从安装和代码开始，你可能能复制成功，但不知道自己到底跑起来了什么。

所以第一章先做三件事：

1. 建立 Agent 的直觉。
2. 看清 LangChain、LangGraph、Deep Agents 的层次关系。
3. 理解 MaxLance Assistant 后面为什么需要 model、prompt、tools、context、memory 和 permission。

## 本章不做什么

为了不把初学者一下子推到报错里，第一章先不做这些事：

- 不安装 Python。
- 不申请 API Key。
- 不配置环境变量。
- 不要求你运行代码。

这些会放到第二章。

第一章只负责一件事：让你先看懂地图。

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

## 本章路线

<div class="a4a-chapter-map">
  <a href="./what-is-agent">
    <span>01</span>
    <strong>什么是 Agent</strong>
    <em>理解 Agent 和聊天机器人的区别</em>
  </a>
  <a href="./langchain-langgraph-deepagents">
    <span>02</span>
    <strong>LangChain、LangGraph 和 Deep Agents 的关系</strong>
    <em>看清三者的层次关系</em>
  </a>
  <a href="./model-token-prompt-messages-context">
    <span>03</span>
    <strong>Model、Token、Prompt、Messages 和 Context</strong>
    <em>读懂代码里最常见的几个词</em>
  </a>
  <a href="./why-deep-agent">
    <span>04</span>
    <strong>DeepAgent 到底 deep 在哪里</strong>
    <em>看清它比普通 Agent 多了哪些能力</em>
  </a>
</div>

每一节末尾都有一个简短的自测，跟着回答就能确认自己有没有真的看懂。

## 学完怎么判断对不对

学完这一章后，你应该能用自己的话解释：

> Agent 是一个可以在电脑里理解任务、使用工具并一步步完成目标的软件助手。

你还应该能说清楚：

- **LangChain**：提供模型、消息、工具等基础零件
- **LangGraph**：负责流程、状态和可控执行
- **Deep Agents**：在上面提供更完整的长任务 Agent 工作台

如果这些还说不出来，先不用急着进入代码。回到对应小节，用末尾的自测把概念补稳。
