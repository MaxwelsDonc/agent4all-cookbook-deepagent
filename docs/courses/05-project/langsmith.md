# LangSmith：记录、调试和复盘

## 这一节你会学到什么

你会理解 LangSmith 是什么。

你还会知道为什么当 Agent 变复杂后，需要一个专门的调试和复盘工具。

## 一句话讲清楚

LangSmith 是用来记录、观察、调试和评估 Agent 运行过程的平台。

用“电脑里的人”来理解：

> Streaming 像你站在旁边看他工作，LangSmith 像把他的工作过程录下来，之后可以回放、检查和复盘。

## 为什么需要它

当 Agent 很简单时，你可以直接看终端输出。

但当 Agent 开始做复杂任务时，终端很快不够用。

你可能想知道：

- 用户到底问了什么。
- Agent 调用了哪些工具。
- 哪个工具返回了什么。
- 哪一步开始跑偏。
- 某次输出为什么比上次差。
- token 和延迟大概在哪里消耗。

这些问题靠 `print()` 很难长期管理。

LangSmith 就是为这类调试和复盘准备的。

## 用一个简单例子理解

你练习做菜。

Streaming 像在做菜时有人实时告诉你：

- 现在切菜。
- 现在下锅。
- 现在调味。

LangSmith 更像录像和记录表：

- 这次用了什么材料。
- 每一步花了多久。
- 哪里出错。
- 下次怎么改。

Agent 调试也是一样。

## 回到 Agent

LangSmith 不是第五章主线的必选项。

你可以先不注册、不接入。

但你要知道：

> 当 Agent 任务变长、工具变多、结果不稳定时，LangSmith 会非常有用。

本课程只做可选配置说明。

## 代码里长什么样

如果你要接入 LangSmith，通常先在 `.env` 里加入：

```text
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=这里换成你的 LangSmith API Key
LANGSMITH_PROJECT=agent4all-learning
```

不要把真实 API Key 提交到 GitHub。

这个项目已经忽略了 `.env`。

然后你的普通 Agent 代码可以保持类似：

```python
from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()

agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    system_prompt="你是一个耐心的 DeepAgent 学习助手。",
)

result = agent.invoke({
    "messages": [
        {"role": "user", "content": "帮我复习第五章的安全概念。"}
    ]
})

print(result["messages"][-1].content)
```

如果环境变量配置正确，运行记录就可以进入 LangSmith 项目里。

具体开通、项目查看和 tracing 细节，以 LangSmith 官方文档为准。

## 跟着做

这一节是可选练习。

如果你暂时不想注册 LangSmith，可以跳过。

如果你想试：

1. 打开 LangSmith。
2. 创建或复制 API Key。
3. 把环境变量写入 `.env`。
4. 重新运行一个 Agent 文件。
5. 在 LangSmith 项目里查看 trace。

## 你应该看到什么结果

如果接入成功，你应该能在 LangSmith 里看到一次运行记录。

里面通常会包含：

- 输入消息。
- 模型调用。
- 工具调用。
- 输出结果。
- 时间和 token 等信息。

这些信息能帮助你回答：

- Agent 到底做了什么？
- 哪一步出了问题？
- 下次应该改 prompt、改工具，还是改权限？

## 常见错误

### 错误 1：忘记加载 `.env`

代码里要有：

```python
load_dotenv()
```

否则 Python 程序可能读不到 LangSmith 环境变量。

### 错误 2：把 LangSmith API Key 提交到 GitHub

不要提交。

API Key 和模型 API Key 一样，都应该只放在本地 `.env`。

### 错误 3：以为 LangSmith 会自动修好 Agent

不会。

LangSmith 是观察和调试工具。

它帮你看清问题，但具体怎么改 Agent，还是要你判断。

### 错误 4：入门阶段被工具配置卡住

如果你现在只是学习主线，可以先跳过 LangSmith。

本章最终项目不依赖 LangSmith。

## 自测

确认你能回答：

1. LangSmith 主要帮助你观察和复盘什么？
2. 什么情况下你可以暂时不接 LangSmith？
3. 如果 Agent 没有按预期调用工具，调试记录能帮你看哪些信息？

## 小结

这一节你只需要记住：

> LangSmith：用来记录、调试和复盘 Agent 执行过程。

Streaming 适合实时看。

LangSmith 适合事后查。

下一节，我们会把前面所有内容组合成最终项目。
