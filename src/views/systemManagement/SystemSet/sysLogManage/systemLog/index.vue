<template>
  <div class="systemLog pageRow">
    <el-row class="btnGroup">
      <el-button type="primary" icon="iconfont iconshuaxin" class="btn" @click="refresh">刷新</el-button>
      <el-button type="primary" icon="iconfont iconshuaxinbeifen" class="btn" @click="exportLog">导出</el-button>
    </el-row>
    <el-row ref="content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" class="content page-table infinite-list">
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color">
          <div v-if="activity.operateDate" class="date">{{ activity.operateDate }}</div>
          <div class="time">{{ activity.operateTime }}</div>
          <div calss="contentMsg">{{ "报错类："+activity.eClass+"     后台报错方法："+activity.eMethod+"    后台报错名称："+activity.eName+"    后台报错参数："+activity.eParam+"    后台报错操作名："+activity.operatorName }}</div>
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
      reverse: false,
      activities: [],
      loading: false,
      pageSize: 10,
      pageNumber: 1,
      disabled: false
      // maxHeight: 100
    }
  },
  computed: {

  },
  mounted() {
    this.$nextTick(() => { // 页面渲染完成后的回调
      console.log(this.$refs.content.offsetHeight)
    })
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
          if (Object.keys(res.data.list).length !== 0) {
            this.$nextTick(() => {
              const listobj = res.data.list
              var activities = []
              for (const key in listobj) {
                const arr = listobj[key].map((item, index) => {
                  if (index === 0) {
                    return item
                  } else {
                    item.operateDate = ''
                    return item
                  }
                })
                activities = activities.concat(arr)
              }
              const newActivities = this.activities.concat(activities)
              newActivities[0].color = '#379EFC'
              this.activities = newActivities
            })
          } else {
            this.disabled = true
            this.$message.success('没有更多了')
          }
        }
      }).catch((res) => {
        this.loading = false
        this.$message.error(res.msg)
      })
    },
    load() {
      if (this.pageNumber === 1) {
        this.getData()
      }

      this.pageNumber += 1
    },
    refresh() {
      this.disabled = false
      this.activities = []
      this.pageSize = 10
      this.pageNumber = 1
      this.load()
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
      >>>.iconfont{
        font-size: 12px;
        margin-right:8px;
        line-height: 32px;
      }
    }
  }
  .content {
    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }
    /* 滚动条中能上下移动的小块 */
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.45);
      border-radius: 5px;
    }
    /* scroll轨道背景 */
    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: transparent;
    }
    &:hover {
      overflow-y: auto;
    }
    padding: 32px 200px 32px 232px;

    .el-timeline-item {
      height: 50px;
      // font-weight: bold;
      >>> .el-timeline-item__timestamp.is-bottom {
        margin-top: 0;
      }
      >>> .el-timeline-item__content {
        color: #909399;
      }
    }
    .el-timeline > .el-timeline-item:first-child {
      >>> .el-timeline-item__content {
        color: #292929 !important;
      }

      .date {
        color: #379efc;
        border: 1px solid #379efc;
      }
      .time {
        color: #292929 !important;
      }
      .contentMsg {
        color: #292929 !important;
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
      border: 1px solid #c1cee0;
      line-height: 24px;
      padding: 8px;
      color: #c1cee0;
      top: -11px;
    }

    .time {
      position: absolute;
      left: -80px;
    }
    .contentMsg {
      color: #909399;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>
