# 04. 让 Agent 能完成复杂任务

前面几章，MaxLance Assistant 已经走过三步：

1. 先看懂它需要哪些部件。
2. 在本地跑通第一个版本。
3. 让它学会调用工具。

这一章开始进入 Deep Agents 更核心的地方。

我们不再只让 Agent 回答一个问题，而是让它处理更长、更复杂、更像真实工作的任务。

## 这一章会学什么

复杂任务不能只靠“模型直接回答”。

MaxLance Assistant 需要学会：

- 先计划
- 再执行
- 过程中保存中间结果
- 只把关键内容放进上下文
- 需要时记住长期偏好
- 任务太大时交给子 Agent 分工

用“电脑里的人”来理解：

> 他不再只是坐在电脑前聊天，而是开始像一个真正的助理一样，写待办、整理文件、保存笔记、记住偏好，并在任务太大时请别人一起做。

## 为什么要进入复杂任务

第三章的工具调用还比较短：

1. 用户提出问题
2. Agent 选择工具
3. 工具返回结果
4. Agent 回答用户

但真实学习任务经常更长，比如：

> 请帮我制定一个 7 天 DeepAgent 学习计划，保存关键学习笔记，并根据我的薄弱点生成复习建议。

这已经不是一句简单回答能稳定完成的任务。

它至少需要：

- 先拆出任务步骤。
- 保存计划和笔记。
- 管理上下文，避免信息越堆越乱。
- 记住用户偏好。
- 在需要时把某个子任务交给专门的 subagent。

## 本章不急着做什么

为了让初学者先学明白，这一章不会一上来讲生产环境里的复杂配置。

我们先不深入这些内容：

- 部署到线上。
- 多用户权限系统。
- 复杂数据库存储。
- 成本监控。
- 人工审批流程。

这些会放到后面的安全、调试和完整项目实战里。

## 本章路线

<div class="a4a-chapter-map">
  <a href="./planning">
    <span>01</span>
    <strong>Planning</strong>
    <em>先想清楚再行动</em>
  </a>
  <a href="./filesystem">
    <span>02</span>
    <strong>文件系统</strong>
    <em>把计划和笔记保存成文件</em>
  </a>
  <a href="./context-engineering">
    <span>03</span>
    <strong>Context engineering</strong>
    <em>控制 Agent 当前看什么</em>
  </a>
  <a href="./memory">
    <span>04</span>
    <strong>Memory</strong>
    <em>跨对话记住长期偏好</em>
  </a>
  <a href="./subagent">
    <span>05</span>
    <strong>Subagent</strong>
    <em>把子任务交给专门的助理</em>
  </a>
</div>

## 学完怎么判断对不对

学完这一章后，你应该能用自己的话解释：

- **Planning**：让 Agent 先拆任务，而不是直接硬答。
- **Filesystem**：让 Agent 把计划、资料和中间结果保存下来。
- **Context engineering**：控制 Agent 当前看什么、暂时不看什么。
- **Memory**：让 Agent 跨对话记住长期偏好和背景。
- **Subagent**：让主 Agent 把某些子任务交给更专门的 Agent。

你还应该能判断：

- 哪些任务普通聊天就够了。
- 哪些任务需要 Deep Agents 的长任务能力。
- 为什么复杂 Agent 需要规划、文件、上下文、记忆和分工。

如果这些能说清楚，MaxLance Assistant 就开始从“工具调用助手”变成“学习项目助理”。
