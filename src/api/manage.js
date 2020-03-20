import request from '@/utils/request'
// 组织管理 组织管理tree树
export function getOrgTree() {
  return request({
    url: '/sysOrganization/getOrgTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  })
}

// 组织管理 table表格通用查询
export function getListSelect(param) {
  return request({
    url: '/sysOrganization/orgListSelect',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      id: param.id,
      type: param.type,
      pageNumber: param.pageNumber,
      pageSize: param.pageSize
    }
  })
}
// 组织管理 单个表格查询
export function getorgSelectOne(param) {
  return request({
    url: '/sysOrganization/orgSelectOne',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      id: param.id,
      type: param.type
    }
  })
}
// 组织管理 管理中心维修新增/修改
export function managementCenterEdit(param) {
  return request({
    url: '/sysOrganization/managementCenterEdit',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 组织管理 部门维修新增 / 修改
export function deptInfoEdit(param) {
  return request({
    url: '/sysOrganization/deptInfoEdit',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 组织管理 班组新增/修改
export function groupEdit(param) {
  return request({
    url: '/sysOrganization/groupEdit',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 组织管理 单位新增/修改
export function sysUnitsEdit(param) {
  return request({
    url: '/sysOrganization/sysUnitsEdit',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 组织管理 删除通用接口
export function conDelete(param) {
  return request({
    url: '/common/conDelete',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 新增接口 0310
// 组织管理 -- tree树
export function getOrgTreeNew() {
  return request({
    url: '/dept/queryDeptTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  })
}

// 部门管理 table表格通用查询
export function getListSelectNew(param) {
  return request({
    url: '/dept/queryByDept',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 部门管理 新增/修改
export function managementCenterEditNew(param) {
  return request({
    url: '/dept/AddOrUpdateDept',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 部门管理 删除通用接口
export function conDeleteNew(param) {
  return request({
    url: '/dept/deleteByDept',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
