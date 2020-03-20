import request from '@/utils/request'
// import requestLong from '@/utils/requestLong'
// const querystring = require('querystring')
// 查询隧道树
export function getTunnelTree() {
  return request({
    url: '/opc/tunnelTree',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 点击隧道上设备图标  查询单个设备的信息
export function readDeviceMsg(data) {
  return request({
    url: '/opc/readDeviceMsg',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      tunnelId: data.tunnelId,
      deviceIds: data.deviceId
    }
  })
}

// 查询单个隧道页面的信息
export function devListSelect(data) {
  return request({
    url: '/dev/devListSelect',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      tunId: data.tunId,
      typeLs: data.typeLs
    }
  })
}

// 写入设备
export function writeDevice(data) {
  return request({
    url: '/opc/writeDeviceMsg',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      tunnelId: data.tunnelId,
      deviceIds: data.deviceIds,
      writeVal: data.writeVal,
      lampNumber: data.lampNumber
    }
  })
}

// 批量写入设备
export function writeDeviceMuch(data) {
  return request({
    url: '/opc/batchWriteDeviceMsg',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      tunnelId: data.tunnelId,
      list: data.list
    }
  })
}

// 确认当前隧道是几车道
export function tunListSelect(data) {
  return request({
    url: '/tunnel/tunListSelect',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      tunId: data.tunId
    }
  })
}

// 根据洞号查询设备信息
export function selectDevMsgByHoleLanes(data) {
  return request({
    url: '/dev/selectDevMsgByHoleLanes',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      tunId: data.tunId, // 隧道id
      typeLs: data.typeLs, // 设备类型
      tunHoleNo: data.tunHoleNo, // 洞号
      tunLanesNo: data.tunLanesNo // 车道号
    }
  })
}

