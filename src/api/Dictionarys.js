import request from '@/utils/request'
// 字典库 table表格通用查询
export function dictConnSelect(param) {
  return request({
    url: '/common/dictConnSelect',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 字典库 字典主表新增
export function dictConnAdd(param) {
  return request({
    url: '/common/dictConnAdd',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 字典库 字典主表编辑
export function dictUpdate(param) {
  return request({
    url: '/common/dictUpdate',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 字典库 字典主表删除
export function dictConnDel(param) {
  return request({
    url: '/common/dictConnDel',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
