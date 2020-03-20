<template>
  <div class="environmentDataAlarm">
    <headers :post-name="postName" />
    <block :block-data="blockData" />
    <dataList v-if="showEnviron" :data-list="dataList" />
    <numList v-if="showEnviron" :num-lengths="numLengths" @pageChange="pageChange" />
    <div v-if="!showEnviron" class="noData">
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
  name: 'EnvironmentDataAlarm',
  components: { headers, dataList, numList, block },
  data() {
    return {
      postName: {
        msg: '环境数据报警',
        isRefersh: false,
        isToggle: false,
        isMore: true
      },
      numLengths: 1,
      dataList: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': 'CO-VI报' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': 'CO-VI报' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': '风速风向报警' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': 'CO-VI报' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00', 'topic': '烟雾报警' }],
      blockData: [{ 'color': '#e74034', 'name': '报警总数', 'length': 0 },
        { 'color': '#e74034', 'name': 'CO-VI报警', 'length': 0 },
        { 'color': '#6852b2', 'name': '能见度报警', 'length': 0 },
        { 'color': '#ff9000', 'name': '风速风向报警', 'length': 0 },
        { 'color': '#00a4ec', 'name': '温湿度报警', 'length': 0 },
        { 'color': '#6852b2', 'name': '烟雾报警', 'length': 0 },
        { 'color': '#00a4ec', 'name': '有毒气体报警', 'length': 0 }],
      showEnviron: false,
      pageParams: {
        'types': ['0'],
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
        const coviCount = res.data.coviCount
        const enTotalCount = res.data.enTotalCount
        const vidCount = res.data.vidCount
        const wsdCount = res.data.wsdCount
        this.numLengths = Math.ceil(enTotalCount / 5) * 10
        this.blockData[0].length = enTotalCount
        this.blockData[1].length = coviCount
        this.blockData[2].length = vidCount
        this.blockData[3].length = wsdCount
        this.dataList = res.data.enWarnInfoResponse.map(item => {
          if (item.typeS === '720') {
            item.topic = 'CO-VI报警'
            item.memo = item.tunName + '当前CO值为' + item.coData + ',当前VI值为' + item.viData + ',高于安全阀值，请及时处理。'
          } else if (item.typeS === '218' || item.typeS === '219' || item.typeS === '220') {
            item.topic = '能见度报警'
            item.memo = item.tunName + '当前洞外能见度为' + item.lightOutIntensit + ',当前洞内能见度为' + item.lightInIntensit + ',高于安全阀值，请及时处理。'
          } else if (item.typeS === '730') {
            item.topic = '风速风向报警'
            item.memo = item.tunName + '当前风向为' + item.windDirection + ',当前风速为' + item.windSpeed + ',高于安全阀值，请及时处理。'
          }
          return item
        })
        if (this.dataList.length > 0) {
          this.showEnviron = true
        }
      }).catch(res => {

      })
    }
  }
}
</script>
<style lang='scss' scoped>
      .environmentDataAlarm{
        .noData{
          align-items: center;
          display: flex;
          font-size: 14px;
          height: 166px;
          justify-content: center;
        }
      }
</style>
