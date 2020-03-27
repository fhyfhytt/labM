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

// 角色管理  获取角色列表
export function getRoleList(param) {
  return request({
    url: '/role/getRoleList',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 角色管理  角色删除
export function deleteRole(param) {
  return request({
    url: '/role/deleteRole',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理 用户列表查询
export function getUserList(param) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: Object.assign({ active: 1, available: 1 }, param)
  })
}

// 人员管理 重置密码
export function rsPassword(param) {
  return request({
    url: '/user/rsPassword',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理  用户删除
export function deleteSysUser(param) {
  return request({
    url: '/user/deleteSysUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理 新建  基本信息
// export function editAddSysUser(param) {
//   return request({
//     url: '/user/editSysUser',
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     data: param
//   })
// }

// 人员管理 根据用户ID查询所拥有的角色信息
export function selectRoleByUserId(param) {
  return request({
    url: '/user/selectRoleByUserId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理 根据用户ID查询所拥有的数据域信息
export function selectRegionByUserId(param) {
  return request({
    url: '/user/selectRegionByUserId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理  新增-新增人员接口保存
export function saveUserAll(param) {
  return request({
    url: '/user/saveUserAll',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理 新增-新增人员的时候判断用户名是否重复
export function userIsRepeat(param) {
  return request({
    url: '/user/userIsRepeat',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理  编辑-新增人员接口保存
export function editSysUser(param) {
  return request({
    url: '/user/editSysUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理 根据人员ID添加修改角色
export function saveUserRole(param) {
  return request({
    url: '/user/saveUserRole',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理 根据人员ID添加修改数据域
export function saveUserRegion(param) {
  return request({
    url: '/user/saveUserRegion',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 人员管理  新增每一步的保存
export function editUserAll(param) {
  return request({
    url: '/user/editUserAll',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理 数据域tree查询 -- change 0312
export function getRegionTree(param) {
  return request({
    url: '/region/queryAllRegion',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理 数据域tree查询 -- change 0312
export function getRegionChildren(param) {
  return request({
    url: '/region/queryAllChildrenByregionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理 数据域列表查询 -- change 0311
export function getRegionList(param) {
  return request({
    url: '/region/getRegionList',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 查询数据域是否重复 -- change 0311
export function searchRegion(data) {
  return request({
    url: '/region/regionIsRepeat',
    method: 'post',
    data
  })
}
// 数据域管理  数据域删除、批量删除
export function delRegion(param) {
  return request({
    url: '/region/delRegion',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理  新建数据域信息
export function addRegion(param) {
  return request({
    url: '/region/saveRegionAll',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 修改数据域 --change0311
export function editRegion(data) {
  return request({
    url: '/region/editRegionAll',
    method: 'post',
    data
  })
}
// 数据域管理  根据数据域ID查询所拥有的组织树接口 --change0311
// export function getRegionOrgTree(param) {
//   return request({
//     url: '/dept/queryAllDeptByRegionId',
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     data: param
//   })
// }

// 查询所有部门，并根据数据域id将包含的部门标记checked=1  --change0313
export function getDeptByRegionId(param) {
  return request({
    url: '/dept/queryDeptByRegionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 查询所有分类，并根据数据域id将包含的分类标记checked=1  --change0317
export function getClassifyByRegionId(param) {
  return request({
    url: '/classification/queryClassificationByRegionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 查询所有库房，并根据数据域id将包含的库房标记checked=1  --change0317
export function getHouseByRegionId(param) {
  return request({
    url: '/sysWarehouse/queryWarehouseByRegionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理  数据域组织树选择关系新增
export function regionOrgAdd(param) {
  return request({
    url: '/sysOrganization/regionOrgAdd',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理-根据数据域ID查询用户
export function getUserByRegionId(param) {
  return request({
    url: '/region/getUserByRegionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理-根据数据域ID删除用户
export function delUserByRegionId(param) {
  return request({
    url: '/region/delUserByRegionId',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 数据域管理-数据域新增人员选择新增
export function insertRegionUser(param) {
  return request({
    url: '/region/insertRegionUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 新增接口 0310

// 部门管理 -- tree树   -- 新增 0310
export function getOrgTreeNew(param) {
  return request({
    url: '/dept/queryDeptTree',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 部门管理 table表格通用查询  -- 新增 0310
export function getListSelectNew(param) {
  return request({
    url: '/dept/queryByDept',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 部门管理 管理中心维修新增/修改  -- 新增 0310
export function managementCenterEditNew(param) {
  return request({
    url: '/dept/AddOrUpdateDept',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 部门管理 删除通用接口  -- 新增 0310
export function conDeleteNew(param) {
  return request({
    url: '/dept/deleteByDept',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

