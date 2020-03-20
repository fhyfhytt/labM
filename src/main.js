import Vue from 'vue'

import Cookies from 'js-cookie'
import permission from '@/directive/permission/index.js'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
// import ElTabPaneExt from 'el-tab-pane-ext'
import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'
import jq from 'jquery' // 引用jq
Vue.prototype.$ = jq
import 'font-awesome/css/font-awesome.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import treetransfer from 'el-tree-transfer' // fhy引入穿梭框
Vue.component('treetransfer', treetransfer)
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
Vue.component('Treeselect', Treeselect)
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
// 打印
import global_ from './base.vue'
import Print from 'vue-print-nb'
// 注册
Vue.use(Print)
import * as filters from './filters' // global filters
import * as socketApi from './api/websoket' // 引入全局的websoket
Vue.prototype.socketApi = socketApi
Vue.prototype.GLOBAL = global_
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import './assets/iconfont/iconfont.css' // 引入iconfont
import './assets/iconfont/iconfont.js' // 引入iconfont

import './api/base.js' // 防重复点击
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
const options = {
  confirmButtonColor: '#0099ff',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2, options)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})
Vue.use(permission)
// Vue.use(ElTabPaneExt)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = true
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
