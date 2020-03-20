const state = {
  shortcuts: [], // 快捷方式存储
  warnType: [], // 报警方式存储信息
  boardId: '', // 当前情报板id
  standard_code: '', // 当前情报板规格
  devIds: [], // 所有选择的设备
  devInfoType: [], // 信息类型数据
  allTreeId: [], // 树所有的id
  boardInfo: [], // 情报板树的data
  deviceBoard: {}, // 设备详情
  soure: '监控中心',
  times: 5,
  speed: 0,
  user: 'admin', // 发布人员
  type: '立即显示',
  infoIds: [], // 信息类型id
  infoTypes: [], // 信息类别
  infoTypesNums: 1, // 信息类别分页数量
  numTop: 1, // 信息上方
  tableListTop: [], // 信息上方的table列表
  borderSendList: [], // 情报板发送后数据
  boardText: [], // 情报板显示数据
  warnOne: false, // 环境报警展示数据
  dataListOne: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' }],
  warnTwo: false, // 消防报警展示数据
  dataListTwo: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' }],
  warnThree: false, // 时间检测展示数据
  dataListThree: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '风速风向报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': 'CO-VI报' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' },
    { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'acquisitionTime': '2019-10-26 14:00', 'topic': '烟雾报警' }],
  allData: [],
  imgIdPath: {},
  fjIdPath: {},
  indexData: {}
}
// { 'color': '#fab045', 'iconName': 'iconk-shigong', 'iconNameC': '施工管理' }
const mutations = {
  addShorts: (state, shortcut) => {
    state.shortcuts = shortcut
  },
  changeBoardIDs: (state, id) => {
    state.boardId = id
  },
  changestandard_codes: (state, id) => {
    state.standard_code = id
  },
  setDevIds: (state, ids) => {
    state.devIds = ids
  },
  setdevInfoTypes: (state, ids) => {
    state.devInfoType = ids
  },
  setallTreeIds: (state, ids) => {
    state.allTreeId = ids
  },
  setBoardInfos: (state, ids) => {
    state.boardInfo = ids
  },
  setdeviceBoards: (state, ids) => {
    state.deviceBoard = ids
  },
  setdeviceSoures: (state, ids) => {
    state.soure = ids
  },
  setdeviceTimes: (state, ids) => {
    state.times = ids
  },
  setdeviceSpeeds: (state, ids) => {
    state.speed = ids
  },
  setdeviceUsers: (state, ids) => {
    state.user = ids
  },
  setdeviceInfoIds: (state, ids) => {
    state.infoIds = ids
  },
  setinfoTypes: (state, ids) => {
    state.infoTypes = ids
  },
  setinfoTypesNums: (state, ids) => {
    state.infoTypesNums = ids
  },
  setnumTops: (state, ids) => {
    state.numTop = ids
  },
  tableListTops: (state, ids) => {
    state.tableListTop = ids
  },
  borderSendLists: (state, ids) => {
    state.borderSendList = ids
  },
  boardTexts: (state, ids) => {
    state.boardText = ids
  },
  warnTypes: (state, ids) => {
    state.warnType = ids
  },
  setWarnOnes: (state, ids) => {
    state.warnOne = ids
  },
  setWarnTwos: (state, ids) => {
    state.warnTwo = ids
  },
  setWarnThrees: (state, ids) => {
    state.warnThree = ids
  },
  dataListOnes: (state, ids) => {
    state.dataListOne = ids
  },
  dataListTwos: (state, ids) => {
    state.dataListTwo = ids
  },
  dataListThrees: (state, ids) => {
    state.dataListThree = ids
  },
  allDatas: (state, ids) => {
    state.allData = ids
  },
  imgIdPaths: (state, ids) => {
    state.imgIdPath = ids
  },
  fjIdPaths: (state, ids) => {
    state.fjIdPath = ids
  },
  indexDatas: (state, ids) => {
    state.indexData = ids
  }
}
const actions = {
  addshort({ commit }, short) {
    commit('addShorts', short)
  },
  changeBoardID({ commit }, id) {
    commit('changeBoardIDs', id)
  },
  changestandard_code({ commit }, id) {
    commit('changestandard_codes', id)
  },
  setDevId: ({ commit }, ids) => {
    commit('setDevIds', ids)
  },
  setdevInfoType: ({ commit }, ids) => {
    commit('setdevInfoTypes', ids)
  },
  setallTreeId: ({ commit }, ids) => {
    commit('setallTreeIds', ids)
  },
  setBoardInfo: ({ commit }, ids) => {
    commit('setBoardInfos', ids)
  },
  setdeviceBoard: ({ commit }, ids) => {
    commit('setdeviceBoards', ids)
  },
  setdeviceSoure: ({ commit }, ids) => {
    commit('setdeviceSoures', ids)
  },
  setdeviceTime: ({ commit }, ids) => {
    commit('setdeviceTimes', ids)
  },
  setdeviceSpeed: ({ commit }, ids) => {
    commit('setdeviceSpeeds', ids)
  },
  setdeviceUser: ({ commit }, ids) => {
    commit('setdeviceUsers', ids)
  },
  setdeviceInfoId: ({ commit }, ids) => {
    commit('setdeviceInfoIds', ids)
  },
  setinfoType: ({ commit }, ids) => {
    commit('setinfoTypes', ids)
  },
  setinfoTypesNum: ({ commit }, ids) => {
    commit('setinfoTypesNums', ids)
  },
  setsetnumTop: ({ commit }, ids) => {
    commit('setsetnumTops', ids)
  },
  tableListTop: ({ commit }, ids) => {
    commit('tableListTops', ids)
  },
  borderSendList: ({ commit }, ids) => {
    commit('borderSendLists', ids)
  },
  boardText: ({ commit }, ids) => {
    commit('boardTexts', ids)
  },
  warnType: ({ commit }, ids) => {
    commit('warnTypes', ids)
  },
  setWarnOne: ({ commit }, ids) => {
    commit('setWarnOnes', ids)
  },
  setWarnTwo: ({ commit }, ids) => {
    commit('setWarnTwos', ids)
  },
  setWarnThree: ({ commit }, ids) => {
    commit('setWarnThrees', ids)
  },
  dataListOne: ({ commit }, ids) => {
    commit('dataListOnes', ids)
  },
  dataListTwo: ({ commit }, ids) => {
    commit('dataListTwos', ids)
  },
  dataListThree: ({ commit }, ids) => {
    commit('dataListThree', ids)
  },
  allData: ({ commit }, ids) => {
    commit('allDatas', ids)
  },
  imgIdPath: ({ commit }, ids) => {
    commit('imgIdPaths', ids)
  },
  fjIdPath: ({ commit }, ids) => {
    commit('fjIdPaths', ids)
  },
  indexData: ({ commit }, ids) => {
    commit('indexDatas', ids)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

