# Permission：给 Agent 设置边界

## 这一节你会学到什么

你会理解 Permission 是什么，以及为什么 Agent 不是“能做越多越好”。

你还会看到如何把 Agent 的文件读写限制在一个本地学习工作区里。

## 一句话讲清楚

Permission 就是告诉 Agent：

- 你可以做什么
- 你不可以做什么
- 哪些地方可以读写
- 哪些地方绝对不要碰

用“电脑里的人”来理解：

> 你可以让助理整理桌上的学习资料，但不会把银行卡、密码本和整个电脑硬盘都交给他随便翻。

## 为什么需要它

Agent 一旦能使用工具，就不只是聊天了。

它可能会：

- 写文件。
- 改文件。
- 删除文件。
- 读取资料。
- 调用外部工具。

如果没有边界，它可能误操作。

比如你只是想让它保存学习计划，它却写到了项目根目录，甚至试图修改别的文件。

所以安全的第一步是：

> 给 Agent 一个明确的工作区。

本章统一使用这个文件夹：

```text
agent4all_workspace/
```

你可以把它理解成给学习助手准备的“安全桌面”。

## 用一个简单例子理解

如果你请人帮你整理房间，你不会说：

> 整栋楼你随便动。

你会说：

- 只整理书桌。
- 不要动抽屉里的证件。
- 不要扔掉任何文件，除非我确认。

Permission 在 Agent 里就是这种边界。

## 回到 Agent

Deep Agents 支持文件系统权限配置。

你会在官方文档里看到 `FilesystemPermission`。

可以先这样理解：

- **`FilesystemBackend`**：告诉 Agent 文件系统在哪里。
- **`FilesystemPermission`**：告诉 Agent 哪些路径允许、哪些路径拒绝。

这一节只演示一个新手最容易理解的规则：

- 允许 Agent 在 `/agent4all_workspace/` 里工作。
- 拒绝 Agent 写入其他高风险位置。

重要提醒：

> 文件系统权限主要约束 Deep Agents 内置文件系统工具。你自己写的 Python 自定义工具，如果直接操作本地文件，也要自己在函数里做限制。

## 代码里长什么样

先确认你已经完成前面章节的环境准备。

如果你不确定 `deepagents` 版本是否支持本节 API，可以先运行：

```bash
pip install -U deepagents
```

然后在项目根目录创建文件：

```text
safe_agent.py
```

写入：

```python
from pathlib import Path

from dotenv import load_dotenv
from deepagents import FilesystemPermission, create_deep_agent
from deepagents.backends import FilesystemBackend

load_dotenv()

PROJECT_ROOT = Path.cwd().resolve()
WORKSPACE_DIR = PROJECT_ROOT / "agent4all_workspace"
WORKSPACE_DIR.mkdir(exist_ok=True)

backend = FilesystemBackend(root_dir=str(PROJECT_ROOT))

permissions = [
    FilesystemPermission(
        operations=["read", "write"],
        paths=["/agent4all_workspace/**"],
        mode="allow",
    ),
    FilesystemPermission(
        operations=["read", "write"],
        paths=["/**"],
        mode="deny",
    ),
]

agent = create_deep_agent(
    model="openai:gpt-4o-mini",
    backend=backend,
    permissions=permissions,
    system_prompt=(
        "你是一个安全谨慎的 DeepAgent 学习助手。"
        "所有学习计划、笔记和复盘内容都必须保存在 /agent4all_workspace/ 中。"
        "不要写入其他目录。"
    ),
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": (
                "请为我创建一份 3 天 DeepAgent 复习计划，"
                "并保存到 /agent4all_workspace/review-plan.md。"
            ),
        }
    ]
})

print(result["messages"][-1].content)
```

这段代码里：

| 代码 | 作用 |
| --- | --- |
| `FilesystemBackend(...)` | 让 Agent 使用当前项目目录作为文件系统根目录 |
| `FilesystemPermission(...)` | 设置文件系统读写规则 |
| `/agent4all_workspace/**` | 允许读写学习工作区 |
| `/**` | 其他路径拒绝读写 |
| `system_prompt` | 再用文字提醒 Agent 只能在工作区里保存内容 |

## 跟着做

运行：

```bash
python safe_agent.py
```

然后检查是否生成了：

```text
agent4all_workspace/review-plan.md
```

macOS 或 Linux 可以运行：

```bash
ls agent4all_workspace
cat agent4all_workspace/review-plan.md
```

Windows PowerShell 可以运行：

```powershell
Get-ChildItem .\agent4all_workspace
Get-Content .\agent4all_workspace\review-plan.md
```

## 你应该看到什么结果

你应该看到：

- 项目里出现 `agent4all_workspace/` 文件夹。
- 文件夹里出现 `review-plan.md`。
- 文件内容是 3 天复习计划。

这说明 Agent 已经开始在指定范围里工作。

## 常见错误

### 错误 1：以为 system prompt 就是权限

不是。

System prompt 是提醒，权限配置才是更硬的边界。

两者最好一起用：

- 代码里限制权限。
- 提示词里说明规则。

### 错误 2：自定义工具绕过权限

如果你写了自己的 Python 函数：

```python
def write_anywhere(path: str, content: str):
    ...
```

那这个函数内部也要检查路径。

不要以为 Deep Agents 的文件系统权限会自动保护所有自定义工具。

### 错误 3：权限规则写得太宽

不要一开始就给：

```text
/**
```

全盘读写。

新手阶段先让 Agent 只在 `agent4all_workspace/` 里工作。

### 错误 4：路径写错

本章使用的是：

```text
/agent4all_workspace/
```

注意前面有 `/`。

这是 Deep Agents 文件系统里的路径，不是浏览器 URL。

### 错误 5：权限规则顺序写反

权限规则是从上往下匹配的，第一条匹配的规则生效。

所以要先写更具体的允许规则：

```python
FilesystemPermission(
    operations=["read", "write"],
    paths=["/agent4all_workspace/**"],
    mode="allow",
)
```

再写更宽泛的拒绝规则：

```python
FilesystemPermission(
    operations=["read", "write"],
    paths=["/**"],
    mode="deny",
)
```

如果顺序反过来，`/**` 会先匹配所有路径，后面的允许规则就没有机会生效。

## 自测

确认你能回答：

1. Permission 解决的是 Agent 能力变强后的什么风险？
2. 为什么文件工具应该限制在固定工作区里？
3. 如果 MaxLance Assistant 想写入工作区外的路径，正确结果应该是什么？

## 小结

这一节你只需要记住：

> Permission：给 Agent 设置能做什么、不能做什么的边界。

安全不是等项目上线后再考虑。

从第一个能读写文件的 Agent 开始，就应该有边界。

下一节，我们会讲：即使有边界，有些重要操作也应该先问人。
