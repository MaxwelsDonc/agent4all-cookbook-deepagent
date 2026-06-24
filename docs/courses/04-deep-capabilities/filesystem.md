# 文件系统：让 Agent 保存中间结果

## 这一节你会学到什么

你会理解为什么复杂任务需要文件系统。

你还会让 Agent 把学习计划保存成一个本地文件。

## 一句话讲清楚

文件系统就是 Agent 的笔记本和文件夹。

用“电脑里的人”来理解：

> 他不能把所有资料都硬记在脑子里，所以需要把计划、草稿、笔记和中间结果写进文件。

## 为什么需要它

第二章里，我们让 Agent 直接回答问题。

这对短任务够用。

但复杂任务经常会产生中间结果：

- 学习计划。
- 调研资料。
- 草稿。
- 检查清单。
- 练习题。
- 用户反馈。

如果这些内容只留在一次回答里，很快就会乱。

文件系统的作用是：

> 把需要保留的内容放到文件里，让 Agent 后面需要时再读取或修改。

## 用一个简单例子理解

你让一个助理帮你准备考试。

如果他只在聊天里说：

> 你第一天学 A，第二天学 B，第三天学 C。

过几天你再问他：

> 我昨天学到哪里了？

他可能不记得。

更好的做法是把计划写进文件：

```text
notes/deepagent-plan.md
```

之后你可以打开文件看，Agent 也可以基于这个文件继续调整计划。

## 回到 Agent

Deep Agents 支持文件系统能力。

你现在可以先把它理解成两种情况：

| 类型 | 可以怎么理解 |
| --- | --- |
| 虚拟文件系统 | Deep Agents 运行过程中管理的文件空间，适合保存中间状态 |
| 本地文件工具 | 你自己写 Python 函数，把内容保存到项目里的某个文件夹 |

这一节先用更容易看见结果的方式：本地文件工具。

我们会让 Agent 把学习计划保存到 `notes/` 文件夹。

这样做有两个好处：

- 新手能直接在电脑上看到文件。
- 文件保存范围很小，不会让 Agent 随便写系统目录。

## 代码里长什么样

把上一节的 `complex_agent.py` 改成下面这样：

```python
from pathlib import Path

from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()

NOTES_DIR = Path("notes")


def save_study_file(filename: str, content: str) -> str:
    """Save a DeepAgent study note into the local notes folder."""
    NOTES_DIR.mkdir(exist_ok=True)
    safe_name = filename.replace("/", "-").replace("\\", "-")
    path = NOTES_DIR / safe_name
    path.write_text(content, encoding="utf-8")
    return f"已保存到 {path}"


agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[save_study_file],
    system_prompt=(
        "你是一个耐心的 DeepAgent 学习教练。"
        "当你生成学习计划或重要笔记时，要使用 save_study_file 工具保存。"
        "文件名使用英文小写和连字符，例如 deepagent-7-day-plan.md。"
    ),
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": (
                "请帮我制定一个 7 天 DeepAgent 学习计划，"
                "并把计划保存成 deepagent-7-day-plan.md。"
            ),
        }
    ]
})

print(result["messages"][-1].content)
```

这段代码做了几件事：

| 代码 | 作用 |
| --- | --- |
| `NOTES_DIR = Path("notes")` | 指定保存文件的文件夹 |
| `save_study_file(...)` | 定义一个保存文件的工具 |
| `NOTES_DIR.mkdir(exist_ok=True)` | 如果 `notes/` 不存在，就创建它 |
| `path.write_text(...)` | 把内容写进文件 |
| `tools=[save_study_file]` | 把保存文件的能力交给 Agent |

## 跟着做

运行：

```bash
python complex_agent.py
```

然后查看项目根目录。

你应该会看到一个新文件夹：

```text
notes/
```

里面应该有一个文件：

```text
deepagent-7-day-plan.md
```

你可以用编辑器打开它。

也可以在终端运行：

```bash
ls notes
```

macOS 或 Linux 可以继续运行：

```bash
cat notes/deepagent-7-day-plan.md
```

Windows PowerShell 可以运行：

```powershell
Get-Content .\notes\deepagent-7-day-plan.md
```

## 你应该看到什么结果

如果一切正常，你应该看到：

- 终端里有 Agent 的最终回答。
- 项目里多出 `notes/` 文件夹。
- `notes/deepagent-7-day-plan.md` 里有学习计划内容。

这说明 Agent 已经不只是“会说”，而是能把结果保存下来。

## 常见错误

### 错误 1：没有生成文件

先看终端有没有报错。

如果没有报错，但文件没生成，可能是模型没有调用工具。

可以把用户消息写得更明确：

> 必须调用 save_study_file 工具保存计划。

也可以在 `system_prompt` 里强调：

> 生成学习计划后必须保存文件。

### 错误 2：文件名写成了奇怪路径

不要让 Agent 写这种文件名：

```text
../../somewhere/secret.txt
```

教程里的 `safe_name` 会把 `/` 和 `\` 替换掉，避免路径跑出 `notes/`。

入门阶段先把保存范围限制在当前项目的 `notes/` 文件夹。

### 错误 3：中文内容显示乱码

代码里用了：

```python
encoding="utf-8"
```

如果你自己改写代码，记得保留这一点。

### 错误 4：以为文件系统等于长期记忆

不完全一样。

文件系统可以保存内容，但 memory 更强调“跨对话、跨任务保留下来的偏好、背景和经验”。

下一节会先讲 context，后面再讲 memory。

## 自测

试着回答：

1. 文件系统为什么能帮助 Agent 处理长任务？
2. 什么内容适合保存到文件，而不是全部塞进最终回答？
3. 为什么文件读写能力需要配合权限边界？

## 小结

这一节你只需要记住：

> 文件系统：让 Agent 保存计划、笔记和中间结果。

当任务变长时，不要让 Agent 把所有东西都塞在一次回答里。

该保存的内容，就放进文件。

下一节，我们会解释为什么“保存到文件”也是管理上下文的一部分。
