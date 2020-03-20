import { login, getInfo, logout } from '@/api/user'
import { getAvatar, setAvatar, getToken, setToken, removeToken, setUserName, getUserName, getUserId, setUserId } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import global from '@/base.vue'
const state = {
  token: getToken(),
  name: getUserName(),
  avatar: getAvatar(),
  introduction: '',
  roles: [],
  userId: getUserId(),
  superman: 0,
  WS_URL: global.WS_URL, // websockedurl
  BASE_URL: global.BASE_URL, // 设置全局 URL
  BASE_NGINX_URL: global.BASE_NGINX_URL, // 静态服务器资源
  rolesIds: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles.roles
  },
  SET_TREESHOW: (state, treeShow) => {
    state.treeShow = treeShow
  },
  SET_TREEDATA: (state, treeData) => {
    state.treeData = treeData
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  allDatas: (state, ids) => {
    state.allData = ids
  },
  SET_SUPERMEN: (state, superman) => {
    state.superman = superman
  }, SET_ROLESIDS: (state, rolesIds) => {
    state.rolesIds = rolesIds
  }

}

const actions = {
  // 隧道树是否展示
  showTree({ commit }, show) {
    commit('SET_TREESHOW', show)
  },
  // 隧道树的数据
  initTreeData({ commit }, treeData) {
    commit('SET_TREEDATA', treeData)
  },

  // user login
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        userName: userName.trim(),
        password: password.trim()
      })
        .then(response => {
          const { data } = response
          // 将改变的状态提交给mutations，如果直接改变的话就没办法监听数据响应式的变化了
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.userName)
          commit('SET_USERID', data.userId)
          // commit('SET_AVATAR', data.avatar)
          // setAvatar(data.avatar)
          setToken(data.token)
          setUserName(data.userName)
          setUserId(data.userId)
          // 将状态由待处理改变为已处理，若不执行会一直停留在prepareding
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({
        userId: state.userId,
        menuType: '0'
      }).then(response => {
        const { data } = response
        if (response.code !== 0) {
          reject(response.msg)
        }
        const roles = data.menuKeyList
        const roleIds = data.roleIds
        const superman = data.superman
        // roles must be a non-empty array
        if (!roleIds || roleIds.length <= 0) {
          reject('角色无权限!')
        }
        if (state.avatar === '' || state.avatar !== data.avatar) {
          setAvatar(data.avatar)
          commit('SET_AVATAR', data.avatar)
        }
        commit('SET_ROLESIDS', roleIds)
        commit('SET_SUPERMEN', superman)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        location.reload()
        resolve()
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
