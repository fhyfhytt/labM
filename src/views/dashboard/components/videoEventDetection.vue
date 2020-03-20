<template>
  <div class="videoEventDetection">
    <headers :post-name="postName" @getMores="getMores" />
    <block :block-data="blockData" />
    <dataList v-if="showVideo" :data-list="dataList" />
    <numList v-if="showVideo" :num-lengths="numLengths" />
    <div v-if="!showVideo" class="noData">
      暂无数据
    </div>
  </div>
</template>
<script>
import headers from './header'
import block from './block'
import dataList from './dataList'
import numList from './numList'

export default {
  name: 'FireDataAlarm',
  components: { headers, dataList, numList, block },
  data() {
    return {
      postName: {
        msg: '视频事件报警',
        isRefersh: false,
        isToggle: false,
        isMore: true
      },
      numLengths: 100,
      dataList: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': 'CO-VI报' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': 'CO-VI报' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': '风速风向报警' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': 'CO-VI报' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': '烟雾报警' }],
      blockData: [{ 'color': '#e74034', 'name': '事件总数', 'length': 0 },
        { 'color': '#e74034', 'name': '机动车停止', 'length': 0 },
        { 'color': '#6852b2', 'name': '行人事件', 'length': 0 },
        { 'color': '#ff9000', 'name': '抛洒物事件', 'length': 0 },
        { 'color': '#00a4ec', 'name': '拥堵事件', 'length': 0 },
        { 'color': '#00a4ec', 'name': '逆行事件', 'length': 0 },
        { 'color': '#00a4ec', 'name': '机动车驶离', 'length': 0 }],
      showVideo: false
    }
  },
  activated() {
  },
  methods: {
    getMores() {
      const querys = {
        time: '7'
      }
      this.$router.push({ path: '/event/management/search', query: querys })
    }
  }
}
</script>
<style lang='scss' scoped>
      .videoEventDetection{
        .noData{
          align-items: center;
          display: flex;
          font-size: 14px;
          height: 166px;
          justify-content: center;
        }
      }
</style>
