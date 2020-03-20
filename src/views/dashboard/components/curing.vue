<template>
  <div class="curing">
    <headers :post-name="postName" />
    <cur v-if="searchData" :cur-list="curList" />
    <div v-else class="noData">
      暂无数据
    </div>
    <numList v-if="searchData" :num-lengths="numLengths" @pageChange="changeData" />
  </div>
</template>
<script>
import headers from './header'
import cur from './curing/cur'
import numList from './numList'
import { getSummary } from '@/api/dashboard'

export default {
  name: 'Curing',
  components: { headers, cur, numList },
  data() {
    return {
      postName: {
        msg: '隧道养护计划',
        isRefersh: false,
        isToggle: false,
        isMore: true
      },
      numLengths: 1,
      curList: [],
      searchData: true,
      pageSize: 1
    }
  },
  activated() {
  },
  created() {
    this.getSummarys()
  },
  methods: {
    changeData(val) {
      this.pageSize = val
      getSummary(val).then(res => {
        this.curList = res.data.responses
      })
    },
    getSummarys() {
      getSummary(this.pageSize).then(res => {
        this.curList = res.data.responses
        this.numLengths = Math.ceil(res.data.totalCount / 8) * 10
        if (this.numLengths === 0 || isNaN(this.numLengths)) {
          // this.numLengths === 10
        }
        if (res.code === 10007 || res.code === 10010) {
          this.searchData = false
        }
      }).catch(res => {
        this.searchData = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
    .curing{
        margin-bottom: 20px;
        min-height:290px!important;
         .noData{
            align-items: center;
            display: flex;
            font-size: 14px;
            height: 248px;
            justify-content: center;
          }
    }
</style>
