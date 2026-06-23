# 03. 让 Agent 会使用工具

第二章里，我们已经跑通了一个最小 Agent。

它可以回答问题，但还主要停留在“会说话”。

从这一章开始，我们会把这个 Agent 变成贯穿全课程的学习助理：

> MaxLance Assistant。

它的目标不是炫技，而是帮助小白一步一步学习 DeepAgent。

这一章先让 MaxLance Assistant 学会使用工具。

## 这一课你会学到什么

- 为什么模型本身不能完成所有任务。
- Tool 是什么。
- Tool Calling 是什么。
- Python 函数如何变成 Agent 工具。
- 参数、返回值和 docstring 为什么重要。
- Agent 什么时候会调用工具。
- 工具调用失败时怎么办。
- 工具权限为什么需要谨慎。

## 一句话讲清楚

工具就是 Agent 可以使用的能力。

Tool Calling 就是 Agent 判断“现在需要打开某个工具”，然后把参数交给工具执行。

## 这一章会做什么

我们会一步一步完成：

1. 理解 Agent 为什么需要工具。
2. 写一个最简单的 Python 工具。
3. 把工具交给 MaxLance Assistant。
4. 观察工具返回值如何进入 Agent 的回答。
5. 理解参数、返回值和 docstring。
6. 给文件工具、资料推荐工具设置清晰边界。
7. 认识工具失败时的错误信息。

## 这一章不要求你掌握什么

你现在不用掌握：

- Python 高级语法。
- 真实互联网搜索 API。
- 完整文件系统设计。
- 多 Agent 协作。
- 权限系统的所有细节。

这些会在后面的课程继续展开。

这一章只关注一件事：

> 让 Agent 学会调用工具。

## 最终产物

你会得到一个更像学习助理的 MaxLance Assistant。

它会拥有三个基础工具：

- 计算学习时间。
- 从本地资料库推荐学习资料。
- 把学习计划保存到安全目录。

这些工具不复杂，但足够说明 Agent 从“会说话”到“会做事”的关键变化。

## 章节

1. [为什么 Agent 需要工具](./why-tools.md)
2. [写第一个 Python 工具](./first-python-tool.md)
3. [让 Agent 调用工具](./agent-call-tool.md)
4. [工具参数、返回值和 docstring](./tool-parameters-return-docstring.md)
5. [工具失败与权限边界](./tool-failure-permission.md)

## 通过标准

学完这一章后，你应该能做到：

- 用自己的话解释 Tool 和 Tool Calling。
- 写一个普通 Python 函数。
- 把 Python 函数交给 `create_deep_agent()`。
- 知道 docstring 会影响 Agent 如何理解工具。
- 看懂一次工具调用的大概流程。
- 知道文件工具和资料推荐工具为什么需要边界。

如果这些都完成，你就可以进入第四章，让 MaxLance Assistant 处理更复杂的任务。
