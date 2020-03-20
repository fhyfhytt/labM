<template>
  <div class="headerTop">
    <div>
      <span class="topIcon" />
      <span>{{ postName.msg }}</span>
    </div>
    <span v-if="postName.isRefersh" class="iconfont iconshuaxin scales" @click="againTo" />
    <span v-if="postName.isToggle" v-preventReClick="1000" class="iconfont iconqiehuanzhanghao scales" @click.prevent="handleisMap1($event)" />
    <span v-if="postName.isMore" class="scales" @click="getMore">更多></span>
    <span class="clear" />
    <p />
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    postName: {
      type: Object,
      required: true
    }
  },
  //   props: ['postName'],
  data() {
    return {
      isMap: true// 地图是否显示
    }
  },
  activated() {
  },
  methods: {
    handleisMap1(isMap) {
      if (event.target.disabled) {
        // 点击太频繁了
        return
      }
      this.isMap = !this.isMap
      this.$emit('handleisMap', this.isMap)
    },
    againTo() {
      this.$emit('againTos', '')
    },
    getMore() {
      this.$emit('getMores', '')
    }
  }
}
</script>
<style lang='scss' scoped>
    .headerTop{
        background: rgba(83,227,253,0.15);
        width: 100%;
        height: 40px;
        line-height: 40px;
        position: relative;
        &>div{
            float: left;
            font-size: 14px;
            color: #379EFC;
            margin-left: 16px;
            .topIcon{
                display: inline-block;
                width: 3px;
                height: 16px;
                background: #379EFC;
                position: relative;
                top: 3px;
                margin-right: 6px;
            }
        }
        &>span{
            float: right;
            font-size: 12px;
            color:#fff;
            margin-right: 14px;
            cursor: pointer;
        }
        &>p{
            position: absolute;
            height: 1px;
            width: 100%;
            bottom: -1px;
            left: 0;
            background: radial-gradient(#53e3fd 20%, transparent 80%);
            margin: 0;
        }
        .scales:hover{
          transform: scale(1.2)
        }
    }
</style>
