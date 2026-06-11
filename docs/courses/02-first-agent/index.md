# 02. 从 0 跑通第一个 Agent

这门课会带你从环境准备开始，跑通第一个最小 DeepAgent。

第一章我们只看地图，没有要求你安装东西。

这一章开始动手。

## 这一课你会学到什么

- Python 和虚拟环境是什么。
- 终端是什么。
- API Key 是什么，为什么不能提交到 GitHub。
- 如何安装 `deepagents`。
- 如何使用 `create_deep_agent()`。
- 如何调用 `agent.invoke()` 并看懂基本输出。

## 一句话讲清楚

这一章会让你在自己电脑上跑通一个最小 Agent。

它不一定很聪明，也不一定功能很多，但它会证明一件事：

> 你已经能把 Deep Agents 从“看懂概念”推进到“真的运行起来”。

## 这一章会做什么

我们会一步一步完成：

1. 确认电脑上有没有 Python。
2. 创建一个安全的虚拟环境。
3. 准备 API Key，并放到 `.env` 文件里。
4. 安装 `deepagents` 和需要的依赖包。
5. 写一个最小 Agent。
6. 运行它，并看懂第一次输出。

## 这一章不要求你掌握什么

你现在不用掌握：

- Python 语法的所有细节。
- 依赖管理的所有原理。
- 模型 API 的所有参数。
- Deep Agents 的内部实现。

这一章的目标很朴素：

> 先跑起来。

后面再慢慢改 prompt、加工具、加文件系统和复杂能力。

## 最终产物

你会得到一个能在本地运行的最小 Agent。

这个 Agent 会扮演一个耐心的新手教练，回答你关于 DeepAgent 学习的问题。

## 章节

1. [准备 Python 环境](./python-environment.md)
2. [API Key 与环境变量](./api-key-and-env.md)
3. [安装 Deep Agents](./install-deepagents.md)
4. [跑通第一个 Agent](./first-agent.md)
5. [看懂第一次输出](./understand-output.md)

## 通过标准

学完这一章后，你应该能做到：

- 在终端里确认 Python 版本。
- 创建并激活虚拟环境。
- 知道 `.env` 文件为什么不能提交到 GitHub。
- 安装 `deepagents`。
- 运行一个最小 Agent。
- 看懂 `agent.invoke()` 返回的大概结构。

如果这些都完成，你就可以进入第三章，让 Agent 开始使用工具。
