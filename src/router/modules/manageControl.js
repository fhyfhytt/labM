/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageControlRouter = {
  path: '/systemManagement',
  component: Layout,
  redirect: '/systemManagement/UserManagement/OrganManage',
  name: 'systemManagement',
  meta: {
    title: '系统管理',
    icon: 'iconxitongguanli',
    roles: ['systemManagement']
  },
  children: [{
    path: 'userManagement',
    component: () => import('@/views/systemManagement/UserManagement'),
    meta: {
      title: '用户管理',
      icon: 'icon111',
      roles: ['UserManagement']
    },
    name: 'UserManagement',
    redirect: '/systemManagement/UserManagement',
    children: [{
      path: 'organManage',
      component: () => import('@/views/systemManagement/UserManagement/OrganManage/view.vue'),
      meta: {
        title: '组织管理',
        icon: 'icon111',
        roles: ['OrganManage']
      },
      name: 'OrganManage'
    },
    {
      path: 'customerManage',
      component: () =>
        import(
          '@/views/systemManagement/UserManagement/customerManage/view.vue'
        ),
      meta: { title: '客户管理', icon: 'icon111', roles: ['customerManage'] },
      name: 'customerManage'
    },
    {
      path: 'areaManage',
      component: () =>
        import(
          '@/views/systemManagement/UserManagement/areaManage/view.vue'
        ),
      meta: {
        title: '区域管理',
        icon: 'icon111',
        roles: ['areaManage']
      },
      name: 'areaManage'
    },

    {
      path: 'roleManage',
      component: () =>
        import(
          '@/views/systemManagement/UserManagement/RoleManage/RoleManage.vue'
        ),
      meta: {
        title: '角色管理',
        icon: 'icon111',
        roles: ['RoleManage']
      },
      name: 'RoleManage'
    },
    {
      path: 'groupManage',
      component: () =>
        import(
          '@/views/systemManagement/UserManagement/GroupManage/view.vue'
        ),
      meta: { title: '班组管理', icon: 'icon111', roles: ['GroupManage'] },
      name: 'GroupManage'
    },
    {
      path: 'PersonManage',
      component: () => import('@/views/systemManagement/UserManagement/PersonManage/PersonManage.vue'),
      meta: {
        title: '人员管理',
        icon: 'icon111',
        roles: ['PersonManage']
      },
      name: 'PersonManage'
    },
    {
      path: 'regionManage',
      component: () => import('@/views/systemManagement/UserManagement/RegionManage/RegionManage.vue'),
      meta: {
        title: '数据域管理',
        icon: 'icon111',
        roles: ['RegionManage']
      },
      name: 'RegionManage'
    },
    {
      path: 'messageManagement',
      component: () => import('@/views/systemManagement/UserManagement/messageManagement/index.vue'),
      meta: {
        title: '用户通知',
        icon: 'icon111',
        roles: ['messageManagement']
      },
      name: 'messageManagement'
    }
    ]
  },
  {
    path: 'SystemSet',
    component: () => import('@/views/systemManagement/SystemSet'),
    meta: {
      title: '系统设置',
      icon: 'icon111',
      roles: ['SystemSet']
    },
    name: 'SystemSet',
    redirect: '/systemManagement/SystemSet',
    children: [{
      path: 'houseManagement',
      component: () => import('@/views/systemManagement/SystemSet/houseManagement/view.vue'),
      meta: {
        title: '库房管理',
        icon: 'icon111',
        roles: ['houseManagement']
      },
      name: 'houseManagement'
    },
    {
      path: 'houseItemManagement',
      component: () => import('@/views/systemManagement/SystemSet/houseItemManagement/view.vue'),
      meta: {
        title: '库位管理',
        icon: 'icon111',
        roles: ['houseItemManagement']
      },
      name: 'houseItemManagement'
    },
    {
      path: 'classifyManagement',
      component: () => import('@/views/systemManagement/SystemSet/classifyManagement/view.vue'),
      meta: {
        title: '分类管理',
        icon: 'icon111',
        roles: ['classifyManagement']
      },
      name: 'classifyManagement'
    },
    {
      path: 'DictionaryS',
      component: () => import('@/views/systemManagement/SystemSet/DictionaryS/view.vue'),
      meta: {
        title: '字典库',
        icon: 'icon111',
        roles: ['DictionaryS']
      },
      name: 'DictionaryS'
    }, {
      path: 'noticeManagement',
      component: () => import('@/views/systemManagement/SystemSet/noticeManagement/index.vue'),
      meta: {
        title: '通知管理',
        icon: 'icon111',
        roles: ['NoticeManage']
      },
      name: 'noticeManagement'
    },
    {
      path: 'sendnotice',
      hidden: true,
      component: () => import('@/views/systemManagement/SystemSet/noticeManagement/sendMsg'),
      name: 'Sendnotice',
      meta: {
        title: '通知新增',
        icon: 'iconxiaoxiguanli',
        noCache: false,
        roles: ['sendnotice']
      }
    },
    {
      path: 'changeNotice',
      hidden: true,
      component: () => import('@/views/systemManagement/SystemSet/noticeManagement/sendMsg'),
      name: 'changeNotice',
      meta: {
        title: '通知修改',
        icon: 'iconxiaoxiguanli',
        noCache: false,
        roles: ['changeNotice']
      }
    },
    {
      path: 'noticeMore/:id',
      hidden: true,
      component: () => import('@/views/systemManagement/SystemSet/noticeManagement/msgMore'),
      name: 'noticeMore',
      meta: {
        title: '消息详情',
        icon: 'iconxiaoxiguanli',
        noCache: true
      }
    }, {
      path: 'docView',
      hidden: true,
      component: () => import('@/views/systemManagement/SystemSet/noticeManagement/docView'),
      name: 'docView',
      meta: {
        title: '预览功能',
        icon: 'iconxiaoxiguanli',
        noCache: true
      }
    }, {
      path: 'sysLogManage',
      component: () => import('@/views/systemManagement/SystemSet/sysLogManage'),
      meta: {
        title: '日志管理',
        icon: 'icon111',
        roles: ['sysLogManage']
      },
      name: 'sysLogManage',
      children: [{
        path: 'systemLog',
        component: () => import('@/views/systemManagement/SystemSet/sysLogManage/systemLog/index.vue'),
        name: 'systemLog',
        meta: {
          title: '系统日志',
          icon: 'iconxiaoxiguanli',
          noCache: true,
          roles: ['systemLog']
        }
      }, {
        path: 'operationLog',
        component: () => import('@/views/systemManagement/SystemSet/sysLogManage/operationLog/index.vue'),
        name: 'operationLog',
        meta: {
          title: '操作日志',
          icon: 'iconxiaoxiguanli',
          noCache: true,
          roles: ['operationLog']
        }
      }]
    }
    ]
  }
  ]

}

export default manageControlRouter
