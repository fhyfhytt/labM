<template>
  <el-dialog :title="titles" width="30%" :visible.sync="sureDioag" append-to-body class="typeInfoAdd outGoing">
    <div class="sureRemove"><i :class="iconfont" :style="svgStyle" />{{ msg }}</div>
    <div class="goOut">
      <!-- <span @click="sureClick">确认</span><span @click="confireClick">取消</span> -->

      <el-button size="small" class="btn btn-cancle" @click="confireClick">取消</el-button>
      <el-button size="small" class="btn btn-sure" type="primary" @click="sureClick">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    titles: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      required: true
    },
    iconfont: {
      type: String,
      default: ''
    },
    svgStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sureDioag: false
    }
  },
  methods: {
    sureClick() {
      this.sureDioag = false
      this.$store.dispatch('tagsView/delAllVisitedViews', '')
      this.$store.dispatch('user/logout')
    },
    confireClick() {
      this.sureDioag = false
    }
  }
}
</script>
<style lang='scss'>
// @import "~@/styles/manage.scss";

.typeInfoAdd {
  .el-dialog {
    border-radius: 8px;
  }

  .allSure {
    span {
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .sureRemove {
    font-size:24px;
    font-family:"PingFangSC-Medium,PingFang SC";
    font-weight:900;
    color:rgba(41,41,41,1);
    line-height:21px;
    text-align: center;
    margin: 38px;
    i{
      margin-right:16px;
      vertical-align: top;
    }
  }
}
.outGoing {
  .goOut {
    width: 100%;
    text-align: right;
    margin:20px 0 0 0;
  }
  .btn {
    width: 65px;
    letter-spacing: 5px;
  }
  .btn-sure{
    background:#5b92ff;
    border-radius:4px;
    font-size:14px;

  }
  .btn-sure:hover{
    opacity: 0.8;
  }
}
</style>
