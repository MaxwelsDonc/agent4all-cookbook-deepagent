# 02. 从 0 跑通第一个 Agent

第一章只看地图，没有要求你安装东西。

这一章开始动手。

目标很朴素：

> 在你自己的电脑上，让 MaxLance Assistant 的第一个版本跑起来。

这个版本不一定很聪明，也不一定功能很多。它只需要证明一件事：你已经能把 Deep Agents 从“看懂概念”推进到“真的运行起来”。

## 这一章会做什么

你会一步一步完成：

1. 确认电脑上有没有 Python。
2. 创建一个安全的虚拟环境。
3. 准备 API Key，并放到 `.env` 文件里。
4. 安装 `deepagents` 和需要的依赖包。
5. 写一个最小 Agent。
6. 运行它，并看懂第一次输出。

## 为什么先跑最小版本

初学者最容易卡在两个地方：

- 概念看懂了，但代码跑不起来。
- 代码复制了，但不知道报错在哪里。

所以这一章不追求功能复杂。

我们先搭一个最小版本的 MaxLance Assistant，让它扮演一个耐心的新手教练，回答你关于 DeepAgent 学习的问题。

后面再慢慢给它加工具、文件系统、规划能力和安全边界。

## 本章不要求你掌握什么

你现在不用掌握：

- Python 语法的所有细节。
- 依赖管理的所有原理。
- 模型 API 的所有参数。
- Deep Agents 的内部实现。

这一章只要求你按步骤把环境和最小 Agent 跑通。

## 本章路线

<div class="a4a-chapter-map">
  <a href="./python-environment">
    <span>01</span>
    <strong>准备 Python 环境</strong>
    <em>装好 Python 和项目虚拟环境</em>
  </a>
  <a href="./api-key-and-env">
    <span>02</span>
    <strong>API Key 与环境变量</strong>
    <em>用 .env 安全保存模型密钥</em>
  </a>
  <a href="./install-deepagents">
    <span>03</span>
    <strong>安装 Deep Agents</strong>
    <em>装上跑 Agent 需要的依赖</em>
  </a>
  <a href="./first-agent">
    <span>04</span>
    <strong>跑通第一个 Agent</strong>
    <em>在本地运行最小可用的 Agent</em>
  </a>
  <a href="./understand-output">
    <span>05</span>
    <strong>看懂第一次输出</strong>
    <em>读懂 messages 和返回结果</em>
  </a>
</div>

## 学完怎么判断对不对

学完这一章后，你应该能做到：

- 在终端里确认 Python 版本。
- 创建并激活虚拟环境。
- 知道 `.env` 文件为什么不能提交到 GitHub。
- 安装 `deepagents`。
- 运行一个最小 Agent。
- 看懂 `agent.invoke()` 返回的大概结构。

如果这些都完成，你就有了 MaxLance Assistant 的第一个本地版本。
