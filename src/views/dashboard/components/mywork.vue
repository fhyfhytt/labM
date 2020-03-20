<template>
  <div class="mywork">
    <headers :post-name="postName" @getMores="getMores" />
    <el-row style="margin-bottom:0">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane ref="elTabs" label="施工" name="first">
            <span slot="label">施工</span>
            <work v-if="searchData" :events="events" :num-length="numLength" @stopLength="stopLength" />
            <div v-else class="noData">
              暂无数据
            </div>
          </el-tab-pane>
          <el-tab-pane label="封道" name="second">
            <span slot="label">封道</span>
            <workTwo v-if="searchData" :events-two="eventsTwo" :num-length-two="numLengthTwo" @stopLengthTwo="stopLengthTwo" />
            <div v-else class="noData">
              暂无数据
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通管制" name="third">
            <span slot="label">交通管制</span>
            <workThree v-if="searchData" :events-three="eventsThree" :num-length-three="numLengthThree" @stopLengthThree="stopLengthThree" />
            <div v-else class="noData">
              暂无数据
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-badge v-if="sgtotalCount" :value="sgtotalCount" :max="99" class="item" style="position:absolute;top:54px;left:45px" />
    <el-badge v-if="fdtotalCount" :value="fdtotalCount" :max="99" class="item" style="position:absolute;top:54px;left:110px" />
    <el-badge v-if="jtgztotalCount" :value="jtgztotalCount" :max="99" class="item" style="position:absolute;top:54px;left:200px" />
    <div v-show="firstGo" class="firstData">
      暂无数据
    </div>
  </div>
</template>
<script>
import headers from './header'
import work from './mywork/work'
import workTwo from './mywork/workTwo'
import workThree from './mywork/workThree'
import { getConstruction, getDivide, getTrafficControl } from '@/api/dashboard'

export default {
  name: 'Mywork',
  components: { headers, work, workTwo, workThree },
  data() {
    return {
      postName: {
        msg: '交通事件',
        isRefersh: false,
        isToggle: false,
        isMore: true
      },
      events: [],
      eventsTwo: [],
      eventsThree: [],
      activeName: 'first',
      numLength: 0,
      numLengthTwo: 0,
      numLengthThree: 0,
      eventNums: 0,
      sgtotalCount: 0, // 施工数量
      fdtotalCount: 0, // 封道
      jtgztotalCount: 0, // 交通
      searchData: true,
      firstGo: false,
      nowTabName: 'first' // 控制刷新
    }
  },
  watch: {
  },
  activated() {
  },
  beforeMount() {
    getConstruction().then(res => {
      this.events = res.data.responses
      this.numLength = this.events.length
      this.sgtotalCount = res.data.sgtotalCount
      this.fdtotalCount = res.data.fdtotalCount
      this.jtgztotalCount = res.data.jtgztotalCount
      this.numLengthTwo = res.data.fdtotalCount
      this.numLengthThree = res.data.jtgztotalCount
      // 在控制变量改变的时候进行 强制渲染更新  elementUi solt原因
      this.$nextTick(() => {
        this.$refs.elTabs.$forceUpdate()
      })
    }).catch(res => {
      this.firstGo = true
    })
  },
  methods: {
    handleClick(tab) {
      this.nowTabName = tab.name
      this.getTab(this.nowTabName)
    },
    refreshTab() {
      this.getTab(this.nowTabName)
    },
    getTab(name) {
      // this.searchData = false
      // this.firstGo = false
      // return
      if (name === 'first') {
        getConstruction().then(res => {
          if (!res.success) {
            this.numLength = 0
            this.searchData = false
            this.firstGo = false
            return
          }
          this.searchData = true
          this.firstGo = false
          this.events = res.data.responses
          this.numLength = this.events.length
        }).catch(res => {
          this.searchData = false
          this.firstGo = false
        })
      } else if (name === 'second') {
        getDivide().then(res => {
          if (!res.success) {
            this.numLengthTwo = 0
            this.searchData = false
            this.firstGo = false
            return
          }
          this.searchData = true
          this.firstGo = false
          this.eventsTwo = res.data.responses
          this.numLengthTwo = this.eventsTwo.length
        }).catch(res => {
          this.searchData = false
          this.firstGo = false
        })
      } else {
        getTrafficControl().then(res => {
          if (!res.success) {
            this.numLengthThree = 0
            this.searchData = false
            this.firstGo = false
            return
          }
          this.searchData = true
          this.firstGo = false
          this.eventsThree = res.data.responses
          this.numLengthThree = this.eventsThree.length
        }).catch(res => {
          this.searchData = false
          this.firstGo = false
        })
      }
    },
    getMores() {
      const querys = {
        time: '7'
      }
      if (this.activeName === 'first') {
        this.$router.push({ path: '/projectManage/manage/construction', query: querys })
      } else if (this.activeName === 'second') {
        this.$router.push({ path: '/projectManage/manage/divideroad', query: querys })
      } else {
        this.$router.push({ path: '/projectManage/manage/trafficManage', query: querys })
      }
    },
    stopLength(val) {
      this.numLength = val
    },
    stopLengthTwo(val) {
      this.numLengthTwo = val
    },
    stopLengthThree(val) {
      this.numLengthThree = val
    }
  }
}
</script>
<style lang='scss'>
.mywork{
  position: relative;
  .el-tabs.el-tabs--top{
    margin-top: -10px;
  }
  .el-tabs__content{
    height: 195px;
  }
  .el-tabs__nav-wrap{
    padding-left: 20px;
    margin-top: 10px;
  }
  .el-tabs__item{
    font-size: 12px!important;
  }
  .el-tabs__nav-wrap::after{
    background-color:rgba(83,227,253,.4)!important;
  }
  .el-tabs__item{
    color:#fff!important;
  }
  .el-tabs__active-bar{
    background-color:#5B92FF!important;
  }
  .el-badge__content{
    padding: 0 4px;
    line-height: 14px;
    border-color:red!important;
  }

  .noData{
    align-items: center;
    display: flex;
    font-size: 14px;
    height: 195px;
    justify-content: center;
  }
  .firstData{
    position: absolute;
    font-size: 14px;
    top: 50%;
    left: 50%;
    margin-left: -28px;
    margin-top: 36px;
  }
}
</style>
