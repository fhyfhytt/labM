<template>
  <div class="informationBoard">
    <headers :post-name="postName" @againTos="againTos" />
    <board v-if="showBoard" :table-data="tableData" />
    <numList v-show="showBoard" :num-lengths="numLengths" class="top" @pageChange="changeData" />
    <div v-if="!showBoard" class="noData">
      暂无数据
    </div>
  </div>
</template>
<script>
import headers from './header'
import numList from './numList'
import board from './information/board'
import { getBoard } from '@/api/dashboard'
export default {
  name: 'InformationBoard',
  components: { headers, numList, board },
  data() {
    return {
      postName: {
        msg: '情报板信息',
        isRefersh: true,
        isToggle: false,
        isMore: false
      },
      numLengths: 82,
      pageSize: 1,
      tableData: [],
      showBoard: false
    }
  },
  activated() {
  },
  beforeMount() {
    this.getBoards()
  },
  methods: {
    changeData(val) {
      this.pageSize = val
      this.getBoards()
    },
    againTos() {
      this.tableData = []
      this.showBoard = false
      this.getBoards()
    },
    getBoards() {
      getBoard(this.pageSize).then(res => {
        // console.log(res)
        this.tableData = res.data.rows
        this.numLengths = res.data.totalCount
        if (!this.numLengths) {
          this.showBoard = false
          return
        }
        if (this.numLengths === 0) {
          this.showBoard = false
        } else {
          this.showBoard = true
        }
      }).catch(res => {

      })
    }
  }
}
</script>
<style lang='scss' scoped>
    .informationBoard{
      height: 682px;
      .noData{
        align-items: center;
        display: flex;
        font-size: 14px;
        height: 642px;
        justify-content: center;
      }
    }
</style>
