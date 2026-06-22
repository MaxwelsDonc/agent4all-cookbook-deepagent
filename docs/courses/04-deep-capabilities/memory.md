# Memory：让 Agent 记住长期信息

## 这一节你会学到什么

你会理解 Memory 是什么，以及它和普通聊天记录、文件保存有什么区别。

这一节先讲清楚概念和基本代码形态，不急着进入生产级存储配置。

## 一句话讲清楚

Memory 是 Agent 跨对话记住的长期信息。

用“电脑里的人”来理解：

> 聊天记录像刚刚说过的话，文件像桌上的资料，memory 像他长期记在工作手册里的偏好和经验。

## 为什么需要它

如果你每次都要重新告诉 Agent：

```text
我是新手。
我每天只有 30 分钟。
我喜欢先看例子再看定义。
我不喜欢一上来就看复杂源码。
```

这会很麻烦。

更自然的做法是让 Agent 记住这些长期偏好。

下次你再让它制定计划时，它就应该自动考虑：

- 你是新手。
- 每天学习时间有限。
- 解释要先例子后定义。
- 不要过早进入复杂源码。

这就是 memory 想解决的问题。

## 用一个简单例子理解

假设你有一位长期家教。

第一次见面时，你告诉他：

```text
我数学基础弱。
我喜欢用生活例子理解概念。
我每天只能学 40 分钟。
```

如果第二次见面他完全忘了，你会觉得他只是临时聊天。

如果他还记得，并且安排课程时自动照顾这些偏好，他就更像真正的学习助手。

Agent 的 memory 也是这个意思。

## 回到 Agent

先区分三个容易混淆的东西：

| 名字 | 保存多久 | 适合放什么 |
| --- | --- | --- |
| Messages | 当前对话里 | 你和 Agent 刚刚说过的话 |
| Filesystem | 当前任务或项目中 | 计划、笔记、草稿、中间结果 |
| Memory | 跨对话长期保留 | 用户偏好、项目背景、长期经验 |

Deep Agents 的 memory 可以和文件系统结合。

官方文档里会看到类似：

```python
agent = create_deep_agent(
    model="...",
    backend=backend,
    memory=["/memories/AGENTS.md"],
)
```

你可以先这样理解：

> `memory` 参数告诉 Agent 哪些文件应该作为长期记忆来使用。

这里还需要一个 backend。

backend 可以先理解成：

> Agent 到哪里读写这些文件。

更复杂的后端、用户隔离、读写权限，后面再学。

## 代码里长什么样

先创建一个记忆文件。

在项目根目录创建：

```text
memories/AGENTS.md
```

写入：

```md
# 学习偏好

- 用户是 DeepAgent 初学者。
- 用户每天只有 30 分钟学习时间。
- 用户喜欢先看生活例子，再看代码。
- 回答要避免一次性塞太多术语。
```

然后创建一个新文件：

```text
memory_agent.py
```

写入下面代码：

```python
from pathlib import Path

from dotenv import load_dotenv
from deepagents import create_deep_agent
from deepagents.backends import FilesystemBackend

load_dotenv()

PROJECT_ROOT = Path.cwd().resolve()
backend = FilesystemBackend(root_dir=str(PROJECT_ROOT))

agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    backend=backend,
    memory=["/memories/AGENTS.md"],
    system_prompt=(
        "你是一个耐心的 DeepAgent 学习教练。"
        "回答时要参考 memory 中记录的学习偏好。"
    ),
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "请给我安排明天的 DeepAgent 学习任务。",
        }
    ]
})

print(result["messages"][-1].content)
```

注意这里的路径：

```python
backend = FilesystemBackend(root_dir=str(PROJECT_ROOT))
memory=["/memories/AGENTS.md"]
```

`FilesystemBackend` 表示让 Agent 从当前项目目录读写文件。

`/memories/AGENTS.md` 表示项目目录下的 `memories/AGENTS.md`。

刚入门时，你不用深入理解所有 backend 类型。先知道：这段代码让 Agent 有一份长期说明文件可以参考。

## 跟着做

运行：

```bash
python memory_agent.py
```

观察 Agent 的回答。

它理想情况下应该体现这些偏好：

- 任务不应该太长。
- 应该适合初学者。
- 应该尽量先用例子解释。
- 每天 30 分钟这个限制应该被考虑。

## 你应该看到什么结果

你可能会看到类似：

```text
明天用 30 分钟完成一个小任务：
先用生活例子理解 planning，再看一段最小代码，最后用 3 个问题复盘。
```

具体文字不一定一样。

关键是看它有没有使用记忆里的偏好。

## 常见错误

### 错误 1：把 memory 当成当前聊天记录

Memory 不是“刚刚说过的话”。

它更适合放长期稳定的信息，比如偏好、背景、项目规则。

### 错误 2：什么都想让 Agent 永久记住

不要把所有临时信息都放进 memory。

适合放进 memory 的内容通常有这些特点：

- 以后还会反复用。
- 比较稳定。
- 能帮助 Agent 做出更符合用户需求的决定。

### 错误 3：把敏感信息放进 memory

不要把 API Key、密码、身份证号、银行卡号这类敏感信息放进 memory。

Memory 会被 Agent 读取和使用，越敏感的信息越要谨慎。

### 错误 4：代码运行后没有明显体现偏好

可以检查三点：

- `memories/AGENTS.md` 是否真的创建了。
- `FilesystemBackend(root_dir=str(PROJECT_ROOT))` 是否保留了。
- `memory=["/memories/AGENTS.md"]` 路径是否写对。
- `system_prompt` 是否明确要求参考 memory。

也可以把用户问题问得更具体：

```text
请根据我的学习偏好安排明天的任务。
```

## 小结

这一节你只需要记住：

```text
Memory：跨对话长期保留的偏好、背景和经验。
```

Messages 适合当前对话。

Filesystem 适合保存计划和中间结果。

Memory 适合保存长期有用的信息。

下一节，我们会讲任务太大时，为什么需要 subagent 分工。
