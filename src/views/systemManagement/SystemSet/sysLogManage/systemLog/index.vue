<template>
  <div class="systemLog pageRow">
    <el-row class="btnGroup">
      <el-button type="primary" icon="el-icon-edit" class="btn" @click="refresh">刷新</el-button>
      <el-button type="primary" icon="el-icon-edit" class="btn" @click="exportLog">导出</el-button>
    </el-row>
    <el-row v-infinite-scroll="load" class="content page-table infinite-list">
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color">
          <div v-if="activity.timestamp" class="date">{{ activity.timestamp }}</div>
          <div class="time">{{ activity.time }}</div>
        </el-timeline-item>
      </el-timeline>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { systemLogList } from '@/api/systemLog'
export default {
  name: 'SystemLog',
  components: {

  },
  data() {
    return {
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15',
        time: '19:28:36'

      }, {
        content: '活动按期开始',
        timestamp: '',
        time: '19:28:36'

      }, {
        content: '通过审核',
        timestamp: '2018-04-13',
        time: '19:28:36'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11',
        color: '#379EFC',
        time: '19:28:36'
      }],
      loading: false,
      pageSize: 10,
      pageNumber: 0
    }
  },
  computed: {

  },
  mounted() {
    // this.getData()
  },
  methods: {
    getData() {
      const params = {
        'sortColumn': 'operate_time',
        'sortOrder': 'desc',
        'pageSize': this.pageSize,
        'pageNumber': this.pageNumber
      }
      systemLogList(params).then((res) => {
        if (res.code === 0) {
          this.$nextTick(() => {
            this.activities = res.data.list
          })
        }
      }).catch((res) => {
        this.loading = false
        this.$message.error(res.msg)
      })
    },
    load() {
      this.pageNumber += 1
      this.getData()
    },
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
    right: 24px;
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
  .content {
    padding: 32px 200px 32px 232px;
    overflow-y: auto;
    .el-timeline-item {
      height: 50px;
      font-weight: bold;
      >>> .el-timeline-item__timestamp.is-bottom {
        margin-top: 0;
      }
    }

    .date {
      position: absolute;
      left: -240px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 900;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #379efc;
      line-height: 24px;
      padding: 8px;
      color: #379efc;
      top: -11px;
    }
    .time {
      position: absolute;
      left: -80px;
    }
  }
}
</style>
