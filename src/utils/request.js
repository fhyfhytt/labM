import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import global from '@/base.vue'
// create an axios instance
const service = axios.create({
  baseURL: global.BASE_URL, // url = base url + request url
  timeout: 10000 // request timeout
  // withCredentials: true
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (!store.getters.token) {
      config.headers.Authorization = 'none'
    } else {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== undefined) {
      // const resJson = JSON.parse(res)
      if (res.code === 0) {
        return Promise.resolve(res)
      } else {
        if (res.code === 10003) { // 过期处理
          Message({
            message: res.msg,
            type: 'error',
            duration: 3 * 1000
          })
          store.state.user.token = null
          store.dispatch('tagsView/delAllVisitedViews', '')
          store.dispatch('user/logout')
        } else if (res.code === 10010 || res.code === 10017) {
          Message({
            message: res.msg,
            type: 'warning',
            duration: 3 * 1000
          })
          return res
        } else {
          return Promise.reject(res)
        }
      }
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
