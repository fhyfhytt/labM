<template>
  <div class="blockMsg report">
    <el-row class="reportBtn">
      <div class="button-tool btn-all">
        <el-button size="small">导出</el-button>
        <el-button v-print="'#printDiv'" size="small">打印</el-button>
      </div>
      <el-row v-if="eventShow" id="printDiv">
        <el-table
          ref="multipleTable"
          height="622"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          class="tableShow"
        >
          <el-table-column
            width="55"
            label=""
            prop="name"
          />
          <el-table-column
            v-for="(item,index) in oneTitle"
            :key="index"
            :label="item.label"
            :prop="item.prop"
          />
          <!-- <el-table-column
            label="机动车行驶"
            prop="id"
          />
          <el-table-column
            label="行人事件"
            prop="id"
          />
          <el-table-column
            label="抛洒物事件"
            prop="id"
          />
          <el-table-column
            label="拥堵事件"
            prop="id"
          />
          <el-table-column
            label="逆行事件"
            prop="id"
          />
          <el-table-column
            label="机动车驶离事件"
            prop="id"
          />
          <el-table-column
            label="合计"
            prop="id"
          /> -->
        </el-table>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    eventShow: {
      type: Boolean,
      default: false
    },
    oneTitle: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  activated() {
  }
}
</script>
<style lang='scss' scoped>
  // @import "~@/styles/btn.scss";
  @import "~@/styles/message/baseBk.scss";
  .report{
      margin-top: 12px;
    .reportBtn{
        text-align: right;
        margin-top: 20px;
    }
  }
</style>
