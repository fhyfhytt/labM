import store from '@/store'
function hasPermission(roles, key) {
  if (roles !== undefined || roles.length > 0) {
    if (key) {
      return roles.some(role => { role.includes(key) })
    } else {
      return false
    }
  } else {
    return false
  }
}
export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.rolesIds
    const superman = store.getters && store.getters.superman
    if (superman !== '1') {
      if (value && typeof value === 'string' && value !== '' && value !== null) {
        const permissionRoles = value
        if (!hasPermission(roles, permissionRoles)) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error('没有权限')
      }
    } else {
      // console.log('superMan')
    }
  }
}
