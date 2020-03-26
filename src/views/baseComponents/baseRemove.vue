<template>
  <div>
    <div class="sureRemove">确认删除？</div>
    <div class="sureBtn">
      <el-button size="small" class="button-cancel" @click="closeRemove">取消</el-button>
      <el-button size="small" class="button-sub" @click="sureRemove">确认</el-button>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    moveShow: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
    }
  },
  activated() {
  },
  methods: {
    sureRemove() {
      this.$emit('sureMsg', false)
    },
    closeRemove() {
      this.$emit('confireMsg', false)
    }
  }
}
</script>
<style lang='scss'>
  // @import "~@/styles/btn.scss";
.baseMove{
  .el-dialog__title{
    color: #5B92FF;
    font-size: 16px;
    line-height: 34px;
  }
    .bkb{
        height: 1px;
        width: 90%;
        margin: -1px auto 0;
        // background: radial-gradient(#53e3fd 20%, transparent 80%);
    }
  // .el-dialog__header{
  //       background: linear-gradient(to bottom, rgba(83,227,253,1) 0%, rgba(83,227,253,0.0) 100%)!important;
  // }
    .el-select.el-select--medium,.el-form-item--medium .el-form-item__content{
        width: 150px;
    }
    .el-input__inner,.el-input.is-disabled .el-input__inner{
        background: transparent!important;
        border-color: #5B92FF!important;
    }
    .el-form-item.el-form-item--medium{
        margin: 30px 0 30px 60px;
    }
    .sureRemove{
        font-size: 20px;
        text-align: center;
        margin: 38px
    }
    .sureBtn{
      text-align: right;

    }

    .el-dialog__headerbtn{
      top: 0!important;
      &:active{
        outline: none
      }
    }
}
</style>
