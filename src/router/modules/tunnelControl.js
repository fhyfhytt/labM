/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tunnelControlRouter = {
  path: '/tunnelControl',
  component: Layout,
  redirect: '/tunnelControl/menu1/menu1-1',
  name: 'tunnelControl',
  meta: {
    title: '隧道控制2',
    icon: 'nested'
  },
  children: [
    {
      path: 'tunnelTree',
      name: 'TunnelTree',
      component: () => import('@/views/tunnelControl/tunnelTree/index'),
      meta: { title: '隧道控制', icon: 'iconsuidaokongzhi', noCache: true }
    },
    {
      path: '/tunnelControl/tunnelTree/:id(\\S+)',
      name: 'TunnelTwo',
      hidden: true,
      component: () => import('@/views/tunnelControl/tunnelTree/index'),
      meta: { title: '隧道' }
    },
    {
      path: '/threeTunnel/:id(\\S+)',
      name: 'threeTunnel',
      hidden: true,
      component: () => import('@/views/threeTunnel/index'),
      meta: { title: '3D' }
    }
  ]
}

export default tunnelControlRouter
