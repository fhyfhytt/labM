/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const deviceControlRouter = {
  path: '/deviceManagement',
  component: Layout,
  redirect: '/deviceManagement/AssetManagement/SuppliesManage',
  name: 'deviceManagement',
  meta: {
    title: '设备管理',
    icon: 'iconxitongguanli',
    roles: ['DeviceManagement']
  },
  children: [{
    path: 'serviceManagement',
    component: () => import('@/views/deviceManagement/serviceManagement'),
    meta: {
      title: '服务台',
      icon: 'iconxitongguanli'
    },
    name: 'ServiceManagement',
    redirect: '/deviceManagement/serviceManagement/serviceManagement',
    children: [{
      path: 'Troubleshooting',
      component: () => import('@/views/deviceManagement/serviceManagement/Troubleshooting/Troubleshooting'),
      meta: {
        title: '故障产品处理',
        icon: 'icon111',
        roles: ['Troubleshooting']
      },
      name: 'Troubleshooting'
    }]
  },
  {
    path: 'assetManagement',
    component: () => import('@/views/deviceManagement/AssetManagement'),
    meta: {
      title: '资产管理',
      icon: 'iconxitongguanli',
      roles: ['AssetManagement']
    },
    name: 'AssetManagement',
    redirect: '/deviceManagement/assetManagement/assetsAudit',
    children: [{
      path: 'assetsParameter',
      component: () => import('@/views/deviceManagement/AssetManagement/assetsParameter/assetsParameter'),
      meta: {
        title: '资产台账',
        icon: 'icon111',
        roles: ['AssetsParameter']
      },
      name: 'AssetsParameter'
    }, {
      path: 'assetsAudit',
      component: () => import('@/views/deviceManagement/AssetManagement/assetsAudit/assetsAudit'),
      meta: {
        title: '资产审核',
        icon: 'icon111',
        roles: ['AssetsAudit']
      },
      name: 'AssetsAudit'
    }, {
      path: 'myAssets',
      component: () => import('@/views/deviceManagement/AssetManagement/myAssets/myAssets'),
      meta: {
        title: '我的资产',
        icon: 'icon111',
        roles: ['MyAssets']
      },
      name: 'MyAssets'
    }, {
      path: 'suppliesManage',
      component: () => import('@/views/deviceManagement/AssetManagement/SuppliesManage/view.vue'),
      meta: {
        title: '物资管理',
        icon: 'icon111',
        roles: ['SuppliesManage']
      },
      name: 'SuppliesManage'
    }]
  }, {
    path: 'sparesManagement',
    component: () => import('@/views/deviceManagement/SparesManagement'),
    meta: {
      title: '备件管理',
      icon: 'iconxitongguanli',
      roles: ['SparesManagement']
    },
    name: 'SparesManagement',
    redirect: '/deviceManagement/sparesManagement/sparesManagement',
    children: [{
      path: 'sparesManagement',
      component: () => import('@/views/deviceManagement/SparesManagement/SparesManagement/view'),
      meta: {
        title: '备件管理',
        icon: 'icon111',
        roles: ['SparesManagement']
      },
      name: 'SparesManagementChild'
    }, {
      path: 'sparesCheck',
      component: () => import('@/views/deviceManagement/SparesManagement/SparesCheck/view.vue'),
      meta: {
        title: '备件审核',
        icon: 'icon111',
        roles: ['SparesCheck']
      },
      name: 'SparesCheck'
    }, {
      path: 'sparesAllocation',
      component: () => import('@/views/deviceManagement/SparesManagement/SparesAllocation/view.vue'),
      meta: {
        title: '调拨管理',
        icon: 'icon111',
        roles: ['SparesAllocation']
      },
      name: 'SparesAllocation'
    }
    ]
  }]

}
export default deviceControlRouter
