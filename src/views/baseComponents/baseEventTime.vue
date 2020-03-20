<template>
  <el-row class="blockMsg">
    <el-radio-group v-model="timeCheck" class="radio-style eventTime" @change="changeDay">
      <el-radio-button label="1" size="small">今天</el-radio-button>
      <el-radio-button label="30">最近一个月</el-radio-button>
      <el-radio-button label="360">最近一年</el-radio-button>
      <el-radio-button label="0">自定义</el-radio-button>
      <el-row v-if="showTime" class="timePe">
        <div class="block">
          <el-date-picker
            v-model="startMsgTime"
            type="date"
            placeholder="选择开始时间"
            prefix-icon="iconfont iconrili"
          />
        </div>
        <span class="toGo">至</span>
        <div class="block">
          <el-date-picker
            v-model="endMsgTime"
            type="date"
            placeholder="选择结束时间"
            prefix-icon="iconfont iconrili"
          />
        </div>
        <el-button size="small" class="button-sub searchs" @click="sureTime">确定</el-button>
      </el-row>
    </el-radio-group>
  </el-row>
</template>
<script>
import { getTime, checkTime } from '@/utils/time'
export default {
  data() {
    return {
      timeCheck: '1',
      startMsgTime: '',
      endMsgTime: '',
      showTime: false
    }
  },
  activated() {
  },
  methods: {
    sureTime() {
      if (this.startMsgTime === '') {
        this.$message.error('请选择开始时间')
        return
      }
      if (this.endMsgTime === '') {
        this.$message.error('请选择结束时间')
        return
      }
      var starts = getTime(this.startMsgTime)
      var ends = getTime(this.endMsgTime)
      var flag = checkTime(starts, ends)
      if (!flag) {
        this.$message.error('结束时间要大于开始时间')
        return
      }
      this.showTime = false
    },
    changeDay() {
      if (this.timeCheck === '0') {
        this.showTime = true
      } else {
        this.showTime = false
        this.$emit('changeDay', this.timeCheck)
      }
    }
  }
}
</script>
<style lang='scss'>
  // @import "~@/styles/btn.scss";
  @import "~@/styles/message/baseBk.scss";
  .searchs{
      margin-left: 20px;
  }
</style>
