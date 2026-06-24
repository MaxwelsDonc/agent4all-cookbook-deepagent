# Streaming：边执行边看过程

## 这一节你会学到什么

你会理解 Streaming 是什么。

你还会看到如何让 Agent 执行时不断输出过程，而不是等到最后才给一个结果。

## 一句话讲清楚

Streaming 就是让 Agent 边做边把进度展示出来。

用“电脑里的人”来理解：

> 不是助理关上门干半小时，最后突然丢给你一份结果；而是他边做边告诉你：我在查资料、我在写计划、我在保存文件。

## 为什么需要它

复杂任务可能需要很多步骤。

如果没有 streaming，你只会看到两种状态：

- 正在运行
- 运行结束

中间发生了什么，你不知道。

这会带来几个问题：

- 不知道 Agent 卡在哪里。
- 不知道它有没有调用工具。
- 不知道它是不是跑偏了。
- 出错后很难复盘。

Streaming 能让你更早发现问题。

## 用一个简单例子理解

你请人做一份学习计划。

如果他一直沉默，你会不放心。

如果他边做边说：

- 我先拆任务。
- 我正在写第 1 天内容。
- 我准备保存计划。
- 我开始生成复盘问题。

你就更容易判断他有没有走在正确方向上。

## 回到 Agent

Deep Agents 支持事件流。

官方文档里会看到：

```python
agent.stream_events(..., version="v3")
```

你可以先这样理解：

> `stream_events` 会把 Agent 执行中的消息、工具调用、子 Agent 等过程逐步吐出来。

这一节先做最简单的观察：打印 Agent 逐步输出的消息。

## 代码里长什么样

创建文件：

```text
streaming_agent.py
```

写入：

```python
from dotenv import load_dotenv
from deepagents import create_deep_agent

load_dotenv()


def make_review_question(topic: str) -> str:
    """Create one beginner-friendly review question for a DeepAgent topic."""
    return f"请用自己的话解释：{topic} 解决了什么问题？"


agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    tools=[make_review_question],
    system_prompt=(
        "你是一个耐心的 DeepAgent 学习教练。"
        "回答复杂任务时要先拆步骤，再生成结果。"
    ),
)

stream = agent.stream_events(
    {
        "messages": [
            {
                "role": "user",
                "content": (
                    "请帮我复习 permission、human-in-the-loop 和 sandbox，"
                    "每个主题给一个复盘问题。"
                ),
            }
        ]
    },
    version="v3",
)

for message in stream.messages:
    if message.text:
        print("[message]", message.text)
```

这段代码只打印消息流。

如果你以后想看工具调用或 subagent，可以继续使用 `stream.tool_calls`、`stream.subagents` 等更细的事件流。

Streaming 本来就是为了让你看到更多过程。

## 跟着做

运行：

```bash
python streaming_agent.py
```

观察终端里不断出现的：

```text
[message] ...
```

不用一开始看懂所有事件。

先关注：

- 有没有消息输出。
- 最后有没有完整回答。

## 你应该看到什么结果

你会看到 Agent 的消息逐步输出。

如果进一步打印工具调用或 subagent 事件，输出还可能包含：

- Agent 开始执行。
- 模型生成内容。
- 工具调用开始或结束。
- 最终输出。

这比只看最后结果更适合调试复杂任务。

## 常见错误

### 错误 1：一开始就想看懂所有事件

不用。

第一次只看：

- 有没有输出
- 最终结果是否正确

### 错误 2：事件太多，反而看乱了

可以先只打印消息流。

等你知道哪些事件重要，再打印工具调用或 subagent。

### 错误 3：streaming 不是最终答案

Streaming 展示的是过程。

最终答案通常还是要从最后的消息或输出里取。

### 错误 4：把 streaming 当成日志系统

Streaming 帮你看实时过程。

如果你要长期保存、搜索、对比多次运行，就更适合接入 LangSmith。

下一节会讲这个。

## 自测

确认你能回答：

1. Streaming 对长任务有什么帮助？
2. 为什么只看最终答案不利于调试 Agent？
3. 观察 MaxLance Assistant 执行过程时，你最应该关注哪些信号？

## 小结

这一节你只需要记住：

> Streaming：让你边运行边观察 Agent 在做什么。

复杂任务不要只看最终结果。

越早看到过程，越容易发现 Agent 有没有跑偏。
