# DeepAgent 到底 deep 在哪里

## 这一节你会学到什么

你会理解一个很容易误会的问题：

> DeepAgent 的 deep，不是说它像人一样“思想很深”，而是说它更适合处理长任务、复杂任务和多步骤任务。

## 一句话讲清楚

Deep Agents 把规划、文件系统、上下文管理、工具、子 Agent、记忆和安全确认等能力组合成一个更完整的 Agent 工作台。

这就是它和普通聊天模型、简单工具调用 Agent 的区别。

## 为什么普通 Agent 不够用

想象你让一个 Agent 做这件事：

> 帮我调研 Deep Agents 官方资料，整理一份小白教程大纲，再把每一节课的示例代码和常见错误也列出来。

这不是一个“一问一答”的任务。

它至少需要：

- 先拆任务。
- 搜集资料。
- 保存中间结果。
- 对比不同资料。
- 整理大纲。
- 生成示例代码。
- 检查有没有遗漏。
- 最后输出一份结构化内容。

如果只靠一次模型回答，它很容易漏步骤、丢上下文、忘记前面查过什么。

Deep Agents 的价值就在这里：它给 Agent 提供了一套更适合长任务的默认结构。

## Deep 主要体现在这些能力

这一节会出现很多新词。你现在不用掌握实现方式，只要先知道它们分别解决什么问题。

如果你读到某个词觉得陌生，可以先跳过细节。比如 `subagent`、`memory`、`permission` 后面都会单独再讲。

可以先分成三层记：

- **第一层**：能把任务拆开
- **第二层**：能保存和管理中间信息
- **第三层**：能分工、记忆，并在危险操作前问人

回到我们的学习助手：

- 它要先把“学习 DeepAgent”拆成每天任务，这需要 planning。
- 它要保存计划、笔记和练习题，这需要 filesystem。
- 它要根据你的反馈调整计划，这需要 context management 和 memory。
- 它要查资料或调用外部能力，这需要 tools。
- 它要在重要操作前问你，这需要 human-in-the-loop 和 permission。

### 1. Planning：先拆任务再行动

复杂任务不能只靠“直接回答”。

Deep Agents 内置了类似 `write_todos` 的任务规划能力，让 Agent 可以把大任务拆成小步骤，并在执行过程中更新进度。

用“电脑里的人”来理解：

> 不是一上来就埋头干活，而是先写一张待办清单。

### 2. Context management：管理它能看到的信息

大模型一次能看的内容是有限的。

如果任务很长，聊天记录、工具结果、资料摘录都会不断变多。上下文塞得太满，Agent 就容易变慢、变贵，甚至忘记关键内容。

Deep Agents 会帮助管理上下文，例如把较大的工具结果转移到虚拟文件系统里，让 Agent 需要时再读。

用简单话说：

> 不是什么都塞进脑子里，而是该放笔记本的放笔记本。

### 3. Filesystem：保存中间结果

很多长任务需要中间产物。

比如：

- 调研资料。
- 学习计划。
- 草稿。
- 检查清单。
- 代码文件。
- 运行结果。

Deep Agents 支持文件系统能力，让 Agent 可以读、写、编辑和搜索文件。文件系统不只是“存文件”，它也是上下文管理的一部分。

### 4. Tools：连接外部能力

模型自己不会查数据库、不会调用公司接口、不会运行你本地的函数。

工具让 Agent 可以连接外部世界。

在 Deep Agents 里，你可以把自定义 Python 函数、LangChain 工具，或者 MCP server 暴露出来的工具交给 Agent 使用。

### 5. Subagent：把子任务交给专门的人

有些任务太大，一个 Agent 全部自己做会很乱。

Deep Agents 支持子 Agent。主 Agent 可以把某个子任务交给另一个更专门的 Agent，让它在相对独立的上下文里完成，再把结果交回来。

用“电脑里的人”来理解：

> 主负责人不是什么都自己做，而是可以请研究助理、代码审查助理、资料整理助理分别处理不同部分。

### 6. Memory：跨对话记住长期信息

聊天记录只是在当前对话里有用。

如果你希望 Agent 下次还记得你的偏好、项目背景、写作风格或长期计划，就需要 memory。

Deep Agents 可以结合 LangGraph 的存储能力，让记忆跨线程、跨会话保存。

### 7. Human-in-the-loop 和 permission：重要操作前先问人

Agent 能做事是一把双刃剑。

能读写文件、运行命令、调用工具，也意味着它可能做错事。

所以复杂 Agent 必须有边界：

- 哪些文件能读。
- 哪些文件能写。
- 哪些工具能调用。
- 哪些操作必须先问人。

这就是 permission 和 human-in-the-loop 要解决的问题。

## 用一张图看整体关系

<div class="a4a-flow">
  <div><b>用户给出复杂任务</b></div>
  <div><b>Planning：拆成待办清单</b></div>
  <div><b>Tools + Filesystem</b><span>需要外部能力时调用工具，并把中间结果保存到文件</span></div>
  <div><b>Context management：管理上下文</b><span>只把关键信息放进当前输入</span></div>
  <div><b>Subagent：按需分工</b><span>任务太大时，把子任务交给专门的子 Agent</span></div>
  <div><b>生成下一步</b></div>
  <div><b>Human-in-the-loop</b><span>高风险操作前先暂停，让人确认</span></div>
  <div class="is-end"><b>完成任务</b></div>
</div>

## 代码里长什么样

现在你只需要先看结构：

```python
from deepagents import create_deep_agent

def search_learning_resource(topic: str) -> str:
    """Search learning resources for a topic."""
    return f"这里返回和 {topic} 相关的学习资料"

agent = create_deep_agent(
    model="...",
    tools=[search_learning_resource],
    system_prompt="你是一个耐心的新手教练。"
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "帮我制定一个 7 天 DeepAgent 学习计划，并保存关键学习任务。"
        }
    ]
})
```

先不用急着运行。

这里只要看懂三件事：

- `model` 决定它用哪个大模型当脑子。
- `tools` 决定它能调用哪些外部能力。
- `system_prompt` 决定它应该扮演什么角色、按什么规则工作。

而 Deep Agents 在这些基础上，还提供规划、文件系统、上下文管理、子 Agent 等默认能力。

## 跟着做

现在做一个“任务分类”练习。

下面这些任务，哪些需要 Deep Agents 这类长任务能力？

1. 用一句话解释什么是 Agent。
2. 阅读 5 篇资料，整理共同观点和分歧。
3. 根据我的学习情况，每周更新学习计划。
4. 把一个主题拆成课程大纲、练习题和常见错误清单。
5. 把一句中文翻译成英文。

参考判断：

- 第 1 个通常不需要，普通聊天就够了。
- 第 2 个需要，因为它涉及多资料、对比和整理。
- 第 3 个需要，因为它涉及长期记忆和持续调整。
- 第 4 个需要，因为它涉及拆任务、中间结果和结构化产出。
- 第 5 个通常不需要，普通模型就能完成。

## 你应该看到什么结果

学完这一节，你应该能判断什么时候需要 Deep Agents。

如果一个任务有这些特征，就更适合用 Deep Agents：

- 步骤多。
- 时间长。
- 需要保存中间结果。
- 需要读写文件。
- 需要调用工具。
- 需要子任务分工。
- 需要记住长期偏好。
- 重要操作前需要确认。

## 常见误解

### 误解 1：deep 就是模型更强

不是。

模型强当然有帮助，但 Deep Agents 的重点是 Agent 外面的工作台：规划、工具、状态、文件、上下文、子 Agent 和权限。

### 误解 2：Deep Agents 会自动把所有事情做好

不会。

你仍然需要设计清楚：

- 让 Agent 做什么。
- 给它哪些工具。
- 哪些操作要限制。
- 结果应该如何验证。

### 误解 3：越复杂越应该一开始就用 Deep Agents

也不一定。

如果只是问答、改写、总结一小段文字，普通聊天模型就够了。

如果任务需要多步骤执行、工具调用、长期上下文或文件中间结果，Deep Agents 才更值得使用。

## 自测

试着回答：

1. DeepAgent 的 deep 主要 deep 在哪里？
2. MaxLance Assistant 后面为什么需要规划、文件系统和权限？
3. 哪些任务用普通聊天模型就够了，不需要 Deep Agents？

## 小结

先记住：

> DeepAgent 的 deep，主要 deep 在长任务能力，而不是神秘感。

它帮你把一个“只会回答问题的模型”，变成一个更适合执行复杂任务的软件助手。

第一章到这里就结束了。进入第二章，我们会开始动手：准备环境并跑通第一个最小 Agent。

## 参考官方资料

- [Deep Agents overview](https://docs.langchain.com/oss/python/deepagents/overview)
- [Harness capabilities](https://docs.langchain.com/oss/python/deepagents/harness)
- [Customize Deep Agents](https://docs.langchain.com/oss/python/deepagents/customization)
- [deepagents GitHub](https://github.com/langchain-ai/deepagents)
