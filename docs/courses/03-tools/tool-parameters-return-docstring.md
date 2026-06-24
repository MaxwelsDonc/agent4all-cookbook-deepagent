# 工具参数、返回值和 docstring

## 这一节你会学到什么

你会理解一个工具为什么不能只“能跑”。

它还要让 Agent 看得懂。

这一节会重点解释：

- 参数是什么。
- 返回值是什么。
- docstring 为什么重要。
- 文件工具和资料推荐工具可以怎么写。

## 一句话讲清楚

参数告诉工具要处理什么，返回值告诉 Agent 工具做出了什么结果，docstring 告诉 Agent 什么时候该用这个工具。

## 为什么需要讲这些

对人来说，看到函数代码可以慢慢猜。

但 Agent 调用工具时，需要快速判断：

- 这个工具能做什么。
- 应该传哪些参数。
- 参数应该是什么类型。
- 工具结果能不能继续用来回答用户。

如果这些信息不清楚，Agent 就更容易传错参数、选错工具，或者干脆不用工具。

## 先看一个工具结构

```python
def calculate_study_time(days: int, hours_per_day: float) -> str:
    """Calculate total DeepAgent study time for a beginner."""
    total_hours = days * hours_per_day
    return f"你一共有 {total_hours} 小时可以学习 DeepAgent。"
```

可以拆成四部分：

| 部分 | 例子 | 作用 |
| --- | --- | --- |
| 函数名 | `calculate_study_time` | 告诉 Agent 这个工具大概做什么 |
| 参数 | `days`, `hours_per_day` | 告诉工具需要哪些信息 |
| 类型标注 | `int`, `float`, `str` | 帮 Agent 生成工具输入 schema |
| docstring | `Calculate total...` | 告诉 Agent 什么时候使用工具 |

新手阶段不要省略类型标注。

类型标注越清楚，Agent 越容易知道应该传什么参数。

这里的 schema 可以先理解成：

> 工具的参数说明表。

它告诉 Agent：这个工具需要哪些输入，每个输入大概是什么类型。

## 给 MaxLance Assistant 增加更多工具

现在我们给 MaxLance Assistant 增加两个工具：

- 一个资料推荐工具：从本地资料库推荐学习资料。
- 一个文件工具：把学习计划保存到固定目录。

这里的“资料推荐工具”有点像搜索，但先不连接真实互联网。

它只是模拟搜索。

这样做是为了让你先理解工具调用流程，不被 API、网络、认证这些问题打断。

## 跟着做：更新代码

把 `maxlance_agent.py` 改成下面这样：

```python
from pathlib import Path

from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()

NOTE_DIR = Path("learning_notes")


def calculate_study_time(days: int, hours_per_day: float) -> str:
    """Calculate total DeepAgent study time for a beginner."""
    if days <= 0:
        return "学习天数必须大于 0。"

    if hours_per_day <= 0:
        return "每天学习时间必须大于 0。"

    total_hours = days * hours_per_day
    return f"你一共有 {total_hours} 小时可以学习 DeepAgent。"


def recommend_learning_resource(topic: str) -> str:
    """Recommend a beginner-friendly DeepAgent learning resource by topic."""
    resources = {
        "tool": "建议复习第三章：让 Agent 会使用工具。",
        "工具": "建议复习第三章：让 Agent 会使用工具。",
        "prompt": "建议复习第一章里 Prompt 和 System Prompt 的内容。",
        "context": "建议先理解 Context：Agent 当前能看到的信息。",
        "上下文": "建议先理解 Context：Agent 当前能看到的信息。"
    }

    topic_lower = topic.lower()

    for keyword, resource in resources.items():
        if keyword in topic_lower:
            return resource

    return "暂时没有找到精确资料，建议先从课程总览开始复习。"


def save_study_plan(filename: str, content: str) -> str:
    """Save a DeepAgent study plan as a markdown file inside learning_notes."""
    safe_name = filename.strip().replace(" ", "_")

    if not safe_name:
        return "文件名不能为空。"

    if "/" in safe_name or "\\" in safe_name or safe_name.startswith("."):
        return "文件名不安全，请只使用普通文件名。"

    if not safe_name.endswith(".md"):
        safe_name = f"{safe_name}.md"

    NOTE_DIR.mkdir(exist_ok=True)
    path = NOTE_DIR / safe_name
    path.write_text(content, encoding="utf-8")

    return f"学习计划已保存到 {path}。"


agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[
        calculate_study_time,
        recommend_learning_resource,
        save_study_plan
    ],
    system_prompt=(
        "你是 MaxLance Assistant，一个耐心的 DeepAgent 学习助理。"
        "你必须用简单语言帮助小白理解 DeepAgent。"
        "当任务需要计算、推荐资料或保存学习计划时，优先使用合适的工具。"
        "保存文件时，只能使用普通文件名。"
    )
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": (
                "我想学习 DeepAgent 的工具调用。"
                "请帮我计算：我每天学 1 小时，学 4 天，一共有多少时间。"
                "再推荐一个相关学习资料。"
                "最后把一个简短学习计划保存为 chapter3_plan.md。"
            )
        }
    ]
})

print(result)
```

如果你第一次看到 `Path`，先不用深入研究。

它来自 Python 标准库 `pathlib`，可以先理解成“用代码表示一个文件或文件夹路径”。

这里的 `NOTE_DIR = Path("learning_notes")` 意思是：

> 后面保存学习计划时，统一放进 `learning_notes` 这个文件夹。

## 你应该看到什么结果

运行：

```bash
python maxlance_agent.py
```

如果一切正常，你会看到 Agent 返回一段回答。

项目目录下还会多出一个文件夹：

```text
learning_notes/
```

里面应该有一个文件：

```text
chapter3_plan.md
```

这个文件就是工具保存出来的结果。

## 这三个工具有什么区别

| 工具 | 做什么 | 有没有副作用 |
| --- | --- | --- |
| `calculate_study_time` | 计算学习总时长 | 没有 |
| `recommend_learning_resource` | 从本地资料库推荐资料 | 没有 |
| `save_study_plan` | 保存学习计划文件 | 有 |

副作用的意思是：

> 工具不只是返回一句话，还改变了外部环境。

保存文件就是副作用。

所以文件工具比计算工具更需要边界。

下一节会重点讲这个。

## docstring 要怎么写

好的 docstring 应该简单说明工具用途。

例如：

```python
"""Save a DeepAgent study plan as a markdown file inside learning_notes."""
```

这句话告诉 Agent：

- 这个工具是保存学习计划的。
- 保存格式是 Markdown。
- 保存位置限制在 `learning_notes` 里。

不好的 docstring 是：

```python
"""Do something."""
```

这太模糊。

Agent 看不出来什么时候该用。

## 常见错误

### 错误 1：参数名太随意

比如：

```python
def save_study_plan(x: str, y: str) -> str:
```

人可能知道 `x` 和 `y` 是什么。

Agent 不一定知道。

更好的写法是：

```python
def save_study_plan(filename: str, content: str) -> str:
```

### 错误 2：返回值不给人看

不要只返回：

```text
ok
```

更好的返回是：

```text
学习计划已保存到 learning_notes/chapter3_plan.md。
```

这样 Agent 可以把结果清楚地告诉用户。

### 错误 3：资料推荐工具一开始就接真实互联网

真实搜索会涉及网络、API Key、费用、限流和结果质量。

新手阶段可以先用本地资料库模拟搜索。

等工具调用流程清楚了，再替换成真实搜索工具。

## 自测

确认你能回答：

1. 参数、返回值、docstring 分别帮助 Agent 理解什么？
2. 为什么文件工具比计算工具更需要边界？
3. 资料推荐工具为什么不能假装自己查过真实互联网？

## 小结

这一节你让 MaxLance Assistant 有了三个工具：

- 计算工具。
- 推荐资料工具。
- 保存学习计划工具。

你也看到了工具设计的三个关键点：

- 参数要清楚。
- 返回值要能被 Agent 继续使用。
- docstring 要告诉 Agent 什么时候用工具。

下一节，我们会讲工具失败和权限边界。
