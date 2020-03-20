/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const eventMonitoring = {
  path: '/event',
  component: Layout,
  redirect: '/event/index',
  name: 'ProjectManage',
  meta: {
    title: '视频事件检测',
    icon: 'iconshipinshijianjiance'
  },
  children: [
    {
      path: 'deviceManagement',
      component: () => import('@/views/event/deviceManagement'), // Parent router-view
      name: 'deviceManagement',
      meta: { title: '设备管理', icon: '1' }
    },
    {
      path: 'management',
      component: () => import('@/views/event/management/index'), // Parent router-view
      name: 'management',
      meta: { title: '事件管理', icon: '1' },
      redirect: '/event/management',
      children: [
        {
          path: 'track',
          component: () => import('@/views/event/management/track'),
          name: 'Track',
          meta: { title: '事件跟踪', icon: '1', noCache: false }
        },
        {
          path: 'search',
          component: () => import('@/views/event/management/search'),
          name: 'EventSearch',
          meta: { title: '事件查询', icon: '1', noCache: false }
        },
        {
          path: 'analysis',
          component: () => import('@/views/event/management/analysis'),
          name: 'Analysis',
          meta: { title: '事件分析', icon: '1', noCache: false }
        }
      ]
    },
    {
      path: 'reportManagement',
      component: () => import('@/views/event/reportManagement/index'), // Parent router-view
      name: 'reportManagement',
      meta: { title: '报表管理', icon: '1' },
      redirect: '/event/reportManagement',
      children: [
        {
          path: 'reportEvent',
          component: () => import('@/views/event/reportManagement/event'),
          name: 'ReportEvent',
          meta: { title: '事件报表', icon: '1' }
        },
        {
          path: 'flow',
          component: () => import('@/views/event/reportManagement/flow'),
          name: 'Flow',
          meta: { title: '车流量报表', icon: '1' }
        },
        {
          path: 'speed',
          component: () => import('@/views/event/reportManagement/speed'),
          name: 'Speed',
          meta: { title: '平均车速报表', icon: '1' }
        }
      ]
    },
    {
      path: 'sceneManagement',
      component: () => import('@/views/event/sceneManagement/index'), // Parent router-view
      name: 'sceneManagement',
      meta: { title: '场景管理', icon: '1' },
      redirect: '/event/sceneManagement',
      children: [
        {
          path: 'setUser',
          component: () => import('@/views/event/sceneManagement/setUser'),
          name: 'SetUser',
          meta: { title: '场景配置', icon: '1' }
        },
        {
          path: 'set',
          component: () => import('@/views/event/sceneManagement/set'),
          name: 'Set',
          meta: { title: '场景设置', icon: '1' }
        },
        {
          path: 'sceneSearch',
          component: () => import('@/views/event/sceneManagement/search'),
          name: 'SceneSearch',
          meta: { title: '场景查询', icon: '1' }
        }
      ]
    }
  ]
}

export default eventMonitoring
