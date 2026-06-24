# LangChain、LangGraph 和 DeepAgents 是什么关系

## 这一节你会学到什么

你会知道三个名字分别是什么：

- LangChain
- LangGraph
- DeepAgents

这能帮你看官方文档时不迷路。

## 一句话讲清楚

LangChain 提供基础零件，LangGraph 负责流程和状态，DeepAgents 帮你快速组装一个更完整的 Agent。

入门阶段请先记住一句话：

> 不需要先学完 LangChain 和 LangGraph，我们先用 Deep Agents 跑起来。

更准确但现在不用背的说法是：Deep Agents 是 LangChain 生态里的 agent harness。

你可以先把 harness 理解成“工作台”。这张工作台站在 LangChain 和 LangGraph 之上，提前放好了长任务 Agent 常用的能力。

## 用一个简单例子理解

继续用“电脑里的人”来理解。

如果 Agent 是一个住在电脑里、能帮你做事的人，那么：

- LangChain 提供他的基础零件，比如脑子接口、消息格式、工具接口。
- LangGraph 管理他的工作流程，比如先做什么、后做什么、当前任务状态是什么。
- DeepAgents 是一个已经配好常用能力的高级助手模板。

也可以用“搭厨房”来理解：

- **LangChain** 像食材和厨具
- **LangGraph** 像厨房里的动线和流程
- **Deep Agents** 像一间已经配置好的工作厨房

你可以直接在工作厨房里做菜；等你需要改造厨房时，再深入理解厨具和动线。

回到我们的贯穿例子：

> 我们想做一个帮助小白学习 DeepAgent 的学习助手。

如果从零开始搭，LangChain 像模型、消息、工具这些零件；LangGraph 像这个助手做事时的流程；Deep Agents 像已经给学习助手准备好的工作台。

## 回到 DeepAgent

DeepAgents 不是凭空出现的。它建立在 LangChain 和 LangGraph 之上。

<div class="a4a-flow">
  <div><b>LangChain</b><span>模型、消息、工具等基础接口</span></div>
  <div><b>LangGraph</b><span>流程、状态、执行控制</span></div>
  <div><b>DeepAgents</b><span>规划、文件系统、子 Agent、记忆等能力</span></div>
  <div class="is-end"><b>你的 Agent 应用</b><span>建立在以上三层之上</span></div>
</div>

官方资料里也强调了这点：Deep Agents 不是替代 LangChain 或 LangGraph，而是在它们之上提供更完整、更有默认能力的 Agent 工作台。

## 为什么小白需要知道这个关系

因为官方文档里会经常出现这些名字。

如果你不知道它们的层次关系，就容易以为自己要同时学完三个框架才能开始。

实际上，入门阶段可以这样理解：

> 我们先使用 DeepAgents 快速做出一个能运行的 Agent。  
> 等需要更深定制时，再逐步理解 LangGraph 和 LangChain。

## 三者分别解决什么问题

| 名字 | 先怎么理解 | 主要解决什么问题 |
| --- | --- | --- |
| LangChain | 基础零件库 | 连接模型、消息、工具、外部服务 |
| LangGraph | 流程和状态引擎 | 让 Agent 的执行过程可控、可恢复、可观察 |
| Deep Agents | 长任务 Agent 工作台 | 默认带上规划、文件系统、上下文管理、子 Agent、记忆等能力 |

如果你只是想先跑通一个完整 Agent，可以从 Deep Agents 开始。

如果你想知道 Deep Agents 里面的执行流程为什么能保存状态、支持流式输出、支持人工确认，就会慢慢接触 LangGraph。

如果你要接入不同模型、工具和外部服务，就会接触 LangChain。

## 现在要学到什么程度

这一节不要求你会写 LangChain 或 LangGraph 代码。

你只要能做到下面这样就够了：

| 现在要知道 | 现在不用掌握 |
| --- | --- |
| LangChain 提供基础零件 | LangChain 的完整 API |
| LangGraph 管理流程和状态 | LangGraph 的底层图结构 |
| Deep Agents 站在它们之上 | Deep Agents 内部怎么实现 |
| 入门可以先从 Deep Agents 开始 | 三个框架的所有细节 |

## 官网文档怎么导航

小白看官方文档时，不要一上来就把所有页面都打开。

建议先按这个顺序看：

1. 先看 [Deep Agents overview](https://docs.langchain.com/oss/python/deepagents/overview)，知道它是什么。
2. 再看 [Quickstart](https://docs.langchain.com/oss/python/deepagents/quickstart)，知道最小代码长什么样。
3. 再看 [Harness capabilities](https://docs.langchain.com/oss/python/deepagents/harness)，理解规划、文件系统、子 Agent、记忆这些能力。
4. 真正要改 Agent 时，再看 [Customize Deep Agents](https://docs.langchain.com/oss/python/deepagents/customization)。
5. 遇到具体函数参数，再查 [API Reference](https://reference.langchain.com/python/deepagents)。

你现在不需要完全看懂官方文档里的每一行代码。

第一遍只找三个信息：

- 这个页面在讲什么能力。
- 这个能力解决什么问题。
- 它大概对应我们课程里的哪一节。

## 跟着做

打开官方文档时，可以先做一个“找路练习”。

看到下面这些词时，试着判断应该去哪里找：

| 你想找什么 | 优先看哪里 |
| --- | --- |
| Deep Agents 是什么 | Overview |
| 怎么快速跑起来 | Quickstart |
| 为什么有 todo、文件系统、子 Agent | Harness capabilities |
| 怎么改 system prompt、工具、子 Agent | Customize Deep Agents |
| 某个函数具体参数 | API Reference |

先不要做两件事：

- 不要一边看第一章一边急着安装环境。
- 不要因为官方文档里出现不懂的代码就停下来。

第一章的任务只是认路。真正动手会放到第二章。

## 你应该看到什么结果

学完这一节，你应该不会再把这三个名字混在一起。

你应该能说：

> 我可以先用 Deep Agents 上手。如果要理解执行流程和状态，再看 LangGraph；如果要接模型、工具和外部服务，再补 LangChain。

## 常见误解

### 误解 1：必须先学完 LangChain 才能学 DeepAgents

不需要。

你可以先用 DeepAgents 跑起来，再慢慢补 LangChain 的基础概念。

### 误解 2：LangGraph 是画图工具

不是。

LangGraph 里的 graph 更接近“任务流程图”和“状态流转系统”。它负责让 Agent 的执行过程更可控。

### 误解 3：DeepAgents 只是一个更大的 prompt

不是。

DeepAgents 不只是写了一段提示词。它还提供了规划、文件系统、子 Agent、记忆、安全控制等能力。

### 误解 4：用了 DeepAgents 就不需要理解底层概念

入门时可以先不用深入底层，但不能永远只会复制代码。

当你要调试 Agent 为什么调用了某个工具、为什么忘记了某段上下文、为什么任务执行到一半停住时，LangChain 和 LangGraph 的基础概念就会变得很重要。

### 误解 5：DeepAgent、DeepAgents、Deep Agents 是完全不同的东西

大多数入门场景里，你可以先把它们看成同一个学习方向里的不同写法。

更细一点说：

- Deep Agents 是官方文档里更常见的写法。
- DeepAgents 是很多文章和标题里的连写形式。
- `deepagents` 是代码或包名里会看到的写法。

## 自测

试着用自己的话回答：

1. LangChain、LangGraph、Deep Agents 分别更像哪一层？
2. 为什么 Deep Agents 不是“一个更大的 prompt”？
3. MaxLance Assistant 为什么不需要一开始就手写所有底层流程？

## 小结

先记住这个关系：

- **LangChain**：基础零件
- **LangGraph**：流程和状态
- **DeepAgents**：高级 Agent 套件

下一节，我们会解释代码里最常见的几个词：Model、Token、Prompt、Messages 和 Context。
