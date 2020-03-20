import request from '@/utils/request'
// const querystring = require('querystring')
// querystring.stringify
// 登录存session
export function getSession() {
  return request({
    url: '/user/selectUserAuthorization',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'selectAllFlag': '1'
    }
  })
}

// 查询隧道
export function getTunList(param) {
  return request({
    url: '/tunnel/tunListSelect',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      pageNumber: param.pageNumber,
      pageSize: param.pageSize,
      sortColumn: param.sortColumn,
      sortOrder: param.sortOrder
    }
  })
}

// 查询交通事件
// 施工
export function getConstruction() {
  return request({
    url: '/event/queryByTunConstrucIndex',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
    }
  })
}
// 封道
export function getDivide(data) {
  return request({
    url: '/event/queryByTunDivideIndex',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
    }
  })
}
// 交通管制
export function getTrafficControl(data) {
  return request({
    url: '/event/queryByTunTrafficControlIndex',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
    }
  })
}

// 情报板
export function getBoard(pageNumber) {
  return request({
    url: '/dev/cmsListSelectForIndex',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'typeLs': ['131', '132', '133'],
      'pageNumber': pageNumber,
      'pageSize': 10,
      'sortColumn': 'create_time',
      'sortOrder': 'asc'
    }
  })
}
// 车流量车速
export function getCar() {
  return request({
    url: '/dev/selectIndexVdQuantityAndSpeed',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
    }
  })
}
// 系统公告
export function getMsgSystem(param) {
  return request({
    url: '/msg/queryByMsgSysIndex',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      typeL: param.typeL,
      status: ['1'],
      ifpublic: '1',
      startDate: param.startDate
    }
  })
}
// 隧道养护计划
export function getSummary(page) {
  return request({
    url: '/event/queryByTunMaintainSummaryIndex',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    // data: {
    //   'pageNumber': 1,
    //   'pageSize': 8,
    //   'sortColumn': 'create_time',
    //   'sortOrder': 'asc'
    // }
    data: {
      pageNumber: page,
      pageSize: 8,
      sortColumn: 'start_time',
      sortOrder: 'asc'
    }
  })
}
// 快捷方式
export function getShort() {
  return request({
    url: '/user/selectUserAuthorization',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'authTypes': ['3'],
      'selectAllFlag': '1'
    }
  })
}
// 快捷方式保存
export function setShort(param) {
  return request({
    url: '/user/userMemoryEdit',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'userId': param.userId,
      'shortcutId': param.shortcutId,
      'warnType': param.warnType// 报警类型
    }
  })
}
// 情报板信息
export function getInfoBoard(id) {
  return request({
    url: '/dev/selectCmsByStandard',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      id: id
    }
  })
}
// 根据内容或者信息类型查询信息
export function getSearchInfo(param) {
  return request({
    url: '/dev/selectCmsInfoByContentOrType',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'flag': param.flag,
      'standard': param.standard,
      'cmsTypeId': param.id,
      'content': param.content
    }
  })
}
// 信息类别
export function getInfoType() {
  return request({
    url: '/dev/selectAllCmsInfoType',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
    }
  })
}
// 设备详细信息查询
export function getDevName(id) {
  return request({
    url: '/dev/selectDevInfoById',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'id': id
    }
  })
}
// 情报板发送
export function msgSend(param) {
  return request({
    url: '/dev/sendCmsMessage',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'devIds': param.devIds,
      'infoIds': param.infoIds,
      'delay': param.delay,
      'speed': param.speed,
      'source': param.source,
      'sendUser': param.sendUser
    }
  })
}
// 情报板编辑保存
export function msgSave(param) {
  return request({
    url: '/dev/saveCmsInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'typeId': param.typeId,
      'standard': param.standard,
      'display': param.display,
      'fontType': param.fontType,
      'fontColor': param.fontColor,
      'fontSize': param.fontSize,
      'imageCode': param.imageCode
    }
  })
}
// 信息类型查询
export function searchTypeInfo(param) {
  return request({
    url: '/dev/selectCmsInfoByPage',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'pageSize': param.pageSize,
      'pageNumber': param.pageNumber,
      'sortColumn': 'content',
      'sortOrder': 'asc',
      'id': param.id,
      'standard': param.standard
    }
  })
}
// 全部信息查询
export function searchAllType(num) {
  return request({
    url: '/dev/selectAllCmsInfoTypeByPage',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'pageSize': 4,
      'pageNumber': num,
      'sortColumn': '',
      'sortOrder': 'asc'
    }
  })
}
// 信息类别删除
export function removeInfo(param) {
  return request({
    url: '/dev/delCmsInfoBatch',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'ids': param
    }
  })
}
// 信息类别修改
export function changeInfo(param) {
  return request({
    url: '/dev/updateCmsInfoBatch',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'typeId': param.typeId,
      'ids': param.ids
    }
  })
}
// 信息类别管理删除

export function removeType(param) {
  return request({
    url: '/dev/delCmsTypeInfoBatch',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'ids': param
    }
  })
}
// 信息类别管理新增
export function addType(param) {
  return request({
    url: '/dev/saveCmsTypeInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'content': param
    }
  })
}
// 信息类别管理修改
export function changeType(param) {
  return request({
    url: '/dev/updateCmsTypeInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'content': param.content,
      'id': param.id
    }
  })
}
// 情报板实时信息查询
export function readyMsg(param) {
  return request({
    url: '/dev/selectCurCms',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'id': param
    }
  })
}
// 告警通用消息
export function warningMsg(param) {
  return request({
    url: '/common/indexWarnCountSelect',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'types': param.types,
      'pageNumber': param.pageNumber,
      'pageSize': param.pageSize
    }
  })
}

// 首页修改用户存储信息
export function remeberUser(param) {
  return request({
    url: '/user/userMemoryEdit',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'userId': param.userId,
      'shortcutId': param.shortcutId,
      'warnType': param.warnType
    }
  })
}
