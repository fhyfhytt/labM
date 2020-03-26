import request from '@/utils/request'

// 物资管理 物资查询接口
export function getSupplies(param) {
  return request({
    url: '/assetC/queryByAsset',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 物资管理 物资新增/修改接口
export function suppliesEdit(param) {
  return request({
    url: '/assetC/addOrUpdateAsset',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 物资管理 物资删除接口
export function suppliesDelete(param) {
  return request({
    url: '/assetC/deleteById',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 备件审核 备件查询接口
export function getSparesList(param) {
  return request({
    url: '/warehouseAssetC/queryByWarehouseAsset',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
