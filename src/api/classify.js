import request from '@/utils/request'
// 分类结构数据查询
export function classifyTree(param) {
  return request({
    url: '/classification/queryClassificationTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 分类查询
export function queryClass(param) {
  return request({
    url: '/classification/queryByClassification',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 分类信息编辑
export function editClass(param) {
  return request({
    url: '/classification/AddOrUpdateClassification',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 删除分类信息
export function delClass(param) {
  return request({
    url: '/classification/deleteByClassification',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

