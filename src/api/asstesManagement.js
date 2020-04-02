import request from '@/utils/request'

// 资产台账查询
export function getAssetsList(data) {
  return request({
    url: '/usedAsset/select',
    method: 'post',
    data
  })
}
// 资产台账新增
export function addAssets(data) {
  return request({
    url: '/usedAsset/insert',
    method: 'post',
    data
  })
}
// 资产台账删除
export function deleteAssets(data) {
  return request({
    url: '/usedAsset/updateMore',
    method: 'post',
    data
  })
}
// 资产台账修改、我的资产修改
export function assetsUpdate(data) {
  return request({
    url: '/usedAsset/update',
    method: 'post',
    data
  })
}

// 资产台账导入
export function importExcel(data) {
  return request({
    url: '/usedAsset/importExcel',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data
  })
}

// 物资查询
export function queryByAsset(data) {
  return request({
    url: '/assetC/queryByAsset',
    method: 'post',
    data
  })
}

// 资产分类树查询
export function getAssetsTypeTree(data) {
  return request({
    url: '/classification/queryClassificationTree',
    method: 'post',
    data
  })
}
// 区域分类树查询
export function getAreaTypeTree(data) {
  return request({
    url: '/sysArea/getAreaTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 资产审核
export function updateCheckMore(data) {
  return request({
    url: '/usedAsset/updateCheckMore',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 我的资产删除
export function deleteMoreAssets(data) {
  return request({
    url: '/usedAsset/deleteMore',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 备件管理
// 备件管理查询
export function queryByWarehouseAsset(data) {
  return request({
    url: '/warehouseAssetC/queryByWarehouseAsset',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 备件管理新增、修改
export function addOrUpdateWarehouseAsset(data) {
  return request({
    url: '/warehouseAssetC/addOrUpdateWarehouseAsset',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 备件管理删除
export function deleteById(data) {
  return request({
    url: '/warehouseAssetC/deleteById',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 备件导入
export function importWarehouseAsset(data) {
  return request({
    url: '/warehouseAssetC/importWarehouseAsset',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data
  })
}
// 获取所有库房
export function getAllWarehouse(data) {
  return request({
    url: '/sysWarehouse/getAllWarehouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 出库查询
export function selectOuthouse(data) {
  return request({
    url: '/warehouseRecord/selectOuthouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 完成出库
export function insertOuthouse(data) {
  return request({
    url: '/warehouseRecord/insertOuthouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 删除出库
export function deleteOuthouse(data) {
  return request({
    url: '/warehouseRecord/deleteOuthouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 根据出库单号（no）查询出库单基本信息
export function selectByNo(data) {
  return request({
    url: '/warehouseRecord/selectByNo?no=' + data,
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  })
}
// 根据出库单号（no）查询资产列表 (出库类型为非替换类型)
export function selectByWarehouse(data) {
  return request({
    url: '/warehouseAssetC/selectByWarehouse',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 根据出入库单号（no）查询替换操作的资产列表
export function selectTHAsset(data) {
  return request({
    url: '/warehouseRecord/selectTHAsset',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 查看领用出库产生的资产
export function selectByWarehouseAssetId(data) {
  return request({
    url: '/usedAsset/selectByWarehouseAssetId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
