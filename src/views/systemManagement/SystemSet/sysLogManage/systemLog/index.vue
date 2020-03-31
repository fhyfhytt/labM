<template>
  <div class="systemLog pageRow">
    <el-row class="btnGroup">
      <el-button type="primary" icon="el-icon-edit" class="btn" @click="refresh">刷新</el-button>
      <el-button type="primary" icon="el-icon-edit" class="btn" @click="exportLog">导出</el-button>
    </el-row>
    <el-row class="content page-table">
      <!-- <el-timeline-item :reverse="reverse"> -->
      <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" placement="top">
        <dot class="time">123</dot>
        {{ activity.content }}
      </el-timeline-item>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'SystemLog',
  components: {

  },
  data() {
    return {
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]

    }
  },
  computed: {

  },
  mounted: {

  },
  methods: {
    refresh() {

    },
    exportLog() {

    }
  }
}
</script>

<style scoped lang='scss'>
.systemLog {
  position: relative;
  .btnGroup {
    position: absolute;
    right:24px;
    top: 24px;
    z-index: 9;
    .btn {
      width: 80px;
      height: 32px;
      padding: 0;
      // line-height: 32px;
      box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.06);
      border-radius: 32px;
    }
  }
  .content{
    padding-top: 60px;
    padding-left: 232px;
    >>>.el-timeline-item__timestamp.is-top{
      position: absolute;
      left: -100px;
    }
  }
}
</style>
