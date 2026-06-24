# 03. 让 Agent 会使用工具

第二章里，你已经跑通了 MaxLance Assistant 的第一个版本。

它可以回答问题，但还主要停留在“会说话”。

这一章要让它迈出关键一步：

> 从会说话，变成会做事。

## 这一章会学什么

工具就是 Agent 可以使用的能力。

Tool Calling 就是 Agent 判断“现在需要打开某个工具”，然后把参数交给工具执行。

这一章会围绕 MaxLance Assistant 增加三个基础工具：

- 计算学习时间。
- 从本地资料库推荐学习资料。
- 把学习计划保存到安全目录。

这些工具不复杂，但足够说明 Agent 从“生成一段话”到“先做一步可验证操作，再回答用户”的关键变化。

## 为什么 Agent 需要工具

模型很会理解和表达，但它不能凭空完成所有事情。

只靠模型本身，MaxLance Assistant 很容易遇到这些限制：

- 不适合可靠地完成精确计算。
- 不能真正保存你的学习计划。
- 不能读取或使用外部资料。
- 可能把不知道的内容说得像真的一样。

工具让 Agent 能把一部分任务交给确定的函数或系统完成。

## 本章不做什么

你现在不用掌握：

- Python 高级语法。
- 真实互联网搜索 API。
- 完整文件系统设计。
- 多 Agent 协作。
- 权限系统的所有细节。

这些会在后面的课程继续展开。

这一章只关注一件事：让 MaxLance Assistant 学会调用工具。

## 本章路线

<div class="a4a-chapter-map">
  <a href="./why-tools">
    <span>01</span>
    <strong>为什么 Agent 需要工具</strong>
    <em>理解工具补上了模型的哪些短板</em>
  </a>
  <a href="./first-python-tool">
    <span>02</span>
    <strong>写第一个 Python 工具</strong>
    <em>把一个函数变成 Agent 能用的工具</em>
  </a>
  <a href="./agent-call-tool">
    <span>03</span>
    <strong>让 Agent 调用工具</strong>
    <em>把工具交给 Agent 并触发调用</em>
  </a>
  <a href="./tool-parameters-return-docstring">
    <span>04</span>
    <strong>工具参数、返回值和 docstring</strong>
    <em>让 Agent 看懂怎么用你的工具</em>
  </a>
  <a href="./tool-failure-permission">
    <span>05</span>
    <strong>工具失败与权限边界</strong>
    <em>处理报错并守住安全边界</em>
  </a>
</div>

## 学完怎么判断对不对

学完这一章后，你应该能做到：

- 用自己的话解释 Tool 和 Tool Calling。
- 写一个普通 Python 函数。
- 把 Python 函数交给 `create_deep_agent()`。
- 知道 docstring 会影响 Agent 如何理解工具。
- 看懂一次工具调用的大概流程。
- 知道文件工具和资料推荐工具为什么需要边界。

如果这些都完成，MaxLance Assistant 就不只是会回答问题，而是开始具备做事能力。
