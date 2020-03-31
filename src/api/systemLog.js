import request from '@/utils/request'
// 系统日志查询
export function systemLogList(param) {
  return request({
    url: '/sysArea/getAreaTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 系统日志新增
export function systemLogAdd(param) {
  return request({
    url: '/sysArea/getAreaListByParentId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

