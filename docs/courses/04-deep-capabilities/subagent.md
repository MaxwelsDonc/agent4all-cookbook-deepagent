# Subagent：让多个 Agent 分工协作

## 这一节你会学到什么

你会理解 Subagent 是什么，以及为什么复杂任务有时不应该让一个 Agent 全部自己做。

你还会看到一个最小的 subagent 配置形态。

## 一句话讲清楚

Subagent 是主 Agent 请来的专门助理。

用“电脑里的人”来理解：

> 主负责人不一定亲自做所有事。遇到资料整理、代码检查、练习题生成这类子任务时，他可以请一个更专门的人完成，再把结果汇总回来。

## 为什么需要它

复杂任务有一个很常见的问题：主 Agent 的上下文会越来越乱。

比如你让 Agent 做：

> 帮我整理 DeepAgent 第四章：解释 planning、文件系统、context、memory、subagent，再生成练习题和常见错误。

这个任务里有很多子任务。

如果主 Agent 自己完成所有事情，它的 context 里可能塞满：

- 每个概念的解释草稿。
- 示例代码。
- 检查清单。
- 练习题。
- 修改意见。
- 中间推理过程。

内容越多，越容易乱。

Subagent 的价值是：

- 把某个子任务隔离出去。
- 子 Agent 自己完成细节。
- 主 Agent 只接收最终结果。

这能让主 Agent 保持清爽，专心做协调和最终整合。

## 用一个简单例子理解

你要做一份课程。

一个人可以全包：

> 查资料、写大纲、写代码、出练习、做校对。

但更好的分工可能是：

- **主编**：决定结构和最终质量。
- **资料助理**：查资料并总结。
- **练习助理**：设计练习题。
- **校对助理**：检查是否适合新手。

Subagent 就像这些助理。

它不是另一个用户，而是主 Agent 在任务内部调用的专门 Agent。

## 回到 Agent

Deep Agents 支持 subagents。

官方文档里会看到 `subagents` 参数。

一个 subagent 通常需要：

| 字段 | 作用 |
| --- | --- |
| `name` | 子 Agent 的名字 |
| `description` | 告诉主 Agent 什么时候该用它 |
| `system_prompt` | 告诉子 Agent 应该怎么工作 |
| `tools` | 可选，限制或指定子 Agent 能用哪些工具 |
| `model` | 可选，让子 Agent 使用不同模型 |

这里最重要的是 `description`。

因为主 Agent 会根据它判断：

> 这个任务要不要交给这个 subagent？

如果 description 写得太模糊，主 Agent 就可能不用它，或者用错它。

## 代码里长什么样

创建一个新文件：

```text
subagent_demo.py
```

写入下面代码：

```python
from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()

exercise_subagent = {
    "name": "exercise-designer",
    "description": (
        "用于为 DeepAgent 初学者设计练习题。"
        "当任务需要生成自测题、练习任务或复盘问题时使用。"
    ),
    "system_prompt": (
        "你是一个面向初学者的练习设计助理。"
        "你只负责设计练习题和复盘问题。"
        "题目必须简单、具体、能帮助新手检查自己是否理解。"
        "返回结果要简洁。"
    ),
}

agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    subagents=[exercise_subagent],
    system_prompt=(
        "你是 DeepAgent 学习项目的主教练。"
        "你负责安排学习路径。"
        "当需要练习题或复盘问题时，请交给 exercise-designer。"
    ),
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": (
                "请为我安排一节 30 分钟的 subagent 入门课，"
                "并生成 5 个复盘问题。"
            ),
        }
    ]
})

print(result["messages"][-1].content)
```

这段代码里：

- 主 Agent 负责安排课程。
- `exercise-designer` 负责生成练习和复盘问题。
- 主 Agent 最后把结果组织给用户。

## 跟着做

运行：

```bash
python subagent_demo.py
```

观察输出是否包含：

- 一节 30 分钟的学习安排。
- 5 个复盘问题。
- 内容是否适合初学者。

如果完整输出中出现和 `exercise-designer` 或任务委派有关的信息，说明 subagent 被调用的痕迹更明显。

如果最终回答合理，但你没看到明显痕迹，也先不要慌。不同模型和输出方式展示细节可能不同。

## 你应该看到什么结果

你应该得到一份结构清晰的学习安排，例如：

```text
30 分钟安排：
1. 5 分钟：用生活例子理解 subagent
2. 10 分钟：看最小代码结构
3. 10 分钟：比较主 Agent 和子 Agent 的分工
4. 5 分钟：完成复盘问题

复盘问题：
...
```

重点不是文字一模一样。

重点是你能看懂：

- 主 Agent 负责统筹。
- Subagent 负责某个专门子任务。

## 常见错误

### 错误 1：什么任务都用 subagent

不需要。

简单问题直接回答就行。

Subagent 更适合：

- 多步骤任务。
- 资料很多的任务。
- 需要专门角色的任务。
- 会污染主 Agent context 的任务。

### 错误 2：description 写得太空

不要只写：

> 帮助用户。

这太模糊。

更好的写法是：

> 当任务需要为 DeepAgent 初学者生成练习题、自测题或复盘问题时使用。

主 Agent 才知道什么时候该调用它。

### 错误 3：以为 subagent 会自动知道主 Agent 的全部规则

不要这样假设。

给 subagent 写清楚自己的 `system_prompt`。

它应该知道：

- 自己负责什么。
- 不负责什么。
- 输出格式是什么。
- 面向什么水平的用户。

### 错误 4：让 subagent 返回太多内容

Subagent 的价值之一是保持主 Agent context 清爽。

所以可以要求它：

> 只返回最终结论，不返回所有中间过程。

## 本章自测

进入第五章前，确认你能回答这些问题：

1. 为什么复杂任务要先 planning？
2. 文件系统解决了什么问题？
3. Context engineering 为什么不是“把所有资料都给模型”？
4. Memory 和 messages 有什么区别？
5. Subagent 什么时候值得使用？
6. 为什么 subagent 的 description 很重要？

如果你能用自己的话回答这些问题，说明你已经理解了 Deep Agents 更核心的一层。

## 小结

这一节你只需要记住：

> Subagent：主 Agent 请来的专门助理，用来隔离复杂子任务并保持主 Agent 清爽。

到这里，你已经从“让 Agent 会说话、会用工具”，走到了“让 Agent 能处理复杂任务”。

下一章会继续补齐安全、调试、权限和完整项目实战。
