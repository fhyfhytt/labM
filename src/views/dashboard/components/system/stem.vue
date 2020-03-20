<template>
  <div class="system">
    <ul :style="{transform:transform}" :class="{rollScreen_list_unanim:num===0}" @mouseover="stopTime" @mouseleave="continueTime">
      <li v-for="(item,index) in systemAll" :key="index" @click="gotoMore(item.ms_id)">
        <span class="name" :style="bgColor(item.type_s)" v-html="nameCheck(item.type_s)" />
        <span class="memo" :title="memoReplace(item.memo)" v-html="memoReplace(item.memo)" />
        <span class="time" v-html="timeShort(item.publish_time)" />
      </li>
      <li v-for="(item,index) in systemAll" v-show="systemAll.length > 6" :key="index+systemAll.length">
        <span class="name" :style="bgColor(item.type_s)" v-html="nameCheck(item.type_s)" />
        <span class="memo" :title="memoReplace(item.memo)" v-html="memoReplace(item.memo)" />
        <span class="time" v-html="timeShort(item.publish_time)" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Stem',
  props: {
    systemAll: {
      type: Array,
      default: () => []
    },
    systemLength: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      num: 0,
      timer: null,
      timeLength: 0
    }
  },
  computed: {
    transform: function() {
      return 'translateY(-' + this.num * 40 + 'px)'
    },
    timeShort(time) {
      return function(time) {
        if (time) {
          return time.substring(0, 16)
        }
      }
    }
  },
  watch: {
    systemLength(val, oldVal) {
      // 轮播
      // debugger
      this.timeLength = this.systemAll.length
      var _this = this
      // return
      // console.log(_this.timer, _this.num)
      if (val === -1) {
        clearInterval(_this.timer)
        _this.timer = null
        return
      }
      if (_this.systemAll.length <= 6) {
        return
      } else {
        _this.timer = window.setInterval(function() {
          // clearInterval(_this.timer)
          if (_this.num !== _this.systemAll.length) {
            _this.num++
          } else {
            _this.num = 0
          }
        }, 1000)
      }
      // console.log(_this.timer)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  mounted() {

  },
  beforeUpdate() {
  },
  methods: {
    bgColor(name) {
      var backColor = ''
      if (name === '1201') {
        backColor = '#f27360'
      } else if (name === '1102') {
        backColor = '#27a9e3'
      } else if (name === '1103') {
        backColor = '#ffb84a'
      } else if (name === '1101') {
        backColor = '#4fd8be'
      }
      return 'background:' + backColor
    },
    nameCheck(name) {
      if (name === '1201') {
        return '新闻'
      } else if (name === '1102') {
        return '运行'
      } else if (name === '1103') {
        return '通知'
      } else if (name === '1101') {
        return '更新'
      }
    },
    stopTime() {
      // console.log(this.systemLength)
      this.$emit('stopLength', -1)
    },
    continueTime() {
      this.$emit('stopLength', this.timeLength)
    },
    memoReplace(memo) {
      var reg = /<\/?.+?\/?>/g
      var titleConten = memo.replace(reg, '')
      titleConten = titleConten.replace(/&nbsp;/ig, '')
      return titleConten
    },
    gotoMore(id) {
      const querys = {
        id: id
      }
      this.$router.push({ path: '/message/messageMore/' + querys.id, query: querys })
    }
  }
}
</script>
<style lang='scss' scoped>
    .system{
      overflow: hidden;
      height: 246px;
        position:relative;
        ul,p{
            margin: 0;
            padding: 0;
        }
        ul{
          transition: 1s linear;
        }
        .rollScreen_list_unanim{
          transition: none
        }
        color: #fff;
        li{
            margin-bottom: 20px;
            height:20px;
            &:first-child{
                margin-top: 12px;
            }
            span{
                display: inline-block;
                height: 18px;
                line-height: 18px;
                vertical-align: middle;
            }
            .name{
                vertical-align: middle;
                margin: 0 8px 0 16px;
                text-align: center;
                background: rgb(242, 115, 96);
                border-radius: 2px;
                width: 32px;
            }
            .memo{
                width: 54%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .time{
                width: 110px;
                margin-right: 12px;
                float: right;
            }
        }
    }
</style>
