import request from '@/utils/request'
// 区域结构数据查询
export function areaTree(param) {
  return request({
    url: '/sysArea/getAreaTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 区域查询
export function queryArea(param) {
  return request({
    url: '/sysArea/getAreaListByParentId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 区域信息编辑
export function editArea(param) {
  return request({
    url: '/sysArea/editArea',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 删除区域信息
export function delArea(param) {
  return request({
    url: '/sysArea/deleteArea',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

