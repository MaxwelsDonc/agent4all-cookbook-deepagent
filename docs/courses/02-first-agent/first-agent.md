# 跑通第一个 Agent

## 这一节你会学到什么

你会写一个最小可运行的 Agent。

它会扮演一个耐心的新手教练，回答你关于 DeepAgent 学习的问题。

这一节的目标不是写出很强的 Agent。

目标只有一个：

> 第一次跑起来。

## 一句话讲清楚

我们会用 `create_deep_agent()` 创建 Agent，再用 `agent.invoke()` 给它发消息。

## 写代码前先确认

请确认你已经完成：

- Python 可以运行。
- 虚拟环境已经激活。
- `.env` 里有 API Key。
- 已经安装 `deepagents`、`python-dotenv` 和模型 provider 包。

如果前面某一步没完成，先不要跳过。

## 先说明模型选择

下面示例使用 OpenAI 写法：

```python
model="openai:gpt-4o-mini"
```

如果你使用的是其他模型服务，需要把这里换成你可用的模型，并安装对应 provider 包。

第一次学习时，不要把精力放在“哪个模型最好”上。

先选一个你能调用、支持工具调用的模型，把流程跑通。

## 跟着做：创建文件

在项目根目录创建一个文件：

```text
first_agent.py
```

然后写入下面代码：

```python
from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()


def make_study_plan(days: int) -> str:
    """Create a simple DeepAgent study plan for beginners."""
    return f"建议用 {days} 天学习：先理解 Agent，再跑通代码，最后尝试修改工具。"


agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[make_study_plan],
    system_prompt="你是一个耐心的新手教练，必须用简单语言解释 DeepAgent。"
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "我完全不懂 DeepAgent，请帮我制定一个 3 天入门计划。"
        }
    ]
})

print(result)
```

## 这段代码在做什么

先不用完全看懂。

你只要先认出几个部分：

| 代码 | 作用 |
| --- | --- |
| `load_dotenv()` | 读取 `.env` 里的 API Key |
| `make_study_plan` | 给 Agent 使用的一个简单工具 |
| `create_deep_agent(...)` | 创建 Agent |
| `model="openai:gpt-4o-mini"` | 指定使用的模型 |
| `tools=[make_study_plan]` | 把 Python 函数交给 Agent 当工具 |
| `system_prompt=...` | 设置 Agent 的身份和工作规则 |
| `agent.invoke(...)` | 给 Agent 发消息并运行 |

## 跟着做：运行代码

在终端运行：

```bash
python first_agent.py
```

## 你应该看到什么结果

如果一切正常，你会看到一大段输出。

里面通常会包含：

- 你发给 Agent 的用户消息。
- Agent 的回答。
- 可能还有工具调用相关信息。

第一次看到输出很长是正常的。

下一节会教你怎么看。

## 常见错误

### 错误 1：`ModuleNotFoundError: No module named 'deepagents'`

说明依赖没有安装到当前 Python 环境。

先确认虚拟环境已激活，然后重新运行：

```bash
pip install deepagents python-dotenv langchain-openai
```

### 错误 2：API Key 相关错误

如果报错里出现 `API key`、`authentication`、`unauthorized` 之类的词，通常是 `.env` 没配置好。

检查 `.env` 里是否有：

```text
OPENAI_API_KEY=你的 key
```

### 错误 3：模型名不可用

如果你使用的账号或服务不支持示例里的模型，需要换成你可用的模型。

先不要纠结模型强弱。

能跑通最重要。

### 错误 4：模型不支持工具调用

Deep Agents 需要模型支持工具调用。

如果报错和 tool calling、tool use、function calling 有关，可能是模型不支持，或者 provider 包没有装对。

新手阶段先换成官方文档或服务商明确支持工具调用的模型。

### 错误 5：输出不是教程里的样子

Agent 的回答可能每次都不完全一样。

只要它能正常返回内容，并且没有报错，就说明已经跑通。

## 自测

确认你能回答：

1. `create_deep_agent()` 在这段代码里负责什么？
2. `system_prompt` 会怎样影响 MaxLance Assistant？
3. 运行成功时，你至少应该在输出里确认哪两件事？

## 小结

这一节你完成了最重要的一步：

> 第一个 Agent 跑起来了。

下一节，我们会看懂这次输出到底包含什么。
