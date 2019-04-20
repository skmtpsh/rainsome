import layOut from '@/layout'
const meta = { auth: true }
export default [
  {
    path: '/logs',
    name: 'logs',
    meta,
    redirect: { name: 'logs-page' },
    component: layOut,
    children: (pre => [
      { path: 'logs', name: `${pre}page`, component: () => import('@/views/logs/index'), meta: { ...meta, title: '日志列表' } }
    ])('logs-')
  }
]
