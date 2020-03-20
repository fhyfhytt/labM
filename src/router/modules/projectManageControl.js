/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const projectManageControlRouter = {
  path: '/projectManage',
  component: Layout,
  redirect: '/projectManage/manage/construction',
  name: 'ProjectManage',
  meta: {
    title: '运维管理',
    icon: 'iconyunweiguanli'
  },
  children: [
    {
      path: 'registion',
      component: () => import('@/views/projectManage/registion'), // Parent router-view
      name: 'Registion',
      meta: { title: '业务开单', icon: 'icon111' },
      redirect: '/projectManage/registion/construction',
      children: [
        {
          path: 'construction',
          component: () => import('@/views/projectManage/registion/construction/index'),
          name: 'Construction',
          meta: { title: '隧道施工单', icon: 'icon111', name: 'Three', noCache: false }
        },
        {
          path: 'divideroad',
          component: () => import('@/views/projectManage/registion/divideroad/index'),
          name: 'Divideroad',
          meta: { title: '隧道封道单', icon: 'icon111', noCache: false }
        },
        {
          path: 'trafficManage',
          component: () => import('@/views/projectManage/registion/trafficManage/index'),
          name: 'TrafficManage',
          meta: { title: '交通管制登记单', icon: 'icon111', noCache: false }
        },
        {
          path: 'spoil',
          component: () => import('@/views/projectManage/registion/spoil/index'),
          name: 'Spoil',
          meta: { title: '抛洒物登记单', icon: 'icon111', noCache: false }
        }
      ]
    },
    {
      path: 'manage',
      component: () => import('@/views/projectManage/manage'), // Parent router-view
      name: 'Manage',
      meta: { title: '业务管理', icon: 'icon111' },
      redirect: '/projectManage/manage/construction',
      children: [
        {
          path: 'construction',
          component: () => import('@/views/projectManage/manage/construction/index'),
          name: 'Construction1',
          meta: { title: '隧道施工管理', icon: 'icon111', noCache: false }
        },
        {
          path: 'divideroad',
          component: () => import('@/views/projectManage/manage/divideroad/index'),
          name: 'Divideroad1',
          meta: { title: '隧道封道管理', icon: 'icon111', noCache: false }
        },
        {
          path: 'trafficManage',
          component: () => import('@/views/projectManage/manage/trafficManage/index'),
          name: 'TrafficManage1',
          meta: { title: '交通管制管理', icon: 'icon111', noCache: false }
        },
        {
          path: 'spoil',
          component: () => import('@/views/projectManage/manage/spoil/index'),
          name: 'Spoil1',
          meta: { title: '抛洒物管理', icon: 'icon111', noCache: false }
        }
      ]
    },
    {
      path: 'constructionDetail/:id(\\S+)',
      component: () => import('@/views/projectManage/detail/constructionDetail'), // Parent router-view
      name: 'ConstructionDetail',
      hidden: true,
      meta: { title: '施工详情页', icon: 'icon111', noCache: false }
    },
    {
      path: 'divideDetail/:id(\\S+)',
      component: () => import('@/views/projectManage/detail/divideDetail'), // Parent router-view
      name: 'DivideDetail',
      hidden: true,
      meta: { title: '封道详情页', icon: 'icon111', noCache: false }
    },
    {
      path: 'trafficDetail/:id(\\S+)',
      component: () => import('@/views/projectManage/detail/trafficDetail'), // Parent router-view
      name: 'TrafficDetail',
      hidden: true,
      meta: { title: '交通管制详情页', icon: 'icon111', noCache: false }
    },
    {
      path: 'spoilDetail/:id(\\S+)',
      component: () => import('@/views/projectManage/detail/spoilDetail'), // Parent router-view
      name: 'SpoilDetail',
      hidden: true,
      meta: { title: '抛洒物详情页', icon: 'icon111', noCache: false }
    }
    // {
    //   path: 'maintainManage',
    //   name: 'MaintainManage',
    //   component: () => import('@/views/projectManage/maintainManage/index'),
    //   meta: { title: '隧道养护计划管理' }
    // }
  ]
}

export default projectManageControlRouter
