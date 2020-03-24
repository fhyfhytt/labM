/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assetsModuleRouter = {
  path: '/deviceManagement',
  component: Layout,
  redirect: '/deviceManagement/assetManagement/assetsAudit',
  name: 'DeviceManagement',
  meta: {
    title: '设备管理',
    icon: 'iconxitongguanli'
  },
  children: [{
    path: 'assetManagement',
    component: () => import('@/views/deviceManagement/AssetManagement'),
    meta: {
      title: '资产管理',
      icon: 'iconxitongguanli'
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
    }]
  }, {
    path: 'sparesManagement',
    component: () => import('@/views/deviceManagement/SparesManagement'),
    meta: {
      title: '备件管理',
      icon: 'iconxitongguanli'
    },
    name: 'SparesManagement',
    redirect: '/deviceManagement/sparesManagement/sparesManagement',
    children: [{
      path: 'sparesManagement',
      component: () => import('@/views/deviceManagement/SparesManagement/SparesManagement/view'),
      meta: {
        title: '备件管理',
        icon: 'icon111'
      },
      name: 'SparesManagementChild'
    }]
  }]
}

export default assetsModuleRouter
