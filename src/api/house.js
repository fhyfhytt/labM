import request from '@/utils/request'
// 库房查询
export function queryHouseList(param) {
  return request({
    url: '/sysWarehouse/getWarehouseList',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 删除库房
export function deleteHouse(param) {
  return request({
    url: '/sysWarehouse/deleteWarehouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 库房信息编辑
export function dictUpdate(param) {
  return request({
    url: '/sysWarehouse/editWarehouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

