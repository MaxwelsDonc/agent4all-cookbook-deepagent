# 让 Agent 调用工具

## 这一节你会学到什么

你会把上一节写好的 Python 函数交给 MaxLance Assistant。

然后让 Agent 在回答问题前调用这个工具。

这一节的关键不是工具本身有多复杂。

关键是看懂：

> Python 函数如何变成 Agent 可以使用的工具。

## 一句话讲清楚

把函数放进 `tools=[...]`，Agent 就有机会在需要时调用它。

Deep Agents 支持把普通 Python 函数、LangChain tool 或 MCP 工具传给 `create_deep_agent()`。

## 写代码前先确认

请确认你已经完成：

- 第二章的环境准备。
- `.env` 里有 API Key。
- 虚拟环境已经激活。
- `deepagents`、`python-dotenv` 和模型 provider 包已经安装。
- `maxlance_agent.py` 里的 `calculate_study_time()` 可以单独运行。

provider 包可以先理解成：

> 让 Deep Agents 连接某个模型服务的适配包。

如果你用 OpenAI，第二章里安装过的 `langchain-openai` 就是对应的 provider 包。

如果函数自己都跑不通，先不要急着接 Agent。

下面示例沿用第二章的模型写法：

```python
model="openai:gpt-4o-mini"
```

如果你使用的是其他模型服务，或者官方文档已经推荐了更新模型，可以替换成你可用的模型。

关键不是模型名，而是它必须支持 tool calling / function calling。

## 跟着做：更新文件

把 `maxlance_agent.py` 改成下面这样：

```python
from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()


def calculate_study_time(days: int, hours_per_day: float) -> str:
    """Calculate total DeepAgent study time for a beginner."""
    if days <= 0:
        return "学习天数必须大于 0。"

    if hours_per_day <= 0:
        return "每天学习时间必须大于 0。"

    total_hours = days * hours_per_day
    return f"你一共有 {total_hours} 小时可以学习 DeepAgent。"


agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[calculate_study_time],
    system_prompt=(
        "你是 MaxLance Assistant，一个耐心的 DeepAgent 学习助理。"
        "你必须用简单语言帮助小白理解 DeepAgent。"
        "当用户的问题需要计算学习时间时，优先使用工具。"
    )
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": (
                "我每天可以学习 1.5 小时，准备连续学习 5 天。"
                "请使用工具帮我计算总学习时间，并给我一句建议。"
            )
        }
    ]
})

print(result)
```

## 这段代码在做什么

重点看这里：

```python
tools=[calculate_study_time]
```

这行代码把 Python 函数交给了 Agent。

从现在开始，MaxLance Assistant 可以在需要时调用 `calculate_study_time()`。

再看 system prompt 里的这句：

```text
当用户的问题需要计算学习时间时，优先使用工具。
```

这是在提醒 Agent：

> 遇到学习时间计算，不要只靠自己猜，先用工具。

## 跟着做：运行代码

在终端运行：

```bash
python maxlance_agent.py
```

## 你应该看到什么结果

如果一切正常，你会看到一大段输出。

里面可能包含：

- 用户消息。
- Agent 的工具调用信息。
- 工具返回的结果。
- Agent 最终回答。

不同模型和 provider 的输出格式可能不完全一样。

不要纠结每个字段。

先确认两件事：

1. 程序没有报错。
2. 最终回答里出现了和 `7.5 小时` 相关的内容。

如果输出太长，你可以先在终端里向上找这几个关键词：

- `calculate_study_time`
- `7.5`
- `tool`

能看到这些信息，就说明 Agent 大概率已经使用了工具。

## 工具返回值如何进入上下文

可以把这次运行想象成这样：

```text
用户：我每天 1.5 小时，学 5 天，总共多久？
Agent：这个问题需要计算，我调用 calculate_study_time。
工具：你一共有 7.5 小时可以学习 DeepAgent。
Agent：根据工具结果，给用户一个学习建议。
```

工具的返回值不是直接丢给用户就结束。

它会回到 Agent 的上下文里。

Agent 可以继续基于这个结果组织更自然的回答。

这就是 Tool Calling 和普通函数调用最大的区别。

## Agent 什么时候会调用工具

Agent 是否调用工具，通常受几件事影响：

- 用户任务是否真的需要工具。
- 工具名字是否清楚。
- docstring 是否说明了工具用途。
- 参数类型是否容易理解。
- system prompt 是否提醒了工具使用规则。
- 模型本身是否支持 tool calling。

所以工具不是“放进去就一定会被用”。

你需要把工具写清楚，也需要把 Agent 的角色和规则写清楚。

## 常见错误

### 错误 1：工具函数没有放进 `tools`

如果你只定义了函数，但没有写：

```python
tools=[calculate_study_time]
```

Agent 就不知道这个工具存在。

### 错误 2：模型不支持工具调用

如果报错里出现 tool calling、tool use、function calling 相关信息，可能是模型不支持工具调用。

新手阶段先换成明确支持工具调用的模型。

### 错误 3：Agent 没有调用工具

如果 Agent 直接回答了，但没有调用工具，先检查：

- 用户问题是不是需要工具。
- system prompt 有没有说明什么时候用工具。
- docstring 是否太模糊。

第一次练习时，可以像示例一样明确说“请使用工具”。

等你理解流程后，再让 Agent 自己判断。

## 小结

这一节你完成了第三章最关键的一步：

> 把 Python 函数交给 Agent，让 Agent 调用工具。

下一节，我们会仔细看参数、返回值和 docstring。
