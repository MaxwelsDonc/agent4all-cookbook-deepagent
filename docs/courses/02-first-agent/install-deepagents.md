# 安装 Deep Agents

## 这一节你会学到什么

你会安装运行第一个 Agent 需要的 Python 包。

这里会出现 `pip`。

它可以先理解成 Python 的“应用商店命令”。

## 一句话讲清楚

`pip` 用来安装 Python 包，`deepagents` 是我们要使用的 Deep Agents 包。

## 为什么需要安装依赖

Python 自带了一些基础能力，但不会自带所有 Agent 相关工具。

比如：

- `deepagents`：用来创建 Deep Agent。
- `python-dotenv`：用来读取 `.env` 文件。
- 模型 provider 包：用来连接你选择的模型服务。

这些都需要安装。

## 跟着做：确认虚拟环境已经激活

先看终端前面有没有：

```text
(.venv)
```

如果没有，先回到上一节激活虚拟环境。

macOS 或 Linux：

```bash
source .venv/bin/activate
```

Windows PowerShell：

```powershell
.\.venv\Scripts\Activate.ps1
```

## 跟着做：升级 pip

运行：

```bash
python -m pip install --upgrade pip
```

这一步不是必须，但可以减少一些安装问题。

## 跟着做：安装依赖

如果你使用 OpenAI 模型，运行：

```bash
pip install deepagents python-dotenv langchain-openai
```

如果你使用 Anthropic 模型，运行：

```bash
pip install deepagents python-dotenv langchain-anthropic
```

本教程后面的示例会优先使用 OpenAI 写法。

如果你用别的模型服务，后面可以按对应文档替换。

## 你应该看到什么结果

终端会输出很多安装信息。

最后如果没有出现红色错误，并且回到命令输入状态，通常就说明安装成功。

你也可以运行：

```bash
python -c "import deepagents; print('deepagents ok')"
```

如果看到：

```text
deepagents ok
```

说明 Python 已经能找到 `deepagents`。

## 常见错误

### 错误 1：忘记激活虚拟环境

如果忘了激活，包可能会装到别的地方。

看到安装命令前，先确认终端前面有 `(.venv)`。

### 错误 2：`pip: command not found`

可以改用：

```bash
python -m pip install deepagents python-dotenv langchain-openai
```

### 错误 3：网络下载失败

这通常不是代码写错，而是网络连接问题。

可以稍后重试，或者换网络。

### 错误 4：装了包但 Python 还是说找不到

大概率是包装到了另一个 Python 环境里。

先确认：

```bash
which python
```

路径里应该包含 `.venv`。

## 自测

确认你能回答：

1. `deepagents`、`python-dotenv`、provider 包分别负责什么？
2. 为什么安装依赖前要先确认虚拟环境已经激活？
3. 如果运行代码时提示 `ModuleNotFoundError`，你会先做什么？

## 小结

这一节你只需要记住：

- **`pip`**：安装 Python 包的命令
- **`deepagents`**：创建 Deep Agent 的核心包
- **`python-dotenv`**：读取 `.env` 的工具
- **`langchain-openai` / `langchain-anthropic`**：连接模型服务的包

下一节，我们会写第一个最小 Agent。
