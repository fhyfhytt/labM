<template>
  <div class="block numList">
    <el-pagination
      layout="prev, pager, next"
      :total="numLengths"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: 'NumList',
  props: {
    numLengths: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    }
  },
  activated() {
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('pageChange', val)
    }
  }
}
</script>
<style lang='scss'>
    .numList{
        text-align: center;
        font-size: 14px;
        .el-pagination button:disabled{
            color: #C0C4CC;
            background-color: transparent;
            cursor: not-allowed;
        }
        .el-pager li{
            background: transparent;
            color:#fff;
        }
        .el-pager li.active{
            color: #379EFC;
        }
        .el-pagination .btn-prev, .el-pagination .btn-next{
            background: transparent;
            color: #fff;
        }
    }
</style>
