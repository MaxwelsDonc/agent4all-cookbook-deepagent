# API Key 与环境变量

## 这一节你会学到什么

你会知道 API Key 是什么，为什么它很重要，以及怎么把它放到 `.env` 文件里。

这一节很重要。

不是因为它难，而是因为很多新手第一次踩坑都踩在这里。

## 一句话讲清楚

API Key 可以先理解成你调用模型服务时使用的“钥匙”。

环境变量可以先理解成程序运行时能读取到的“隐藏配置”。

## 为什么需要 API Key

Deep Agents 本身帮你组织 Agent 的能力，但真正负责思考和生成文字的是模型。

如果你使用 OpenAI、Anthropic 或其他模型服务，程序需要知道：

> 你是谁，你有没有权限调用这个模型。

API Key 就是这个身份凭证。

## 为什么不能提交到 GitHub

API Key 很像账号密码。

如果你把它提交到公开仓库，别人可能拿它调用模型，费用也可能算到你头上。

所以请记住：

> API Key 只能放在本地，不能写进公开代码。

## `.env` 是什么

`.env` 是一个本地配置文件。

它通常用来保存这类信息：

```text
OPENAI_API_KEY=你的 key
ANTHROPIC_API_KEY=你的 key
```

程序运行时可以读取这些配置，但你不应该把 `.env` 提交到 GitHub。

这个项目已经在 `.gitignore` 里忽略了 `.env`。

## 跟着做：创建 `.env`

在项目根目录新建一个 `.env` 文件。

如果你使用 OpenAI 模型，可以写：

```text
OPENAI_API_KEY=这里换成你的 API Key
```

如果你使用 Anthropic 模型，可以写：

```text
ANTHROPIC_API_KEY=这里换成你的 API Key
```

只保留你实际使用的那一行就可以。

## 跟着做：安装读取 `.env` 的工具

后面代码会用 `python-dotenv` 读取 `.env` 文件。

先不用急着安装，下一节会统一安装依赖。

现在只要知道：

- **`.env`** 负责保存本地配置
- **`python-dotenv`** 负责把配置读进 Python 程序

## 你应该看到什么结果

这一节做完后，项目根目录应该多出一个 `.env` 文件。

文件里应该有一行类似：

```text
OPENAI_API_KEY=sk-...
```

这里不要把真实 key 发给别人，也不要截图公开。

## 常见错误

### 错误 1：把 API Key 写进 Python 文件

不要这样写：

```python
api_key = "sk-..."
```

这样很容易被提交到 GitHub。

更好的做法是放进 `.env`。

### 错误 2：`.env` 文件名写错

文件名应该是：

```text
.env
```

不要写成：

```text
env
env.txt
.env.txt
```

### 错误 3：等号两边加了奇怪字符

推荐写法：

```text
OPENAI_API_KEY=你的 key
```

不要写成：

```text
OPENAI_API_KEY = 你的 key
```

有些读取工具可以处理空格，但新手阶段先保持最简单。

## 自测

确认你能回答：

1. API Key 为什么不能直接写进代码或提交到 GitHub？
2. `.env` 文件解决了什么问题？
3. 如果程序提示 authentication 或 API key 错误，你会先检查哪两个地方？

## 小结

这一节你只需要记住：

- **API Key**：调用模型服务的钥匙
- **`.env`**：只放在本地的配置文件
- **`.gitignore`**：告诉 Git 不要提交敏感文件

下一节，我们会安装 Deep Agents 和运行代码需要的依赖。
