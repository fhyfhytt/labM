
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const WarehourseManage = {
  path: '/WarehourseManage',
  component: Layout,
  redirect: '/WarehourseManage/index',
  name: 'WarehourseManage',
  meta: {
    title: '服务台',
    icon: 'iconxitongguanli',
    roles: ['WarehourseManage']
  },
  children: [{
    path: 'userManagement',
    component: () => import('@/views/WarehourseManage/serviceManage/view'),
    meta: {
      title: '服务台',
      icon: 'icon111',
      roles: ['UserManagement']
    },
    name: 'UserManagement',
    redirect: '/WarehourseManage/UserManagement/OrganManage',
    children: [{
      path: 'organManage',
      component: () => import('@/views/WarehourseManage/serviceManage/view'),
      meta: {
        title: '服务台',
        icon: 'icon111',
        roles: ['OrganManage']
      },
      name: 'OrganManage'
    }]
  }]

}

export default WarehourseManage
