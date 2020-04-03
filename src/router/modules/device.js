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
      title: '服务管理',
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
    }, {
      path: 'deviceInspection',
      component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection'), // Parent router-view
      name: 'DeviceInspection',
      meta: { title: '设备巡检', icon: 'icon111', menus: 'e_sbxj' },
      redirect: '/projectManage/deviceInspection/inspectionPlan/planManage',
      children: [
        {
          path: 'inspectionPlan',
          component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionPlan/planManage'),
          name: 'InspectionPlan',
          meta: { title: '巡检计划', icon: 'icon111', noCache: false, menus: 's_xjjh' }
        },
        {
          path: 'inspectionWork',
          component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionWork/workManage'),
          name: 'InspectionWork',
          meta: { title: '巡检任务', icon: 'icon111', noCache: false, menus: 's_xjrw' }
        }
      ]
    },
    {
      path: 'addPlan',
      component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionPlan/addPlan'),
      name: 'AddPlan',
      hidden: true,
      meta: { title: '巡检计划新建', icon: 'icon111', noCache: false, menus: '' }
    },
    {
      path: 'detailPlan',
      component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionPlan/detailPlan'),
      name: 'DetailPlan',
      hidden: true,
      meta: { title: '巡检计划详情', icon: 'icon111', noCache: false, menus: '' }
    },
    {
      path: 'addTask',
      component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionWork/addTask'),
      name: 'AddTask',
      hidden: true,
      meta: { title: '巡检任务新建', icon: 'icon111', noCache: false, menus: '' }
    },
    {
      path: 'inspectInfo',
      component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionWork/inspectInfo'),
      name: 'InspectInfo',
      hidden: true,
      meta: { title: '巡检', icon: 'icon111', noCache: false, menus: '' }
    },
    {
      path: 'showTask',
      component: () => import('@/views/deviceManagement/serviceManagement/deviceInspection/inspectionWork/showTask'),
      name: 'ShowTask',
      hidden: true,
      meta: { title: '查看', icon: 'icon111', noCache: false, menus: '' }
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
    },
    {
      path: 'WareHourseManage',
      component: () => import('@/views/deviceManagement/SparesManagement/WareHourseManage/view.vue'),
      meta: {
        title: '入库管理',
        icon: 'icon111',
        roles: ['wareHourseManage']
      },
      name: 'WareHourseManage'
    }, { path: 'outboundManagement',
      component: () => import('@/views/deviceManagement/SparesManagement/outboundManagement/view.vue'),
      meta: {
        title: '出库管理',
        icon: 'icon111',
        roles: ['OutboundManagement']
      },
      name: 'OutboundManagement'
    }, {
      path: 'outboundDetail',
      component: () => import('@/views/deviceManagement/SparesManagement/outboundManagement/components/detail.vue'),
      meta: {
        title: '出库单详情',
        icon: 'icon111',
        roles: ['OutboundManagement']
      },
      name: 'outboundDetail',
      hidden: true
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
