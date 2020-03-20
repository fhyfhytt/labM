import request from '@/utils/request'
// import requestLong from '@/utils/requestLong'
// const querystring = require('querystring')
// 获取所有设备
export function getAllDevices(data) {
  return request({
    url: '/dev/devListSelect',
    method: 'post',
    data
  })
}
// 获取所有设施
export function getAllFacilities(data) {
  return request({
    url: '/tunnel/tunFacListSelect',
    method: 'post',
    data
  })
}
// 获取单一设备信息
export function getDeviceInfo(data) {
  return request({
    url: '/opc/readDeviceMsg',
    method: 'post',
    data: data
  })
}
// 查询批量设备
export function getAllDevicesInfo(data) {
  return request({
    url: '/dev/selectDevMsgByHoleLanes',
    method: 'post',
    data: data
  })
}
// 批量写入
export function handleAllDevices(data) {
  return request({
    url: '/opc/batchWriteDeviceMsg',
    method: 'post',
    data: data
  })
}
// 写入设备
export function handleDevice(data) {
  return request({
    url: '/opc/writeDeviceMsg',
    method: 'post',
    data
  })
}
// 添加设备
export function AddDevice(data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
// 修改设备
export function EditDevice(data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
// 删除设备
export function DelDevice(data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
