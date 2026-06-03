import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Agent4all',
    description: '让 DeepAgent 不再 deep',
    base: '/agent4all-cookbook-deepagent/',
    cleanUrls: true,
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
            { text: 'LangChain、LangGraph 和 DeepAgents', link: '/courses/01-basics/langchain-langgraph-deepagents' }
          ]
        },
        {
          text: '02. 从 0 跑通第一个 Agent',
          items: [
            { text: '课程介绍', link: '/courses/02-first-agent/' }
          ]
        },
        {
          text: '03. 让 Agent 会使用工具',
          items: [
            { text: '课程介绍', link: '/courses/03-tools/' }
          ]
        },
        {
          text: '04. 让 Agent 能完成复杂任务',
          items: [
            { text: '课程介绍', link: '/courses/04-deep-capabilities/' }
          ]
        },
        {
          text: '05. 安全、调试与完整项目实战',
          items: [
            { text: '课程介绍', link: '/courses/05-project/' }
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
