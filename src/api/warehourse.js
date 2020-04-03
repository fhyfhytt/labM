import request from '@/utils/request'

//  库位新增，修改
export function editWarehourse(param) {
  return request({
    url: '/sysWarehouseLocation/editWarehouseLocation',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 库位删除
export function deleteWarehourse(param) {
  return request({
    url: '/sysWarehouseLocation/deleteWarehouseLocation',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 库位列表
export function getWarehouseList(param) {
  return request({
    url: '/sysWarehouseLocation/getWarehouseLocationList',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 库房列表
function getAllWarehouse(param) {
  return request({
    url: '/sysWarehouse/getAllWarehouse',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 根据id查询库位
function getWarehouseById(param) {
  return request({
    url: '/sysWarehouseLocation/getWarehouseLocationListByWarehouseId',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
export {
  getAllWarehouse,
  getWarehouseById
}
