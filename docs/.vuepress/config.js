module.exports = {
    title: '进阶',
    description: '学习笔记',
    base: '/myBlog/',
    head: [
      ['link', { rel: 'icon', href: `/cc.png` }],
    ],
    themeConfig: {
      logo: "/cc.png",
      author: 'R-Z',
      displayAllHeaders: false,
      smoothScroll: true,
       // 博客配置
      blogConfig: {
        category: {
          location: 2,     // 在导航栏菜单中所占的位置，默认2
          text: 'Category' // 默认文案 “分类”
        },
        tag: {
          location: 3,     // 在导航栏菜单中所占的位置，默认3
          text: 'Tag'      // 默认文案 “标签”
        }
      },
      // 主页导航栏配置
      nav: [
        { text: '主页', link: '/' },
        { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
        { text: '前端知识', link: '/frontend/' },
        { text: '算法', link: '/algorithm/' },
        { text: '项目', link: '/project/' },
        { text: '笔记', link: '/notes/' },
        { text: '文章', link: '/blog/' },
        // 下拉列表的配置
        {
          text: 'Languages',
          items: [
            { text: 'Chinese', link: '/language/chinese' },
            { text: 'English', link: '/language/English' }
          ]
        }
      ],
      // 侧边栏配置
      sidebarDepth: 'auto',
      subSidebar: 'auto',
      sidebar: {
        "/frontend/":[
          ["", "JS"],
          ["es6", "ES6"],
          ["typescript", "TS"],
          ["html", "HTML"],
          ["css", "CSS"],
          ["http", "HTTP"],
          ["browser", "浏览器"],
          ["webpack", "Webpack"],
          ["vue", "Vue"],
          ["react", "React"],
          ["mobile", "移动Web开发"]
        
        ],
        "/algorithm/":[
          ["", "笔记"],
          ["offer","剑指offer题解"],
          ["interview", "常考算法"],
          ["leetcode", "leetcode题解"],
          ["classification", "算法分类"]
        ],
        "/project/":[
          ["", "项目"],
          ["VSCode", "VSCode配置"],
          ["manage", "Vue管理系统"]
        ],
        "/notes/": [
          ["", "笔记"],
          ["route", "学习路线"]
        ],
        "/blog/": [
          ["", "文章"]
        ],
      }
    },
    configureWebpack: {
      resolve: {
        alias: {
          '@': '../.vuepress',
          '@alias': '../.vuepress/image',
          '@paper': '../.vuepress/paperImage'
        }
      }
    }
  }