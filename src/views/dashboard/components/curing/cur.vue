<template>
  <div class="curList">
    <li v-for="(item,index) in curList" :key="index">
      <span class="name" :style="bgColor(item.type)" v-html="nameCheck(item.type)" />
      <span class="mileage"><span class="yeColor">{{ item.mileage }}</span></span>
      <!-- <span class="memo">{{ item.memo }}</span> -->
      <span class="memo" :title="item.content">{{ item.content }}</span>
      <el-progress v-show="ispro" :percentage="getTime(item.start_time, item.end_time)" />
      <el-progress v-show="ispro" :percentage="getTime(item.start_time, item.end_time)" />
      <span class="workTime">距离结束<span>{{ reduce_time }}</span>小时</span>
    </li>
  </div>
</template>
<script>
export default {
  name: 'CurList',
  props: {
    curList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      reduce_time: 2,
      perc: 0,
      ispro: false,
      curList1: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
        { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' }]
    }
  },
  activated() {

  },
  mounted() {

  },
  methods: {
    bgColor(name) {
      var backColor = ''
      if (name === '100') {
        backColor = '#4fd8be'
      } else if (name === '200') {
        backColor = '#27a9e3'
      } else if (name === '300') {
        backColor = '#ffb84a'
      } else if (name === '400') {
        backColor = '#f27360'
      }
      return 'background:' + backColor
    },
    nameCheck(name) {
      if (name === '100') {
        return '日常'
      } else if (name === '200') {
        return '定期'
      } else if (name === '300') {
        return '特别'
      } else if (name === '400') {
        return '专项'
      }
    },
    // 获取时间
    getTime(start, end) {
      if (start && end) {
        const nowDate = new Date().getTime() // 获取当前时间时间戳
        const dateBegin = new Date(start).getTime()
        const dateEnd = new Date(end).getTime()
        // endDate = dateEnd.getTime(); //结束时间戳
        // beginDate = dateBegin.getTime(); //开始时间戳
        if (nowDate >= dateEnd) {
          this.reduce_time = 0
          this.perc = 100
        } else {
          // 剩余时间
          this.reduce_time = parseInt((dateEnd - nowDate) / 1000 / 60 / 60)
          // 计算已占用时间百分比
          this.perc = ((nowDate - dateBegin) / (dateEnd - dateBegin)) * 100
        }
        return this.perc
      }
    }
  }
}
</script>
<style lang='scss' scoped>
    .curList{
      min-height: 200px;
        li{
            height: 18px;
            line-height: 18px;
            margin: 8px 0 8px  16px;
            .yeColor{
                color: #ffd04b;
            }
            .name{
                vertical-align: middle;
                margin: 0 1px 0 -1px;
                text-align: center;
                background: rgb(242, 115, 96);
                border-radius: 2px;
                width: 38px;
                padding: 0 5px 0 5px;
            }
            .mileage{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-all;
                display: inline-block;
                width: 75%;
                margin-left: 14px;
            }
            .workTime{
                margin-right: 16px;
                float: right;
                margin-top:-20px;
                &>span{
                    font: {
                        family:'Digiface';
                        size:18px;
                    }
                    color:rgb(231,64,52);
                    margin: 0 2px 0 4px;
                }
            }
            .memo{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-all;
                display: inline-block;
                width: 53%;
                margin-left:150px;
                margin-top:-37px;
            }
            &>span{
                vertical-align: middle;
            }
        }
    }
</style>
