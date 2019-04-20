// 菜单 侧边栏
export default [
  { path: '/index', ico: 'home', title: '首页', children: [] },
  {
    path: '/task',
    ico: 'center',
    title: '我的任务',
    children: [
      {
        path: '/task/index',
        ico: 'cate',
        title: ' 未完成的任务',
        children: []
      }
    ]
  },
  {
    path: '/cate',
    ico: 'log',
    title: '标准目录',
    children: []
  },
  {
    path: '/qiang',
    ico: 'log',
    title: '强制性条文',
    children: []
  },
  {
    path: '/qiang',
    ico: 'log',
    title: '更新记录',
    children: []
  }
]
