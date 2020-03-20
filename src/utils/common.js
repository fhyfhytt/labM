import router from '../router'
import store from '../store'
import request from '@/utils/request'
export default {
  // 转为日期格式  yy-MM-dd hh:mm:ss
  formatDateTime(date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    var minute = date.getMinutes()
    minute = minute < 10 ? ('0' + minute) : minute
    var second = date.getSeconds()
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },

  // 取消按钮事件   参数为 1:浏览过的页面 2:当前路由
  closeCurrentTab(visitedTab, route) {
    // 关掉当前页
    store.dispatch('tagsView/delView', route)
    // 跳转到上一个页
    router.push(visitedTab[visitedTab.length - 1].path)
  },

  pad2(n) {
    return n < 10 ? '0' + n : n
  },

  // 生成编号
  initCode() {
    var date = new Date()
    return date.getFullYear().toString() +
              this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) +
              this.pad2(date.getHours()) + this.pad2(date.getMinutes()) +
              this.pad2(date.getSeconds())
  },

  // 根据字典大类查询字典小类
  getDictNameList(data) {
    return request({
      url: '/common/dictConnSelect',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: data
    })
  },

  // 根据组织查询信息（包括用户）
  orgSelectOne(data) {
    return request({
      url: '/sysOrganization/orgSelectOne',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: data
    })
  },

  // 计算进度条时间差
  getProgress(startTime, endTime) {
    var date1 = new Date(startTime)// 开始时间
    var date2 = new Date(endTime)// 结束时间
    var nowDate = new Date() // 当前时间
    var dateCur = nowDate.getTime() - date1.getTime()
    var date3 = date2.getTime() - date1.getTime()// 时间差的毫秒数
    // 当前进度
    var percentage = dateCur / date3 * 100
    var isOver = false
    if (percentage > 100) {
      percentage = 100
      isOver = true
    }
    var date4 = date2.getTime() - nowDate.getTime()
    if (date4 < 0) {
      date4 = 0
    }
    // 计算出相差天数
    var days = Math.floor(date4 / (24 * 3600 * 1000))
    // 计算出小时数
    var leave1 = date4 % (24 * 3600 * 1000)// 计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    // 计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)// 计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))
    // 计算相差秒数
    var leave3 = leave2 % (60 * 1000)// 计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    return {
      days, hours, minutes, seconds, percentage, isOver, startTime, endTime
    }
  },

  // 附件上传
  subFJ(myform) {
    return request({
      url: '/common/uploadFile',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: myform
    })
  },

  // 附件删除
  removeFJ(data) {
    return request({
      url: '/common/delFile',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data
    })
  },

  // 文件下载
  downloads(param) {
    return request({
      url: '/common/downloadFile',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        'appendixName': param.appendixName,
        'appendixPath': param.appendixPath,
        'responseType': 'blob'
      }
    })
  }
}

