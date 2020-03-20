/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tunnelControlShowRouter = {
  path: '/tunnel',
  component: Layout,
  redirect: '/tunnel/index',
  children: [
    {
      path: 'tunnelList',
      component: () => import('@/views/tunnelControlShow/tunnelTree/index'),
      name: 'TunnelList',
      meta: { title: '隧道控制-演示', icon: 'iconsuidaokongzhi', noCache: false }
    },
    {
      path: 'threeTunnelList',
      component: () => import('@/views/tunnelControlShow/threeTunnel/index'),
      name: 'threeTunnelList',
      hidden: true
    }
  ]
}

export default tunnelControlShowRouter
