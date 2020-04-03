/* jshint esversion: 6 */
import request from '@/utils/request'
const querystring = require('querystring')

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
    url: '/assetC/deleteById',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 备件管理--入库管理
// 入库信息查询
export function getGohousePage(data) {
  return request({
    url: '/sysWarehouse/getGohousePage',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}

// 交付人查询
export function getUserList(data) {
  return request({
    url: '/user/getUserListCommon',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}

// 保存
export function saveWarehourse(data) {
  return request({
    url: '/sysWarehouse/saveBjXZ',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}
// 完成入库
export function complateWare(data) {
  return request({
    url: '/sysWarehouse/inBjXZ',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}

// 删除入库信息
export function deleteWarehouse(data) {
  return request({
    url: '/sysWarehouse/deletehouse',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}

// 入库备件查询
export function getWarehourseByNo(data) {
  return request({
    url: '/sysWarehouse/selectByWarehouse',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}
