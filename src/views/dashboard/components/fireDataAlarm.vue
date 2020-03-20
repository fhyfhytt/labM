<template>
  <div class="fireDataAlarm">
    <headers :post-name="postName" />
    <block :block-data="blockData" />
    <dataList v-if="showFire" :data-list="dataList" />
    <numList v-if="showFire" :num-lengths="numLengths" @pageChange="pageChange" />
    <div v-if="!showFire" class="noData">
      暂无数据
    </div>
  </div>
</template>
<script>
import headers from './header'
import block from './block'
import dataList from './dataList'
import numList from './numList'
import { warningMsg } from '@/api/dashboard'

export default {
  name: 'FireDataAlarm',
  components: { headers, dataList, numList, block },
  data() {
    return {
      postName: {
        msg: '消防数据报警',
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
      blockData: [{ 'color': '#e74034', 'name': '报警总数', 'length': 0 },
        { 'color': '#e74034', 'name': '火灾手报报警', 'length': 0 },
        { 'color': '#6852b2', 'name': '烟感报警', 'length': 0 },
        { 'color': '#ff9000', 'name': '感温光纤报警', 'length': 0 },
        { 'color': '#00a4ec', 'name': '水位报警', 'length': 0 }],
      showFire: false,
      pageParams: {
        'types': ['1'],
        'pageNumber': 1,
        'pageSize': 5 }
    }
  },
  activated() {
  },
  beforeMount() {
    this.getList()
  },
  methods: {
    pageChange(val) {
      this.pageParams.pageNumber = val
      this.getList()
    },
    getList() {
      warningMsg(this.pageParams).then(res => {
        if (!res.success) {
          // this.$message.error(res.msg)
          return
        }
        const fcTotalCount = res.data.fcTotalCount
        const spdCount = res.data.spdCount
        this.numLengths = Math.ceil(fcTotalCount / 5) * 10
        this.blockData[0].length = fcTotalCount
        this.blockData[4].length = spdCount
        this.dataList = res.data.fcWarnInfoResponse.map(item => {
          if (item.typeS === '311' || item.typeS === '312' || item.typeS === '313') {
            item.topic = '水位报警'
            item.memo = item.tunName + '水位当前高于安全阀值，请及时处理。'
          }
          return item
        })
        if (this.dataList.length > 0) {
          this.showFire = true
        }
      }).catch(res => {

      })
    }
  }
}
</script>
<style lang='scss' scoped>
    .fireDataAlarm{
        margin-bottom: 20px;
        .noData{
          align-items: center;
          display: flex;
          font-size: 14px;
          height: 166px;
          justify-content: center;
        }
    }
</style>
