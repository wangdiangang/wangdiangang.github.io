module.exports = {
    plugins: [
        "vuepress-plugin-coment",
        {
            choosen: 'valine',
            options: {
                el: '#valine-vuepress-comment',
                appId: 'tCxkNWXplOhMs6XuQ5IEpbQL-gzGzoHsz',
                appKey: 'vMTI4iSCUH1jSMiVx38YuO8t',
            }
        }
    ],
    title: '五道杠首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '五道杠的前端记录', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/egg.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/weixin.jpg',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: '文章', link: '/pages/folder1/test1.md' },
                    { text: '琐碎', link: '/pages/folder2/test4.md' },
                ]
            },
            { text: '功能演示', link: '/pages/folder1/test3.md' },
            { text: 'Github', link: 'https://github.com/wangdiangang' },
        ],
        sidebar: {
            '/pages/folder1/': [
                {
                    title: '基础js',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['test1.md', 'js操作'],
                        ['test3.md', '工作问题']
                    ]
                },
                {
                    title: '拓展',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['test2.md', '拓展'],
                        ['sasa.md', '飒飒'],
                        ['comment.md', '评论区'],
                        ['me.md', '联系我!!!']
                    ]
                }
            ]
        }
    }
}