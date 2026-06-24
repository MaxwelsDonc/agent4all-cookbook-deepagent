import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Agent4all',
    description: '让 DeepAgent 不再 deep',
    base: '/agent4all-cookbook-deepagent/',
    cleanUrls: true,
    head: [
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap'
        }
      ]
    ],
    themeConfig: {
      logo: '/logo.svg',
      siteTitle: 'Agent4all',
      nav: [
        { text: '课程', link: '/courses/' },
        { text: 'GitHub', link: 'https://github.com/MaxwelsDonc/agent4all-cookbook-deepagent' }
      ],
      sidebar: [
        {
          text: '开始',
          items: [
            { text: '项目首页', link: '/' },
            { text: '课程总览', link: '/courses/' }
          ]
        },
        {
          text: '01. DeepAgent 零基础入门',
          items: [
            { text: '课程介绍', link: '/courses/01-basics/' },
            { text: '什么是 Agent', link: '/courses/01-basics/what-is-agent' },
            { text: 'LangChain、LangGraph 和 DeepAgents', link: '/courses/01-basics/langchain-langgraph-deepagents' },
            { text: 'Model、Token、Prompt、Messages 和 Context', link: '/courses/01-basics/model-token-prompt-messages-context' },
            { text: 'DeepAgent 到底 deep 在哪里', link: '/courses/01-basics/why-deep-agent' }
          ]
        },
        {
          text: '02. 从 0 跑通第一个 Agent',
          items: [
            { text: '课程介绍', link: '/courses/02-first-agent/' },
            { text: '准备 Python 环境', link: '/courses/02-first-agent/python-environment' },
            { text: 'API Key 与环境变量', link: '/courses/02-first-agent/api-key-and-env' },
            { text: '安装 Deep Agents', link: '/courses/02-first-agent/install-deepagents' },
            { text: '跑通第一个 Agent', link: '/courses/02-first-agent/first-agent' },
            { text: '看懂第一次输出', link: '/courses/02-first-agent/understand-output' }
          ]
        },
        {
          text: '03. 让 Agent 会使用工具',
          items: [
            { text: '课程介绍', link: '/courses/03-tools/' },
            { text: '为什么 Agent 需要工具', link: '/courses/03-tools/why-tools' },
            { text: '写第一个 Python 工具', link: '/courses/03-tools/first-python-tool' },
            { text: '让 Agent 调用工具', link: '/courses/03-tools/agent-call-tool' },
            { text: '工具参数、返回值和 docstring', link: '/courses/03-tools/tool-parameters-return-docstring' },
            { text: '工具失败与权限边界', link: '/courses/03-tools/tool-failure-permission' }
          ]
        },
        {
          text: '04. 让 Agent 能完成复杂任务',
          items: [
            { text: '课程介绍', link: '/courses/04-deep-capabilities/' },
            { text: 'Planning：先想清楚再行动', link: '/courses/04-deep-capabilities/planning' },
            { text: '文件系统：保存中间结果', link: '/courses/04-deep-capabilities/filesystem' },
            { text: 'Context engineering：管理上下文', link: '/courses/04-deep-capabilities/context-engineering' },
            { text: 'Memory：记住长期信息', link: '/courses/04-deep-capabilities/memory' },
            { text: 'Subagent：分工协作', link: '/courses/04-deep-capabilities/subagent' }
          ]
        },
        {
          text: '05. 安全、调试与完整项目实战',
          items: [
            { text: '课程介绍', link: '/courses/05-project/' },
            { text: 'Permission：设置边界', link: '/courses/05-project/permissions' },
            { text: 'Human-in-the-loop：先问人', link: '/courses/05-project/human-in-the-loop' },
            { text: 'Sandbox：安全试错', link: '/courses/05-project/sandbox' },
            { text: 'Streaming：看执行过程', link: '/courses/05-project/streaming' },
            { text: 'LangSmith：调试复盘', link: '/courses/05-project/langsmith' },
            { text: '最终项目实战', link: '/courses/05-project/final-project' }
          ]
        }
      ],
      outline: {
        label: '本页目录',
        level: [2, 3]
      },
      docFooter: {
        prev: '上一节',
        next: '下一节'
      },
      lastUpdated: {
        text: '最后更新'
      },
      search: {
        provider: 'local'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/MaxwelsDonc/agent4all-cookbook-deepagent' }
      ]
    }
  })
)
