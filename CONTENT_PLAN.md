# Agent4all 内容规划与分工

这份文档用于项目内部协作，不放进网站。

参与者：

- Maxwel
- Lancer

当前策略：

> 先让 AI 生成课程初稿，再由 Maxwel 和 Lancer 以小白视角完整 review、试跑、改写。课程必须让小白真正学明白，并最终跑出一个可用的 Agent。

## 课程总目标

Agent4all 不是 DeepAgents 官方文档的翻译版，而是一条面向小白的学习路径。

学完整套课程后，读者应该能做到：

1. 说清楚 Agent、DeepAgent、LangChain、LangGraph 是什么。
2. 本地跑通一个 DeepAgent。
3. 理解 model、prompt、messages、tools、context、memory、subagent、permission 等核心概念。
4. 能自己修改 prompt、工具和任务流程。
5. 完成一个可以继续改造的 Agent 项目。

## 写作与验收原则

生成或检查课程内容前，先把 `COURSE_CONTENT_PROMPT.md` 作为上下文提供给 AI 写作助手。

每一节课都必须满足：

- 先解释为什么学它，再给操作步骤。
- 每个关键概念都要有简单例子。
- 优先使用“电脑里的人”这个类比解释 Agent。
- 不默认读者懂 Python、终端、API Key、环境变量、依赖管理。
- 必须说明读者应该看到什么结果。
- 必须记录常见错误和解决办法。
- reviewer 必须从小白视角完整走一遍。

## 协作方式

建议每节课采用三步流程：

1. 主写人用 AI 生成初稿，并补齐代码、图示和示例。
2. Reviewer 按教程从头执行，不懂就记录，不顺就打回。
3. 两人复盘，把看不懂、跑不通、不自然的地方改掉。

不要用“写完就算完成”作为标准。

真正完成的标准是：

> 一个小白能跟着走完，并能用自己的话解释这一节讲了什么。

## 课程 01：DeepAgent 零基础入门

目标：建立认知地图，不急着写复杂代码。

### 需要掌握

- Agent 是什么。
- Agent 为什么不是普通聊天机器人。
- “电脑里的人”这个核心类比。
- Model、Prompt、Messages、Context、Token 的基本意思。
- LangChain、LangGraph、DeepAgents 的关系。
- DeepAgent 的 “deep” 主要体现在哪里。

### 需要涉及

- 普通聊天机器人 vs Agent。
- Agent 的基本工作流程图。
- LangChain = 基础零件。
- LangGraph = 流程和状态。
- DeepAgents = 高级 Agent 套件。
- 官网文档的基本导航方式。

### 建议分工

- 主写人：Maxwel
- Reviewer：Lancer

原因：这门课决定整个项目的表达口径，建议 Maxwel 先把基调定下来。

### 初步章节

- 什么是 Agent
- LangChain、LangGraph 和 DeepAgents 是什么关系
- Model、Token、Prompt、Messages 和 Context
- DeepAgent 到底 deep 在哪里

## 课程 02：从 0 跑通第一个 Agent

目标：让小白真的在本地跑起来。

### 需要掌握

- Python 是什么。
- 终端是什么。
- 虚拟环境是什么。
- `pip` 和依赖包是什么。
- API Key 是什么，为什么不能提交到 GitHub。
- 如何安装 `deepagents`。
- 如何创建最小 Agent。
- 如何调用 `agent.invoke()`。
- 如何看懂基本输出。

### 需要涉及

- Python 版本检查。
- 虚拟环境创建和激活。
- `.env` 和 `.gitignore`。
- 安装依赖。
- 最小可运行代码。
- 常见报错：Python 版本、依赖安装、API Key 配置错误。
- “你应该看到什么输出”。

### 建议分工

- 主写人：Lancer
- Reviewer：Maxwel

原因：这部分最适合从小白视角踩坑。Lancer 写，Maxwel 完整试跑。

### 初步章节

- 准备 Python 环境
- API Key 与环境变量
- 安装 DeepAgents
- 跑通第一个 Agent
- 看懂第一次输出

## 课程 03：让 Agent 会使用工具

目标：让读者理解 Agent 为什么不只是聊天，而是能做事。

本课程会开始正式使用贯穿项目：MaxLance Assistant，一个帮助小白学习 DeepAgent 的学习助理。第三章只让它学会调用工具，不提前展开多 Agent 协作。

### 需要掌握

- Tool 是什么。
- Tool Calling 是什么。
- Python 函数如何变成 Agent 工具。
- 参数、返回值、docstring 为什么重要。
- Agent 什么时候决定调用工具。
- 工具调用失败时怎么办。
- 工具权限为什么需要谨慎。

### 需要涉及

- 一个最简单工具，例如计算学习时间。
- 一个文件工具，例如保存学习计划。
- 一个资料推荐工具，例如从本地资料库推荐学习资料，后续再扩展成真实搜索。
- 工具调用流程图。
- 工具返回值如何进入 Agent 上下文。
- 工具失败时的错误信息。

### 建议分工

- 主写人：待定
- Reviewer：另一个人完整跑一遍

建议这门课只由一个人主写，避免同一个概念解释口径不一致。

### 初步章节

- 为什么 Agent 需要工具
- 写第一个 Python 工具
- 让 Agent 调用工具
- 工具参数、返回值和 docstring
- 工具失败与权限边界

## 课程 04：让 Agent 能完成复杂任务

目标：进入 DeepAgents 的核心能力。

### 需要掌握

- Planning 是什么。
- 为什么 Agent 要先拆任务。
- Context engineering 是什么。
- 文件系统为什么重要。
- Memory 和普通聊天记录有什么区别。
- Subagent 是什么。
- 什么时候需要子 Agent。

### 需要涉及

- `write_todos` 和任务规划思想。
- 读写文件保存中间结果。
- 长任务为什么不能只靠上下文。
- 主 Agent 与子 Agent 的分工。
- 一个稍复杂任务：生成学习计划、保存笔记、生成复习题。

### 建议分工

- Planning / Context / File System：Maxwel
- Memory / Subagent：Lancer
- 两人互相 review。

原因：这门课概念多，可以拆开写，但最后必须统一表达风格。

### 初步章节

- Planning：先想清楚再行动
- 文件系统：让 Agent 保存中间结果
- Context engineering：让 Agent 看见该看的信息
- Memory：让 Agent 记住长期信息
- Subagent：让多个 Agent 分工协作

## 课程 05：安全、调试与完整项目实战

目标：把前面能力组合成一个真正项目。

### 需要掌握

- Permission 是什么。
- Human-in-the-loop 是什么。
- Sandbox 是什么。
- Streaming 有什么用。
- LangSmith 用来干什么。
- 如何组织一个完整 Agent 项目。

### 需要涉及

- 高风险操作前必须确认。
- 文件读写权限边界。
- 安全运行环境。
- 执行过程展示。
- 调试 Agent 每一步做了什么。
- 最终项目：帮助小白学习 DeepAgent 的 Agent。

### 建议分工

- Maxwel 和 Lancer 共同完成。

原因：这是课程验收项目，必须两个人都能完整跑通、解释清楚、改得动。

### 初步章节

- Permission：给 Agent 设置边界
- Human-in-the-loop：重要操作前先问人
- Sandbox：让 Agent 在安全环境里试错
- Streaming：边执行边看过程
- LangSmith：记录、调试和复盘
- 最终项目实战

## 当前优先级

优先完成前两门课：

1. 课程 01：DeepAgent 零基础入门
2. 课程 02：从 0 跑通第一个 Agent

原因：

- 它们决定读者是否愿意继续学。
- 它们能验证课程哲学是否成立。
- 它们能让 Maxwel 和 Lancer 先从小白视角走一遍完整流程。

## 状态表

| 课程 | 状态 | 主写人 | Reviewer |
| --- | --- | --- | --- |
| 01. DeepAgent 零基础入门 | 规划中 | Maxwel | Lancer |
| 02. 从 0 跑通第一个 Agent | 规划中 | Lancer | Maxwel |
| 03. 让 Agent 会使用工具 | 规划中 | 待定 | 待定 |
| 04. 让 Agent 能完成复杂任务 | 规划中 | Maxwel / Lancer | 互审 |
| 05. 安全、调试与完整项目实战 | 规划中 | Maxwel / Lancer | 互审 |
