# 写第一个 Python 工具

## 这一节你会学到什么

你会写一个最简单的 Python 函数。

这个函数会计算 DeepAgent 学习时间。

它现在还不是 Agent 工具。

它只是一个普通函数。

但下一节，我们会把它交给 MaxLance Assistant 使用。

## 一句话讲清楚

Agent 工具的起点，通常就是一个写清楚参数、返回值和用途的 Python 函数。

## 为什么先写普通函数

如果你一上来就把函数放进 Agent，出错时很难判断问题在哪。

可能是 Python 函数写错了。

可能是 Agent 没有调用工具。

也可能是模型调用工具时参数传错了。

所以我们先把工具函数单独跑通。

先确认函数自己能工作，再交给 Agent。

## 跟着做：创建文件

在项目根目录创建一个文件：

```text
maxlance_agent.py
```

这里的“项目根目录”，就是能看到 `README.md`、`package.json`、`docs/` 的那一层目录。

不要把这个文件放进 `docs/courses/03-tools/` 里。

写入下面代码：

```python
def calculate_study_time(days: int, hours_per_day: float) -> str:
    """Calculate total DeepAgent study time for a beginner."""
    if days <= 0:
        return "学习天数必须大于 0。"

    if hours_per_day <= 0:
        return "每天学习时间必须大于 0。"

    total_hours = days * hours_per_day
    return f"你一共有 {total_hours} 小时可以学习 DeepAgent。"


print(calculate_study_time(5, 1.5))
```

最后一行 `print(...)` 只是为了先测试这个函数。

下一节接入 Agent 后，我们会把测试代码换成 `agent.invoke(...)`。

## 这段代码在做什么

先看函数名字：

```python
calculate_study_time
```

它的意思是“计算学习时间”。

再看参数：

```python
days: int
hours_per_day: float
```

意思是：

- `days` 是学习天数。
- `hours_per_day` 是每天学习几小时。

`int` 可以先理解成整数。

`float` 可以先理解成带小数的数字。

最后看返回值：

```python
return f"你一共有 {total_hours} 小时可以学习 DeepAgent。"
```

这个函数不是打印结果，而是把结果作为字符串返回。

这很重要。

因为工具返回的内容，后面会交回给 Agent。

## 跟着做：运行函数

在终端运行：

```bash
python maxlance_agent.py
```

## 你应该看到什么结果

如果一切正常，你会看到：

```text
你一共有 7.5 小时可以学习 DeepAgent。
```

这说明工具函数自己已经跑通。

## 为什么要写 docstring

函数下面这一行叫 docstring：

```python
"""Calculate total DeepAgent study time for a beginner."""
```

它是在告诉 Agent：

> 这个工具是用来计算 DeepAgent 初学者学习总时长的。

人类可以看函数名猜意思。

Agent 也需要读工具说明。

接入 Deep Agents 后，函数名、类型标注和 docstring 会一起帮助模型理解这个工具能做什么、需要什么参数。

如果 docstring 写得太模糊，Agent 就更容易不知道什么时候该用这个工具。

## 常见错误

### 错误 1：忘记冒号

Python 函数定义最后需要冒号：

```python
def calculate_study_time(days: int, hours_per_day: float) -> str:
```

如果少了冒号，Python 会报语法错误。

### 错误 2：缩进不对

Python 用缩进表示代码属于哪里。

函数里的代码需要缩进。

如果缩进乱了，Python 可能会报 `IndentationError`。

### 错误 3：直接 `print`，不 `return`

工具函数最好返回结果。

不要只写：

```python
print(total_hours)
```

因为 Agent 需要拿到工具的返回值，才能继续组织回答。

## 小结

这一节你写了第一个工具函数。

它还没有接入 Agent，但已经具备工具的基本样子：

- 有清楚的函数名。
- 有明确的参数。
- 有返回值。
- 有 docstring。

下一节，我们会把它交给 MaxLance Assistant。
