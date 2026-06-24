# 05. 安全、调试与完整项目实战

前面几章，我们已经把 MaxLance Assistant 做到了这里：

1. 先看懂 Agent 是什么。
2. 在本地跑通第一个版本。
3. 让它会使用工具。
4. 让它能规划、保存文件、管理上下文、使用 memory 和 subagent。

这一章要做最后一件事：

> 把这些能力组合成一个更完整、更安全、能继续改造的学习助手。

## 这一章会学什么

第五章解决的是：

> 让 Agent 不只是能做事，而且能在可控、可观察、可继续改造的范围内做事。

用“电脑里的人”来理解：

> 你不只是请了一个助理，还要告诉他哪些文件能碰、哪些动作要先问你、出错后怎么复盘、工作过程怎么留下记录。

这一章会重点学习：

- Permission 是什么，为什么 Agent 做事前要有边界。
- Human-in-the-loop 是什么，为什么重要操作前要先问人。
- Sandbox 是什么，为什么不能让 Agent 随便在真实环境里试错。
- Streaming 有什么用，为什么要看见 Agent 的执行过程。
- LangSmith 用来做什么，什么时候值得接入调试和复盘。
- 一个完整 Agent 项目应该怎么组织。

## 为什么需要安全和调试

Agent 能力越强，风险也越高。

一个只会回答问题的 Agent，最多是答错。

一个会读写文件、调用工具、执行任务的 Agent，可能会：

- 覆盖重要文件。
- 读取不该读的内容。
- 调用昂贵或危险的工具。
- 在你看不见的地方做了很多步骤。
- 出错后不知道从哪里查原因。

所以完整项目不能只追求“能跑”。

还要追求：

- 边界清楚
- 重要操作可确认
- 过程可观察
- 问题可复盘
- 项目结构可继续扩展

## 最终项目会做什么

你会完成一个本地版学习助手。

它会围绕一个安全的学习工作区运行：

```text
agent4all_workspace/
```

它能做这些事：

- 制定 DeepAgent 学习计划。
- 保存学习笔记和复盘问题。
- 只在指定工作区内读写文件。
- 遇到覆盖或删除学习笔记这类操作时先提醒你确认。
- 可以用 streaming 观察执行过程。
- 可以选择接入 LangSmith 做调试和复盘。

## 本章不强制做什么

为了让初学者能完整走完主线，这一章不强制要求：

- 注册 LangSmith。
- 部署到线上。
- 购买或配置远程 sandbox 服务。
- 接入真实邮件、支付、数据库等高风险外部系统。

这些都可以以后再做。

这一章的主线是：先在本地做出一个安全、清楚、可观察的 Agent 项目。

## 本章路线

<div class="a4a-chapter-map">
  <a href="./permissions">
    <span>01</span>
    <strong>Permission</strong>
    <em>给 Agent 设置能做什么的边界</em>
  </a>
  <a href="./human-in-the-loop">
    <span>02</span>
    <strong>Human-in-the-loop</strong>
    <em>重要操作前先暂停问人</em>
  </a>
  <a href="./sandbox">
    <span>03</span>
    <strong>Sandbox</strong>
    <em>让 Agent 在安全环境里试错</em>
  </a>
  <a href="./streaming">
    <span>04</span>
    <strong>Streaming</strong>
    <em>边执行边看过程</em>
  </a>
  <a href="./langsmith">
    <span>05</span>
    <strong>LangSmith</strong>
    <em>记录、调试和复盘执行过程</em>
  </a>
  <a href="./final-project">
    <span>06</span>
    <strong>最终项目实战</strong>
    <em>组装一个完整的学习助手 Agent</em>
  </a>
</div>

## 学完怎么判断对不对

学完这一章后，你应该能做到：

- 解释为什么 Agent 需要权限边界。
- 知道哪些操作应该 human-in-the-loop。
- 知道 sandbox 解决什么风险。
- 能用 streaming 看见 Agent 执行过程。
- 知道 LangSmith 可以帮你看什么。
- 能组织一个本地可运行、可继续改造的学习助手项目。

如果你能完成最终项目，你就已经走完整条 Agent4all 入门路径。
