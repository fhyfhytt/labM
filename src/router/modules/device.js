/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const deviceControlRouter = {
  path: '/deviceManagement',
  component: Layout,
  redirect: '/deviceManagement/AssetManagement/SuppliesManage',
  name: 'deviceManagement',
  meta: {
    title: '设备管理',
    icon: 'iconxitongguanli'
    // ,
    // roles: ['deviceManagement']
  },
  children: [{
    path: 'assetManagement',
    component: () => import('@/views/deviceManagement/AssetManagement'),
    meta: {
      title: '资产管理',
      icon: 'icon111'
      // ,
      // roles: ['assetManagement']
    },
    name: 'AssetManagement',
    redirect: '/deviceManagement/AssetManagement/SuppliesManage',
    children: [
      {
        path: 'suppliesManage',
        component: () => import('@/views/deviceManagement/AssetManagement/SuppliesManage/view.vue'),
        meta: {
          title: '物资管理',
          icon: 'icon111'
          // ,
          // roles: ['suppliesManage']
        },
        name: 'SuppliesManage'
      }
    ]
  },
  {
    path: 'SparesManagement',
    component: () => import('@/views/deviceManagement/SparesManagement'),
    meta: {
      title: '备件管理',
      icon: 'icon111'
      // ,
      // roles: ['SparesManagement']
    },
    name: 'SparesManage',
    redirect: '/deviceManagement/SparesManagement/SparesManage',
    children: [{
      path: 'sparesManage',
      component: () => import('@/views/deviceManagement/SparesManagement/SparesManage/view.vue'),
      meta: {
        title: '备件管理',
        icon: 'icon111'
        // ,
        // roles: ['sparesManage']
      },
      name: 'sparesManage'
    }]
  }
  ]
}

export default deviceControlRouter
