import request from '@/utils/request'
// 角色管理  获取角色列表
export function getRoleList(data) {
  return request({
    url: '/role/getRoleList',
    method: 'post',
    data
  })
}
// 查询角色名称是否重复
export function searchRoleName(data) {
  return request({
    url: '/role/roleNameIsRepeat',
    method: 'post',
    data
  })
}
// 角色管理  添加角色
export function saveAddRole(data) {
  return request({
    url: '/role/saveRoleAll',
    method: 'post',
    data
  })
}
// 角色管理  修改角色
export function saveRole(data) {
  return request({
    url: '/role/editRoleAll',
    method: 'post',
    data
  })
}
// 角色管理  角色删除
export function deleteRole(data) {
  return request({
    url: '/role/deleteRole',
    method: 'post',
    data
  })
}
// 查询角色权限
export function getRolePermission(data) {
  return request({
    url: 'role/queryMenuByRoleId',
    method: 'post',
    data
  })
}
// 保存角色权限
export function saveRolePermission(data) {
  return request({
    url: '/role/saveResources',
    method: 'post',
    data
  })
}
// 根据角色ID查询用户
export function getRoleUsers(data) {
  return request({
    url: '/role/getUserByRoleId',
    method: 'post',
    data
  })
}
// 查询想要添加的人员
export function searchRoleUsers(data) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data
  })
}
// 根据角色ID保存用户信息
export function saveRoleUsers(data) {
  return request({
    url: '/role/saveUserListByRoleId',
    method: 'post',
    data
  })
}
// 根据角色ID删除用户
export function delRoleUsers(data) {
  return request({
    url: '/role/deleteUserRoleByRoleIds',
    method: 'post',
    data
  })
}
// 环境监控 获取监控数据
export function getEnvironmentData(data) {
  return request({
    url: '/monitorController/selectList',
    method: 'post',
    data
  })
}
// 环境监控 获取用户隧道权限
export function getRoleTunIds(data) {
  return request({
    url: '/user/selectUserAuthorization',
    method: 'post',
    data
  })
}
// 环境监控 添加监控数据

// 环境监控 删除监控数据

// 环境监控 查询报警数据占比
export function getEnvironmentAllData(data) {
  return request({
    url: '/monitorController/selectChart',
    method: 'post',
    data
  })
}

// 环境监控 查询报警指标数据
export function getEnvironmentTargetData(data) {
  return request({
    url: '/dev/selectDevThr',
    method: 'post',
    data
  })
}
