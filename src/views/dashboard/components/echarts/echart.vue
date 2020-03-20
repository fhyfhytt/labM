<template>
  <div class="indexEchart" />
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    charts: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      color: ['rgba(23, 255, 243', 'rgb(250, 176, 69'],
      lineY: [],
      chart: null
    }
  },
  beforeMount() {
    // console.log(this.charts)
    for (var i = 0; i < this.charts.names.length; i++) {
      var x = i
      if (x > this.color.length - 1) {
        x = this.color.length - 1
      }
      var data = {
        name: this.charts.names[i],
        type: 'line',
        color: this.color[x] + ')',
        smooth: true,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.color[x] + ', 0.3)'
            }, {
              offset: 0.8,
              color: this.color[x] + ', 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        symbol: 'circle',
        symbolSize: 5,
        data: this.charts.value[i]
      }
      this.lineY.push(data)
    }

    this.lineY[0].markLine = {
      silent: true,
      data: [{
        yAxis: 10
      }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.charts)
    },
    setOptions({ expectedData, actualData } = {}) {
      const _this = this
      _this.chart.setOption({
        // backgroundColor: '#0d235e',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: _this.charts.names,
          textStyle: {
            fontSize: 12,
            color: 'rgb(0,253,255,0.6)'
          },
          right: '2%'
        },
        title: {
          text: _this.charts.tunnelName,
          // subtext: '数据来自西安兰特水电测控技术有限公司',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        grid: {
          top: '15%',
          left: '4%',
          right: '1.5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _this.charts.lineX,
          axisLabel: {
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            },
            formatter: function(params) {
              return params.split(' ')[0]
            }
          }
        },
        yAxis: {
          name: _this.charts.unit,
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgb(23,255,243,0.3)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          }
        },
        series: _this.lineY
      })
    }
  }
}
</script>
<style lang='scss' scoped>
    .indexEchart{
        height: 280px;
        width: 95%;
        margin: 20px 0 20px 14px;
    }
</style>
