import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import WarehourseManage from './modules/WarehourseManage'
// import tunnelControlRouter from './modules/tunnelControl'
// import projectManageControl from './modules/projectManageControl'
// import eventMonitoring from './modules/eventMonitoring'
import manageControlRouter from './modules/manageControl'
import deviceControlRouter from './modules/device'
// import tunnelControlShowRouter from './modules/tunnelControlShow'
// import environmentalMonitor from './modules/environmentMonitor'
// import animation from '@/views/components-demo/animation'         //3d
// import tunnelControl from '@/views/tunnelControl'                 //隧道控制
// import digitalTunnel from '@/views/digitalTunnel'                 //数字隧道
// import videoView from '@/views/videoView'                         //视频查看
// import environmentalMonitor from '@/views/environmentalMonitor' // 环境监控
// import fireControl from '@/views/fireControl'                     //消防监控
// import fireMonitoringEvent from '@/views/fireMonitoringEvent'     //视频事件检测
// import trafficMonitor from '@/views/trafficMonitor'               //交通监测
// import commandDispatch from '@/views/commandDispatch'             //指挥调度
// import mochaItom from '@/views/mochaItom'                         //运维管理
// import userManagement from '@/views/userManagement'               //用户管理
// import systemManagement from '@/views/systemManagement'           //系统管理
// import messageManagement from '@/views/messageManagement'         //消息管理

export const constantRoutes = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'iconshouye',
        affix: true,
        noCache: true
      }
    },
    {
      path: '/404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
    {
      path: '/403',
      component: () => import('@/views/error-page/403'),
      hidden: true
    },
    {
      path: '/500',
      component: () => import('@/views/error-page/500'),
      hidden: true
    }
    ]
  }, {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),

    hidden: true
  },
  {
    path: '/forgetPassword',
    component: () => import('@/views/login/password'),
    hidden: true
  },
  {
    path: '/resetPassword',
    component: () => import('@/views/login/resetpassword'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  }
  // {
  //   path: '/personMeaage',
  //   component: Layout,
  //   // redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     name: 'Dashboard',
  //     meta: {
  //       title: '首页',
  //       icon: 'iconshouye',
  //       affix: true,
  //       noCache: true
  //     }
  //   }]
  // }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // WarehourseManage,
  manageControlRouter,
  deviceControlRouter,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
