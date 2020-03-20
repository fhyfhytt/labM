/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const messageRouter = {
  path: '/message',
  component: Layout,
  redirect: '/message/index',
  children: [
    {
      path: 'messageList',
      component: () => import('@/views/messageManagement/index'),
      name: 'MessageList',
      meta: { title: '消息管理', icon: 'iconxiaoxiguanli', noCache: false }
    },
    {
      path: 'sendMsg',
      hidden: true,
      component: () => import('@/views/messageManagement/sendMsg'),
      name: 'SendMsg',
      meta: { title: '消息新增', icon: 'iconxiaoxiguanli', noCache: false }
    },
    {
      path: 'changeMsg',
      hidden: true,
      component: () => import('@/views/messageManagement/sendMsg'),
      name: 'ChangeMsg',
      meta: { title: '消息修改', icon: 'iconxiaoxiguanli', noCache: false }
    },
    {
      path: 'messageMore/:id',
      hidden: true,
      component: () => import('@/views/messageManagement/msgMore'),
      name: 'MessageMore',
      meta: { title: '消息详情', icon: 'iconxiaoxiguanli', noCache: true }
    }
  ]
}

export default messageRouter
