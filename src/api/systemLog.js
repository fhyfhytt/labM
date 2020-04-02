import request from '@/utils/request'
// 系统异常日志查询
export function systemLogList(param) {
  return request({
    url: '/sysErrorLog/queryList',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 系统异常日志新增
export function systemLogAdd(param) {
  return request({
    url: '/sysErrorLog/insert',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 操作日志查询
export function systemOperationList(param) {
  return request({
    url: '/sysOperateLog/insert',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 操作日志新增
export function systemOperationAdd(param) {
  return request({
    url: '/sysOperateLog/queryList',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

