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
