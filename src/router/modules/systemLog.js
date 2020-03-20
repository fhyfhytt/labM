import Layout from '@/layout'
const systemLogRouter = {
  path: '/systemLog',
  component: Layout,
  redirect: '/projectManage/manage/construction',
  name: 'systemLog',
  meta: {
    title: '系统日志',
    icon: 'iconyunweiguanli'
  },
  children: [{
    
  },{
    path: 'handlerLog',
    component: () => import(''),
    meta: {
      title: '操作日志',
      icon: 'icon111',
      roles: []
    },
    name: 'handlerLog'
  },{
    path: 'safeLog',
    component: () => import(''),
    meta: {
      title: '安全日志',
      icon: 'icon111',
      roles: []
    },
    name: 'safeLog'
  }]
}
export default systemLogRouter