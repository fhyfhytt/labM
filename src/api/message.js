import request from '@/utils/request'
// const querystring = require('querystring')
// 查询消息
export function getAllList(param) {
  return request({
    url: '/msg/queryByMsgSys',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'msId': param.msId,
      'pageNumber': param.pageNumber,
      'pageSize': param.pageSize,
      'state': param.status,
      'sortColumn': 'create_time',
      'sortOrder': 'desc',
      'startDate': param.startDate,
      'endDate': param.endDate,
      'typeL': param.typeL,
      'typeS': param.typeS,
      'isDelete': '0',
      'isPerson': param.isPerson
    }
  })
}
// 更改已读未读
export function checkStatus(id) {
  return request({
    url: '/msg/signReadByMsgId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      ids: id
    }
  })
}
// 消息详情
export function getContent(id) {
  return request({
    url: '/msg/queryByMsgId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      msId: id
    }
  })
}
// 消息删除
export function remove(id, isPerson) {
  return request({
    url: '/msg/deleteByMsgId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      ids: id,
      isPerson: isPerson
    }
  })
}
// 全部标为已读
export function allReads() {
  return request({
    url: '/msg/signAllMsgRead',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
    }
  })
}
// 消息数据域查询
export function searchReagn() {
  return request({
    url: '/common/queryAllSysUserRegion',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
    }
  })
}
// 根据数据域查询
export function searchUser(param) {
  return request({
    url: '/common/queryDeptAndUserByRegionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'suRegionList': param
    }
  })
}
// 新增修改消息
export function addMsg(param) {
  return request({
    url: '/msg/addOrUpdateMsgSys',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 附件上传
export function subFJ(myform) {
  return request({
    url: '/common/uploadFile',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: myform
  })
}
// 附件删除
export function removeFJ(param) {
  return request({
    url: '/common/delFile',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'id': param.id,
      'appendixPath': param.appendixPath
    }
  })
}
// 发布接口
export function sendCg(ids) {
  return request({
    url: '/msg/changeStateByMsgIds',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      ids: ids
    }
  })
}
// 文件下载
export function downloads(param) {
  return request({
    url: '/common/downloadFile',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'appendixName': param.appendixName,
      'appendixPath': param.appendixPath,
      'responseType': 'blob'
    }
  })
}
