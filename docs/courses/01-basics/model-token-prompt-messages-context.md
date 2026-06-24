# Model、Token、Prompt、Messages 和 Context

## 这一节你会学到什么

你会认识 5 个 Agent 入门时一定会反复遇到的词：

- Model
- Token
- Prompt
- Messages
- Context

这些词一开始看起来很抽象，但它们其实都在回答一个问题：

> 这个“电脑里的人”靠什么思考、看到了什么、听到了什么、又能记住多少？

## 一句话讲清楚

Model 是脑子，token 是读写时消耗的计量单位，prompt 是你说的话，messages 是对话记录，context 是 Agent 当前能参考到的信息。

Token 不等于一个汉字，也不等于一个英文单词。入门时你不用精确计算它，只要先把它理解成模型读写文字时的“计量单位”。

这一节的最低目标只有一个：

> 以后看到 Deep Agents 代码时，你能认出哪个是脑子、哪个是指令、哪个是聊天记录、哪个是当前资料。

先不要急着背定义。你可以先用这张表记住它们：

| 概念 | 用“电脑里的人”理解 | 在 Agent 里是什么意思 |
| --- | --- | --- |
| Model | 脑子 | 负责理解、推理和生成内容的大模型 |
| Token | 精力/计量单位 | 模型阅读和输出内容时消耗的基本单位 |
| Prompt | 你当下说的话 | 你给模型或 Agent 的指令 |
| Messages | 聊天记录 | 你、模型、工具之间一轮轮交流形成的记录 |
| Context | 当前桌面上摊开的资料 | Agent 这一步能看到、能参考的信息总和 |

## 为什么需要学这些

如果你不理解这些词，后面看代码时会很容易卡住。

比如你会看到：

```python
agent = create_deep_agent(
    model="...",
    tools=[],
    system_prompt="你是一个耐心的新手教练。"
)

result = agent.invoke({
    "messages": [
        {"role": "user", "content": "帮我制定一个 7 天学习计划"}
    ]
})
```

如果你知道这些词的意思，就能大概看懂：

- `model` 决定 Agent 用哪个脑子。
- `system_prompt` 决定 Agent 的身份和规则。
- `messages` 是你和 Agent 的对话记录。
- `"content"` 里的文字会变成模型要读的内容。
- 这些输入和输出都会消耗 token。

这一节的目标不是让你会调 API，而是让你以后看到类似代码时不害怕。

## 用一个简单例子理解

假设你请一个人帮你写学习计划。

你说：

> 你是一个耐心的新手教练。请帮我制定一个 7 天 DeepAgent 学习计划。我每天只有 1 小时。

这里面可以拆出几个东西：

- “这个人有多聪明、擅长什么”，对应 model。
- “你说给他听的这些字”，会被切成 token。
- “请帮我制定计划”，是 prompt。
- “你们从第一句话到现在的聊天”，是 messages。
- “他当前能看到的所有要求、历史对话、资料和工具结果”，是 context。

回到这一章的贯穿例子：

> 你正在搭一个帮助小白学习 DeepAgent 的学习助手。

这个学习助手要做得好，不只是 prompt 要写好。它还要选对 model，控制 token，不断更新 messages，并且让关键资料进入 context。

比如它要根据你的反馈调整计划，就必须在 context 里看见你的反馈；如果它看不见，就只能凭空猜。

## 回到 Agent

Agent 每一步做决定时，不是凭空想的。

它通常会看这些东西：

- system prompt
- 当前 user message
- 之前的 assistant message
- 工具返回结果
- 文件或记忆里取出的信息

这些东西合在一起，就是它当前的 context。

然后 model 根据这个 context 生成下一步：

- 直接回答。
- 继续追问。
- 调用工具。
- 写入文件。
- 交给子 Agent。

所以你可以把一次 Agent 执行想成这样：

<div class="a4a-flow">
  <div><b>三类信息汇入 Context</b><span>System Prompt（身份和规则）· Messages（对话记录）· Tool Results（工具结果）</span></div>
  <div><b>Context：当前可参考信息</b></div>
  <div><b>Model 读取 Context 推理</b></div>
  <div><b>生成下一步动作或回答</b></div>
  <div class="is-end"><b>结果写回 Messages</b><span>↻ 进入下一轮，Context 随之更新</span></div>
</div>

## 代码里长什么样

先看一个不需要真正运行的例子：

```python
from deepagents import create_deep_agent

agent = create_deep_agent(
    model="...",
    tools=[],
    system_prompt="你是一个耐心的新手教练，必须用简单语言解释概念。"
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "我完全不懂 Agent，请用一个生活例子解释。"
        }
    ]
})
```

这段代码里：

| 代码 | 对应概念 | 说明 |
| --- | --- | --- |
| `model="..."` | Model | 选择用哪个大模型 |
| `system_prompt="..."` | System Prompt | 给 Agent 设定身份和规则 |
| `"messages"` | Messages | 输入给 Agent 的对话记录 |
| `"role": "user"` | Message role | 表示这句话来自用户 |
| `"content": "..."` | Prompt 内容 | 用户这次真正说的话 |
| 整个输入 | Context 的一部分 | Agent 当前能看到的信息 |

## 跟着做

现在不用运行代码，只做一个阅读练习。

看下面这段话：

> 你是一个只用小学水平语言讲解 AI 的老师。我每天只有 30 分钟。请帮我安排 3 天入门 Agent 的学习计划。

试着回答：

1. 哪一句更像 system prompt？
2. 哪一句是用户的限制条件？
3. 哪一句是用户真正要完成的任务？
4. 如果这些内容太长，会影响什么？

参考答案：

1. “你是一个只用小学水平语言讲解 AI 的老师。”
2. “我每天只有 30 分钟。”
3. “请帮我安排 3 天入门 Agent 的学习计划。”
4. 会占用更多 token，也会挤占 Agent 可以放入 context 的空间。

## 你应该看到什么结果

学完这一节，你应该能做到三件事：

- 看到 `model`，知道它不是 Agent 本身，而是 Agent 的脑子。
- 看到 `messages`，知道它是一组对话记录，不只是普通字符串。
- 听到 `context`，知道它指的是 Agent 当前能参考到的信息，而不是“全部历史和全部知识”。

如果你能做到这三点，这一节就过关了。

## 常见错误

### 错误 1：把 prompt 当成全部

很多新手以为 Agent 好不好，只取决于 prompt 写得好不好。

Prompt 很重要，但 Agent 还受 model、tools、context、memory、permission 等影响。

### 错误 2：以为 messages 会无限保存

模型一次能看的内容有限。

历史对话太长时，系统需要裁剪、总结或转移到文件/记忆里。否则 Agent 可能看不到很早以前的信息。

### 错误 3：以为 context 等于模型知道的一切

不是。

Context 是这一次执行时真正放到模型面前的信息。模型训练时学过的知识、你电脑里的文件、网上最新资料，都不一定在当前 context 里。

### 错误 4：完全忽略 token

Token 会影响三件事：

- 成本。
- 速度。
- 一次能放进 context 的内容多少。

入门时不用精确计算 token，但要知道它不是无限的。

## 自测

试着回答这几个问题：

1. Model、Prompt、Messages、Context 分别对应 Agent 里的什么？
2. 为什么 context 不是模型知道的一切？
3. 如果 MaxLance Assistant 忘了前面的话，可能和哪个概念有关？

## 小结

先记住这句话：

> Agent 每一步能不能做对，很大程度取决于它用了哪个脑子、你怎么说、它当前看到了什么。

对应到概念就是：

- **Model**：脑子
- **Token**：读写消耗的计量单位
- **Prompt**：你说的话
- **Messages**：对话记录
- **Context**：当前可参考信息

下一节，我们会看 DeepAgent 到底 deep 在哪里。
