<template>
  <div class="workContent">
    <ul :style="{transform:transform}" :class="{rollScreen_list_unanim:num===0}" @mouseover="stopTime" @mouseleave="continueTime">
      <li v-for="(item,index) in eventsTwo" :key="index" @click="goDivide(item.id)">
        <span class="workMile" :title="item.mileage">{{ item.mileage }}</span>
        <span v-if="item.content" class="workName">{{ item.content }}</span>
        <span v-else class="workName" v-html="type(item.type)" />
        <span class="workB">
          <el-progress :percentage="getTime(item.start_time, item.end_time)" :show-text="false" />
          <p class="start"><span class="iconfont iconk-shigong" /></p>
          <p class="end"><span class="iconfont iconk-shigong" /></p>
          <!-- <p class="center" :style="{left:perci,marginLeft:leftLength}"><span class="iconfont iconk-shigong" /></p> -->
        </span>
        <span class="workTime">距离结束<span v-html="hours(item.start_time, item.end_time)" />小时</span>
      </li>
      <li v-for="(item,index) in eventsTwo" v-show="eventsTwo.length > 5" :key="index+eventsTwo.length" @click="goDivide(item.id)">
        <span class="workMile" :title="item.mileage">{{ item.mileage }}</span>
        <span v-if="item.content" class="workName">{{ item.content }}</span>
        <span v-else class="workName" v-html="type(item.type)" />
        <span class="workB">
          <el-progress :percentage="getTime(item.start_time, item.end_time)" :show-text="false" />
          <p class="start"><span class="iconfont iconk-shigong" /></p>
          <p class="end"><span class="iconfont iconk-shigong" /></p>
          <!-- <p class="center" :style="{left:perci,marginLeft:leftLength}"><span class="iconfont iconk-shigong" /></p> -->
        </span>
        <!-- <span class="workTime">距离结束<span>{{ reduce_time }}</span>小时</span> -->
        <span class="workTime">距离结束<span v-html="hours(item.start_time, item.end_time)" />小时</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    eventsTwo: {
      type: Array,
      default: () => []
    },
    numLengthTwo: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      num: 0,
      timeOne: null,
      timeLength: 0
      // reduce_time: 2,
      // perc: 0,
      // perci: '0%',
      // leftLength: 0
    }
  },
  computed: {
    transform: function() {
      return 'translateY(-' + this.num * 39 + 'px)'
    },
    type(type) {
      return function(type) {
        switch (type) {
          case '0':return '交通事故'
          case '1':return '路面状况'
          case '2':return '车辆故障'
          case '3':return '重大事件'
          case '4':return '道路施工'
          case '5':return '交通'
          case '6':return '气象'
          case '8':return '自然灾害'
          case '9':return '服务区事件'
          case '10':return '群体活动'
          default:return '其它'
        }
      }
    }
  },
  watch: {
    numLengthTwo(val, oldVal) {
      // 轮播
      // debugger
      this.timeLength = this.eventsTwo.length
      const _this = this
      if (val === -1) {
        clearInterval(_this.tiomeOne)
        _this.tiomeOne = null
        return
      }
      if (_this.numLengthTwo <= 5) {
        return
      } else {
        _this.tiomeOne = window.setInterval(function() {
          if (_this.num !== _this.eventsTwo.length) {
            _this.num++
          // setTimeout(function () {
          //   _this.num++
          // }, 50)
          } else {
            _this.num = 0
          }
        }, 2000)
      }
    }
  },
  activated() {
  },
  methods: {
    getTime(start, end) {
      if (start && end) {
        const nowDate = new Date().getTime() // 获取当前时间时间戳
        const dateBegin = new Date(start).getTime()
        const dateEnd = new Date(end).getTime()
        // endDate = dateEnd.getTime(); //结束时间戳
        // beginDate = dateBegin.getTime(); //开始时间戳
        var perc
        if (nowDate >= dateEnd) {
          // this.reduce_time = 0
          perc = 100
          // this.perci = '100%'
          // this.leftLength = '-27px'
        } else {
          // 剩余时间
          // this.reduce_time = parseInt((dateEnd - nowDate) / 1000 / 60 / 60)
          // 计算已占用时间百分比
          perc = ((nowDate - dateBegin) / (dateEnd - dateBegin)) * 100
          // this.perci = ((nowDate - dateBegin) / (dateEnd - dateBegin)) * 100 + '%'
          // if (this.perc >= 50) {
          //   this.leftLength = '-20px'
          // } else {
          //   this.leftLength = '0px'
          // }
        }
        return perc
      }
    },
    hours(start, end) {
      if (start && end) {
        const nowDate = new Date().getTime() // 获取当前时间时间戳
        const dateEnd = new Date(end).getTime()
        var reduce_time
        if (nowDate >= dateEnd) {
          reduce_time = 0
        } else {
          // 剩余时间
          reduce_time = parseInt((dateEnd - nowDate) / 1000 / 60 / 60)
        }
        return reduce_time
      }
    },
    stopTime() {
      // console.log(this.systemLength)
      this.$emit('stopLengthTwo', -1)
    },
    continueTime() {
      this.$emit('stopLengthTwo', this.timeLength)
    },
    goDivide(id) {
      const querys = {
        id: id
      }
      this.$router.push({ path: '/projectManage/divideDetail/' + id, query: querys })
    }
  }
}
</script>
<style lang='scss' scoped>
    .workContent{
        position:relative;
        overflow: hidden;
        ul,p{
            margin: 0;
            padding: 0;
        }
        ul{
          transition: 2s linear;
        }
        .rollScreen_list_unanim{
          transition: none
        }
        li{
            margin-bottom: 8px;
        }
        @mixin overSpan{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            word-break: break-all;
            display: inline-block;
            margin-left: 16px;
            height: 27px;
            line-height: 27px;
        }
        span{
            font-size: 12px;
        }
        .workB{
            @include overSpan;
            width: 47.5%;
            .el-progress{
                margin-top: 12px;
                .el-progress-bar__inner{
                    background-color: #40bae7;
                }
            }
            position: relative;
            .start{
                background: linear-gradient(to bottom,#173e98 0%, #40bae7 100%);
                color: #fff;
                top: 0;
                left: 0;
            }
            .center{
                background: linear-gradient(to bottom,#7ba6c1 0%, #eff5f7 100%);
                color: rgba(0,0,0,0.35);
                top: 0;
                left: 50%;
                // margin-left: -27px!important;
            }
            .end{
                background: linear-gradient(to bottom,#7ba6c1 0%, #eff5f7 100%);
                color: rgba(0,0,0,0.35);
                right: 0;
                top: 0;
            }
            p{
                position: absolute;
                overflow: hidden;
                width: 27px;
                border-radius: 50%;
                height: 27px;
                span{
                    margin-left: 4px;
                    font-size: 18px !important;
                }
            }
        }
        .workMile{
            width: 92px;
            @include overSpan;
        }
        .workName{
            width: 110px;
            @include overSpan;
        }
        .workTime{
            width: 106px;
            @include overSpan;
            float: right;
            margin:0 8px;
            &>span{
                font: {
                    family:'Digiface';
                    size:18px;
                }
                color:rgb(231,64,52);
                 margin: 0 2px 0 4px;
            }
        }
    }
</style>
