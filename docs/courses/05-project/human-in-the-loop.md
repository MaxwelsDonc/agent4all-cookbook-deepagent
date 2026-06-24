# Human-in-the-loop：重要操作前先问人

## 这一节你会学到什么

你会理解 Human-in-the-loop 是什么。

你还会看到为什么“让 Agent 自动执行一切”并不总是好事。

## 一句话讲清楚

Human-in-the-loop 就是在关键步骤前，让 Agent 先暂停，等人确认。

用“电脑里的人”来理解：

> 助理可以整理学习笔记，但如果要覆盖旧计划或删除文件，应该先问你一句：确定吗？

## 为什么需要它

权限能解决“范围”问题。

比如：

> Agent 只能在 `agent4all_workspace/` 里工作。

但在这个范围内，仍然有高风险动作。

例如：

- 覆盖已有学习计划。
- 删除旧笔记。
- 批量修改文件。
- 调用需要花钱的工具。
- 向外部系统发送内容。

这些动作不一定完全禁止。

但最好先暂停，让人确认。

这就是 Human-in-the-loop。

## 用一个简单例子理解

你让助理整理桌面。

他可以直接做：

> 把新的学习计划放到文件夹里。

但如果他要做：

- 把旧计划扔掉。
- 把所有笔记合并覆盖。

他应该先问你。

Agent 也是这样。

## 回到 Agent

Deep Agents 可以通过 `interrupt_on` 配置，让某些工具调用前暂停。

你可以先记住：`interrupt_on` 用来指定哪些工具调用需要先打断、让人确认。

这一节用一个低风险例子演示：

> 当 Agent 要保存或覆盖学习笔记时，先暂停，等你批准。

注意：Human-in-the-loop 需要保存执行状态，所以代码里会使用 checkpointer。

## 代码里长什么样

创建文件：

```text
hitl_agent.py
```

写入：

```python
from pathlib import Path

from dotenv import load_dotenv
from deepagents import create_deep_agent
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import Command

load_dotenv()

WORKSPACE_DIR = Path("agent4all_workspace")
WORKSPACE_DIR.mkdir(exist_ok=True)


def save_learning_note(filename: str, content: str) -> str:
    """Save or overwrite a learning note in agent4all_workspace."""
    safe_name = filename.replace("/", "-").replace("\\", "-")
    path = WORKSPACE_DIR / safe_name
    path.write_text(content, encoding="utf-8")
    return f"已保存到 {path}"


checkpointer = MemorySaver()

agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[save_learning_note],
    interrupt_on={"save_learning_note": True},
    checkpointer=checkpointer,
    system_prompt=(
        "你是一个安全谨慎的 DeepAgent 学习助手。"
        "保存或覆盖学习笔记前，需要等待用户确认。"
    ),
)

config = {"configurable": {"thread_id": "agent4all-hitl-demo"}}

first_result = agent.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": (
                    "请总结今天学到的 permission 和 human-in-the-loop，"
                    "并保存到 safety-note.md。"
                ),
            }
        ]
    },
    config=config,
    version="v2",
)

if first_result.interrupts:
    interrupt_value = first_result.interrupts[0].value
    action_requests = interrupt_value["action_requests"]

    print("Agent 已暂停，等待你确认工具调用。")
    for action in action_requests:
        print(f"工具：{action['name']}")
        print(f"参数：{action['args']}")

    decision = input("是否允许保存学习笔记？输入 yes 继续：")

    if decision.strip().lower() == "yes":
        decisions = [{"type": "approve"}]
    else:
        decisions = [
            {
                "type": "reject",
                "message": "用户拒绝保存这份学习笔记，请不要再次尝试保存。",
            }
        ]

    final_result = agent.invoke(
        Command(resume={"decisions": decisions}),
        config=config,
        version="v2",
    )
else:
    final_result = first_result

print(final_result.value["messages"][-1].content)
```

这段代码里：

| 代码 | 作用 |
| --- | --- |
| `interrupt_on={"save_learning_note": True}` | 调用保存工具前先暂停 |
| `MemorySaver()` | 暂时保存执行状态 |
| `thread_id` | 让暂停和恢复发生在同一次任务里 |
| `Command(resume={"decisions": ...})` | 告诉 Agent 批准或拒绝 |

## 跟着做

运行：

```bash
python hitl_agent.py
```

看到提示后，如果你同意保存，输入：

```text
yes
```

然后检查：

```text
agent4all_workspace/safety-note.md
```

## 你应该看到什么结果

理想情况下，流程是：

1. Agent 准备调用 `save_learning_note`
2. 程序暂停
3. 你输入 `yes`
4. 程序用 approve 决策恢复执行
5. Agent 继续保存文件
6. 最终输出保存结果

这说明人已经进入了 Agent 的执行流程。

## 常见错误

### 错误 1：没有 checkpointer

Human-in-the-loop 需要保存暂停时的执行状态。

所以本节使用：

```python
checkpointer = MemorySaver()
```

没有它，Agent 很难从暂停点继续。

### 错误 2：忘记传同一个 config

暂停和恢复必须使用同一个 `thread_id`。

否则 Agent 不知道要恢复哪一次任务。

### 错误 3：把 `approve` 写成 `accept`

恢复执行时，批准应该写：

```python
{"type": "approve"}
```

拒绝应该写：

```python
{"type": "reject", "message": "..."}
```

### 错误 4：把所有工具都设置为人工确认

不一定需要。

如果每一步都要确认，Agent 会很难用。

适合 human-in-the-loop 的通常是：

- 删除。
- 覆盖。
- 发送。
- 花钱。
- 修改关键文件。

### 错误 5：以为人工确认可以代替权限

不能。

Permission 和 Human-in-the-loop 解决不同问题：

- **Permission**：限制范围。
- **Human-in-the-loop**：关键动作前暂停确认。

两者应该一起使用。

## 自测

确认你能回答：

1. Human-in-the-loop 适合用在哪些操作前？
2. 为什么“保存或覆盖学习笔记”可能需要先问人？
3. 用户拒绝后，Agent 应该继续强行执行吗？为什么？

## 小结

这一节你只需要记住：

> Human-in-the-loop：重要操作前让人确认。

Agent 越能做事，越需要在关键动作前停一下。

下一节，我们会讲如果 Agent 要运行代码或命令，为什么应该放进 sandbox。
