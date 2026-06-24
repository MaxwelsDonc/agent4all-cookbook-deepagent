# 最终项目实战：学习助手 Agent

## 这一节你会学到什么

你会把前面几章学到的能力组合起来，完成一个本地版 DeepAgent 学习助手。

这个项目不会追求复杂功能。

它的目标是：

> 做出一个安全、清楚、可运行、能继续改造的 Agent。

## 一句话讲清楚

最终项目就是把 model、prompt、tools、filesystem、permission、human-in-the-loop 和可选调试能力组合起来。

用“电脑里的人”来理解：

> 你终于给这个电脑里的学习助手安排好了岗位说明、工作桌面、可用工具、安全边界和复盘方式。

## 为什么需要最终项目

前面每一章都学了一个部件：

| 章节 | 学到的部件 |
| --- | --- |
| 第一章 | Agent、model、prompt、messages、context |
| 第二章 | 本地环境、API Key、`create_deep_agent()`、`agent.invoke()` |
| 第三章 | tools 和 tool calling |
| 第四章 | planning、filesystem、context、memory、subagent |
| 第五章 | permission、human-in-the-loop、streaming、debug |

如果只学概念，很容易忘。

最终项目的作用是把这些部件装到一起。

## 最终项目会做什么

我们要做一个学习助手，支持这些任务：

- 根据用户时间生成学习计划。
- 保存学习笔记。
- 生成复盘问题。
- 只在 `agent4all_workspace/` 中保存学习内容。
- 覆盖重要笔记前先让用户确认。
- 可选：用 streaming 或 LangSmith 观察执行过程。

## 项目文件

在项目根目录创建：

```text
learning_coach_agent.py
```

运行后，它会使用这个工作区：

```text
agent4all_workspace/
```

这些文件都只是本地练习产物，不需要提交到 GitHub。

## 代码里长什么样

写入下面代码：

```python
from pathlib import Path

from dotenv import load_dotenv
from deepagents import FilesystemPermission, create_deep_agent
from deepagents.backends import FilesystemBackend
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import Command

load_dotenv()

PROJECT_ROOT = Path.cwd().resolve()
WORKSPACE_DIR = Path("agent4all_workspace")
WORKSPACE_DIR.mkdir(exist_ok=True)
backend = FilesystemBackend(root_dir=str(PROJECT_ROOT))

permissions = [
    FilesystemPermission(
        operations=["read", "write"],
        paths=["/agent4all_workspace/**"],
        mode="allow",
    ),
    FilesystemPermission(
        operations=["read", "write"],
        paths=["/**"],
        mode="deny",
    ),
]


def save_learning_note(filename: str, content: str) -> str:
    """Save or overwrite a DeepAgent learning note in agent4all_workspace."""
    safe_name = filename.replace("/", "-").replace("\\", "-")
    path = WORKSPACE_DIR / safe_name
    path.write_text(content, encoding="utf-8")
    return f"已保存到 {path}"


def make_review_questions(topic: str, count: int = 3) -> str:
    """Create beginner-friendly review questions for a DeepAgent topic."""
    questions = [
        f"{index}. {topic} 解决了什么问题？"
        for index in range(1, count + 1)
    ]
    return "\n".join(questions)


checkpointer = MemorySaver()

agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[save_learning_note, make_review_questions],
    backend=backend,
    permissions=permissions,
    interrupt_on={"save_learning_note": True},
    checkpointer=checkpointer,
    system_prompt=(
        "你是 Agent4all 的 DeepAgent 学习助手。"
        "你的用户是初学者，所以要用简单语言解释。"
        "你可以帮助用户制定学习计划、保存学习笔记、生成复盘问题。"
        "所有学习文件都必须保存到 agent4all_workspace。"
        "保存或覆盖学习笔记前，必须等待用户确认。"
        "最终回答要包含：你做了什么、保存了什么、下一步建议。"
    ),
)

config = {"configurable": {"thread_id": "agent4all-final-project"}}

task = input("请输入你想让学习助手完成的任务：")

result = agent.invoke(
    {"messages": [{"role": "user", "content": task}]},
    config=config,
    version="v2",
)

if result.interrupts:
    interrupt_value = result.interrupts[0].value
    action_requests = interrupt_value["action_requests"]

    print("\nAgent 已暂停，等待你确认保存文件。")
    for action in action_requests:
        print(f"工具：{action['name']}")
        print(f"参数：{action['args']}")

    decision = input("\n是否允许？输入 yes 继续，否则拒绝：")

    if decision.strip().lower() == "yes":
        decisions = [{"type": "approve"}]
    else:
        decisions = [
            {
                "type": "reject",
                "message": "用户拒绝保存文件，请只给出文字结果，不要再次尝试保存。",
            }
        ]

    final_result = agent.invoke(
        Command(resume={"decisions": decisions}),
        config=config,
        version="v2",
    )
else:
    final_result = result

print("\n最终回答：")
print(final_result.value["messages"][-1].content)
```

## 跟着做

运行：

```bash
python learning_coach_agent.py
```

当程序问你任务时，可以输入：

> 我每天只有 30 分钟，请帮我制定一个 5 天 DeepAgent 复习计划，保存成 final-review-plan.md，并生成 5 个复盘问题。

如果程序询问是否允许保存文件，输入：

```text
yes
```

然后检查：

```text
agent4all_workspace/final-review-plan.md
```

## 你应该看到什么结果

如果一切正常，你应该看到：

- Agent 根据你的时间制定学习计划。
- 程序在保存文件前暂停。
- 你确认后，文件被保存到 `agent4all_workspace/`。
- 最终回答说明完成了什么，并给出下一步建议。

这就是一个最小但完整的本地 Agent 项目。

## 你已经学会了什么

走到这里，你已经不只是“看过 Agent 概念”。

你已经完成了：

1. 理解 Agent
2. 准备环境
3. 运行 Agent
4. 使用工具
5. 保存文件
6. 管理复杂任务
7. 设置安全边界
8. 加入人工确认
9. 观察和调试执行过程
10. 完成最终项目

这条路径已经覆盖了 DeepAgent 入门最重要的骨架。

## 常见错误

### 错误 1：没有生成文件

可能是 Agent 没有调用保存工具。

可以把任务说得更明确：

> 请必须调用 save_learning_note 工具保存成 final-review-plan.md。

### 错误 2：程序暂停后不知道该输入什么

如果你确认允许保存文件，输入：

```text
yes
```

如果你不想保存，就输入其他内容。

### 错误 3：最终回答说保存了，但找不到文件

检查文件夹：

```text
agent4all_workspace/
```

也检查文件名是否被安全处理过。

如果文件名包含 `/` 或 `\`，代码会把它替换成 `-`。

### 错误 4：把这个项目直接当成生产系统

不要。

这是学习版项目。

如果要做真实线上系统，还需要继续考虑：

- 用户身份。
- 更严格权限。
- 持久化存储。
- 日志和监控。
- 成本控制。
- 错误恢复。
- 安全审计。

## 自测

完成最终项目后，试着回答：

1. MaxLance Assistant 现在由哪些核心部件组成？
2. 它为什么只能在 `agent4all_workspace/` 里保存学习内容？
3. 如果你要继续改造它，最适合先增加哪一个小能力？

## 小结

这一节你完成了 Agent4all 的最终入门项目。

你现在已经有一个可以继续改造的本地学习助手。

下一步可以尝试：

- 给它增加搜索资料工具。
- 给它增加长期 memory。
- 把 subagent 用到练习题生成或资料整理里。
- 接入 LangSmith 观察运行过程。
- 把最终项目整理成更正式的应用。

到这里，Agent4all 的第一条学习路径完成了。
