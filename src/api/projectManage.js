import request from '@/utils/request'

// 施工管理列表信息查询
export function construnctionManageList(data) {
  return request({
    url: '/event/queryByTunConstruc',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'type': data.type,
      'pageSize': data.pageSize,
      'pageNumber': data.pageNumber,
      'status': data.status,
      'sortColumn': data.sortColumn,
      'sortOrder': data.sortOrder,
      'startTime': data.startTime,
      'endTime': data.endTime,
      'roadInfo': data.roadInfo,
      'timeType': data.timeType
    }
  })
}

// 封道管理列表信息查询
export function divideManageList(data) {
  return request({
    url: '/event/queryByTunDivide',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'type': data.type,
      'pageSize': data.pageSize,
      'pageNumber': data.pageNumber,
      'level': data.level,
      'sortColumn': data.sortColumn,
      'sortOrder': data.sortOrder,
      'startTime': data.startTime,
      'endTime': data.endTime,
      'roadInfo': data.roadInfo,
      'timeType': data.timeType
    }
  })
}

// 抛洒物管理列表信息查询
export function spoilManageList(data) {
  return request({
    url: '/event/queryByTunSpoilInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'type': data.type,
      'pageSize': data.pageSize,
      'pageNumber': data.pageNumber,
      'sortColumn': data.sortColumn,
      'sortOrder': data.sortOrder,
      'startTime': data.startTime,
      'endTime': data.endTime,
      'roadInfo': data.roadInfo,
      'timeType': data.timeType
    }
  })
}

// 交通管制管理列表信息查询
export function trafficManageList(data) {
  return request({
    url: '/event/queryByTunTrafficControl',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      'pageSize': data.pageSize,
      'pageNumber': data.pageNumber,
      'sortColumn': data.sortColumn,
      'sortOrder': data.sortOrder,
      'startTime': data.startTime,
      'endTime': data.endTime,
      'roadInfo': data.roadInfo,
      'status': data.status,
      'timeType': data.timeType
    }
  })
}

// 施工新增
export function constructionAdd(data) {
  return request({
    url: '/event/addOrUpdateTunConstruc',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

// 封道新增
export function divideAdd(data) {
  return request({
    url: '/event/addOrUpdateTunDivide',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

// 抛洒物新增
export function spoilAdd(data) {
  return request({
    url: '/event/addOrUpdateTunSpoilInfo',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

// 交通管制新增
export function trafficAdd(data) {
  return request({
    url: '/event/addOrUpdateTunTrafficControl',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

// 施工删除
export function constructionDel(data) {
  return request({
    url: '/event/deleteByTunConstrucId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 封道删除
export function divideDel(data) {
  return request({
    url: '/event/deleteByTunDivideId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 交通管制删除
export function trafficDel(data) {
  return request({
    url: '/event/deleteByTunTrafficControlId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 抛洒物删除
export function spoilDel(data) {
  return request({
    url: '/event/deleteByTunSpoilInfoId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 根据id查询单条施工数据
export function construnctionOne(data) {
  return request({
    url: '/event/queryByTunConstrucId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 根据id查询单条封道数据
export function divideOne(data) {
  return request({
    url: '/event/queryByTunDivideId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 根据id查询单条交通管制数据
export function trafficOne(data) {
  return request({
    url: '/event/queryByTunTrafficControlId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// 根据id查询单条抛洒物数据
export function spoilOne(data) {
  return request({
    url: '/event/queryByTunSpoilInfoId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// excel导入
export function excelImport(data) {
  return request({
    url: '/common/importFile',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
