const state = {
  assetsId: ''
}

const mutations = {
  changeAssetId: (state, id) => {
    state.assetsId = id
  }
}
export default {
  // namespaced: true,
  state,
  mutations
}
