const state = {
  conForm: '', // 施工管理查询条件
  divideForm: '', // 封道管理查询条件
  trafficForm: '', // 交通管制管理查询条件
  spoilForm: '', // 抛洒物管理查询条件

  conRegistion: '', // 施工开单信息
  divideRegistion: '', // 封道开单信息
  trafficRegistion: '', // 交通管制开单信息
  spoilRegistion: '', // 抛洒物开单信息

  conDetail: '', // 施工详情页新建信息
  divideDetail: '', // 封道详情页新建信息
  trafficDetail: '', // 交通管制详情页新建信息
  spoilDetail: '' // 抛洒物详情页新建信息
}

const mutations = {
  SET_CON_FORM: (state, data) => {
    state.conForm = data
  },
  DEL_CON_FORM: state => {
    state.conForm = ''
  },
  SET_DIVIDE_FORM: (state, data) => {
    state.divideForm = data
  },
  DEL_DIVIDE_FORM: state => {
    state.divideForm = ''
  },
  SET_TRAFFIC_FORM: (state, data) => {
    state.trafficForm = data
  },
  DEL_TRAFFIC_FORM: state => {
    state.trafficForm = ''
  },
  SET_SPOIL_FORM: (state, data) => {
    state.spoilForm = data
  },
  DEL_SPOIL_FORM: state => {
    state.spoilForm = ''
  },

  SET_CON_REGISTION: (state, data) => {
    state.conRegistion = data
  },
  DEL_CON_REGISTION: state => {
    state.conRegistion = ''
  },
  SET_DIVIDE_REGISTION: (state, data) => {
    state.divideRegistion = data
  },
  DEL_DIVIDE_REGISTION: state => {
    state.divideRegistion = ''
  },
  SET_TRAFFIC_REGISTION: (state, data) => {
    state.trafficRegistion = data
  },
  DEL_TRAFFIC_REGISTION: state => {
    state.trafficRegistion = ''
  },
  SET_SPOIL_REGISTION: (state, data) => {
    state.spoilRegistion = data
  },
  DEL_SPOIL_REGISTION: state => {
    state.spoilRegistion = ''
  },

  SET_CON_DETAIL: (state, data) => {
    state.conDetail = data
  },
  DEL_CON_DETAIL: state => {
    state.conDetail = ''
  },
  SET_DIVIDE_DETAIL: (state, data) => {
    state.divideDetail = data
  },
  DEL_DIVIDE_DETAIL: state => {
    state.divideDetail = ''
  },
  SET_TRAFFIC_DETAIL: (state, data) => {
    state.trafficDetail = data
  },
  DEL_TRAFFIC_DETAIL: state => {
    state.trafficDetail = ''
  },
  SET_SPOIL_DETAIL: (state, data) => {
    state.spoilDetail = data
  },
  DEL_SPOIL_DETAIL: state => {
    state.spoilDetail = ''
  }
}

const actions = {
  setConForm: ({
    commit
  }, data) => {
    commit('SET_CON_FORM', data)
  },
  delConForm: ({
    commit
  }) => {
    commit('DEL_CON_FORM')
  },
  setDivideForm: ({
    commit
  }, data) => {
    commit('SET_DIVIDE_FORM', data)
  },
  delDivideForm: ({
    commit
  }) => {
    commit('DEL_DIVIDE_FORM')
  },
  setTrafficForm: ({
    commit
  }, data) => {
    commit('SET_TRAFFIC_FORM', data)
  },
  delTrafficForm: ({
    commit
  }) => {
    commit('DEL_TRAFFIC_FORM')
  },
  setSpoilForm: ({
    commit
  }, data) => {
    commit('SET_SPOIL_FORM', data)
  },
  delSpoilForm: ({
    commit
  }) => {
    commit('DEL_SPOIL_FORM')
  },

  setConRegistion: ({
    commit
  }, data) => {
    commit('SET_CON_REGISTION', data)
  },
  delConRegistion: ({
    commit
  }) => {
    commit('DEL_CON_REGISTION')
  },
  setDivideRegistion: ({
    commit
  }, data) => {
    commit('SET_DIVIDE_REGISTION', data)
  },
  delDivideRegistion: ({
    commit
  }) => {
    commit('DEL_DIVIDE_REGISTION')
  },
  setTrafficRegistion: ({
    commit
  }, data) => {
    commit('SET_TRAFFIC_REGISTION', data)
  },
  delTrafficRegistion: ({
    commit
  }) => {
    commit('DEL_TRAFFIC_REGISTION')
  },
  setSpoilRegistion: ({
    commit
  }, data) => {
    commit('SET_SPOIL_REGISTION', data)
  },
  delSpoilRegistion: ({
    commit
  }) => {
    commit('DEL_SPOIL_REGISTION')
  },

  setConDetail: ({
    commit
  }, data) => {
    commit('SET_CON_DETAIL', data)
  },
  delConDetail: ({
    commit
  }) => {
    commit('DEL_CON_DETAIL')
  },
  setDivideDetail: ({
    commit
  }, data) => {
    commit('SET_DIVIDE_DETAIL', data)
  },
  delDivideDetail: ({
    commit
  }) => {
    commit('DEL_DIVIDE_DETAIL')
  },
  setTrafficDetail: ({
    commit
  }, data) => {
    commit('SET_TRAFFIC_DETAIL', data)
  },
  delTrafficDetail: ({
    commit
  }) => {
    commit('DEL_TRAFFIC_DETAIL')
  },
  setSpoilDetail: ({
    commit
  }, data) => {
    commit('SET_SPOIL_DETAIL', data)
  },
  delSpoilDetail: ({
    commit
  }) => {
    commit('DEL_SPOIL_DETAIL')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
