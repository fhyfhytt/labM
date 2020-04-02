<template>
  <div>
    <div class="confirm"><i class="el-icon-warning" style="color:#FFAA00;font-size:25px;margin-right:10px;" />{{ title }}</div>
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
    },
    title: {
      type: String,
      default: '确认删除？'
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
<style lang='scss' scoped>
// @import "~@/styles/btn.scss";
.baseMove {

  .el-dialog__title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 34px;
  }
  .bkb {
    height: 1px;
    width: 90%;
    margin: -1px auto 0;
    background: radial-gradient(#53e3fd 20%, transparent 80%);
  }

  .el-select.el-select--medium,
  .el-form-item--medium .el-form-item__content {
    width: 150px;
  }
  .el-input__inner,
  .el-input.is-disabled .el-input__inner {
    background: transparent !important;
    // color: #fff!important;
    border-color: #379efc !important;
  }
  .el-form-item.el-form-item--medium {
    margin: 30px 0 30px 60px;
  }
  .confirm {
    height: 48px;
    font-size: 16px;
    color: #292929;
    text-align: center;
    margin: 20px 30px 50px;
    i {
      margin-right: 16px;
      vertical-align: -4px;
    }
  }
  .sureBtn {
    text-align: right;
  }

  .el-dialog__headerbtn {
    &:active {
      outline: none;
    }
  }
  // 新增style zhz
  .el-dialog {
    width: 20%;
  }
}
</style>
