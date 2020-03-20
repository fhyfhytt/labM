<template>
  <div class="vehicleFlow">
    <headers :post-name="postName" @againTos="againTos" />
    <el-carousel v-if="showVechicle" indicator-position="none">
      <el-carousel-item v-for="(item,index) in carData" :key="index">
        <indexEchart :charts="item" />
      </el-carousel-item>
    </el-carousel>
    <!-- <indexEchart id="flowCar" :charts="charts" /> -->
    <div v-if="!showVechicle" class="noData">
      暂无数据
    </div>
  </div>
</template>
<script>
import headers from './header'
import indexEchart from './echarts/echart'
import { getCar } from '@/api/dashboard'
export default {
  name: 'VehicleFlow',
  components: { headers, indexEchart },
  data() {
    return {
      postName: {
        msg: '车流量',
        isRefersh: true,
        isToggle: false,
        isMore: false
      },
      charts: {
        unit: '车流量',
        names: ['上行', '下行'],
        lineX: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        value: [
          [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
          [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        ]
      },
      carData: [],
      showVechicle: true
    }
  },
  activated() {
  },
  created() {
    this.getVehicle()
  },
  methods: {
    againTos() {
      this.carData = []
      this.showVechicle = false
      this.getVehicle()
    },
    getVehicle() {
      getCar().then(res => {
        const times = res.data.time
        // this.carData = [{
        //   lineX: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        //   value: [
        //     [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        //   ]
        //   // tunnelName: '第一'
        // }, {
        //   lineX: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        //   value: [
        //     [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        //   ]
        //   // tunnelName: '第二'
        // }]
        if (!res.data.data) {
          this.showVechicle = false
          return
        }
        const newList = res.data.data.filter((item, index) => {
          if (item.vdData !== '') {
            return item
          }
        })
        if (newList.length === 0) {
          this.showVechicle = false
        } else {
          this.carData = newList.map((item, index) => {
            item.unit = '车流量'
            item.names = ['上行', '下行']
            item.lineX = times
            if (item.value === '') {
              item.value = [item.upQuantityList, item.downQuantityList]
            }
            return item
          })
        }
      })
    }
  }
}
</script>
<style lang='scss'>
.vehicleFlow{
  .el-carousel__container{
    height: 360px;
  }
  .noData{
    align-items: center;
    display: flex;
    font-size: 14px;
    height: 360px;
    justify-content: center;
  }
}
</style>
