<template>
  <div class="itemBounced">
    <i v-if="hourseitem.disabled===false" class="iconfont iconbianzubeifen2 cancelposi" @click="deleteWarehourse()" />
    <div class="warename" @click="deleteWarehourse()">{{ hourseitem.name }}</div>
    <div class="position">
      <i class="iconfont iconweizhi iconcolor" />
      <span>位置：</span>
      <span class="posicontent">{{ hourseitem.site }}</span>
    </div>
    <div class="capacity"><i class="iconfont iconrongliang iconcolor" />容量：{{ hourseitem.volume }}</div>
    <div class="bearing"><i class="iconfont iconchengzailiang iconcolor" />承载：{{ hourseitem.weight }}</div>
    <div class="itembottom">
      <div id="mainchart" class="mainchart" style="width:40%;height: 60%;" />
      <div class="desc">{{ hourseitem.comment }}</div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    hourseitem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      this.chart = echarts.init(document.getElementById('mainchart'))
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(param) {
            return param.marker + param.name + ':' + param.value + '%'
          },
          position: ['50%', '50%']
        },
        color: ['#3A9CFA', '#C1CDE2'],
        series: [
          {
            type: 'pie',
            radius: [0, '65%'],
            data: [
              { value: parseInt(this.hourseitem.rate), name: '存量' },
              { value: 100 - parseInt(this.hourseitem.rate), name: '可用' }
            ],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      })
    },
    // 删除库位
    deleteWarehourse() {
      this.$emit('deleteWare', this.hourseitem.id)
    }
  }
}
</script>
<style lang="scss" scoped>
  .itemBounced{
    background: #fff;
    position: absolute;
    top: 0px;
    left: 100px;
    padding: 10px;
    font-size: 12px;
    box-shadow:0px 2px 40px 0px rgba(0,0,0,0.16);
    border-radius:6px;
    .position{
      display: flex;
      margin-top: 8px;
      .posicontent{
        width: 70%;
        word-break: break-all;
      }
    }
    .iconcolor{
      color: #C0CEE2;
      padding-right: 6px;
    }
    .cancelposi{
        position: absolute;
        right: -25px;
        top: 0px;
        width: 16px;
        height: 16px;
        background-color: #C0C4CC;
        border-radius: 50%;
        text-align: center;
        line-height: 15px;
        z-index: 10;
    }
    .warename{
        background: #3F7AF2;
        padding-left: 5px;
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
    }
    .itembottom{
      margin-top: 5%;
      display: flex;
      .mainchart{
        flex: 0.9;
      }
      .desc{
        flex: 1.1;
        word-break: break-all;
        height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
</style>
