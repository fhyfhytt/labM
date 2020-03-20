<template>
  <div class="navigate">
    <headers :post-name="postName" @handleisMap="handleisMap" @againTos="againTos" />
    <div v-show="isMap" class="water">
      <div class="leftBt">
        <li v-for="(item,index) in navigateRoad" :key="index">
          <span :style="{background:item.color}" /><span> {{ item.name }}</span>
        </li>
      </div>
      <div v-for="(item,index) in navigatePosition" :key="index">
        <div class="point" :style="{top:item.left,left:item.top}">
          <span class="name" :style="{color:item.color}" v-html="getName(item.name)" />
          <p :style="{backgroundColor:item.color}" @click="goTunning(item.tunId,item.name)">
            <span class="iconfont icont-suidao" />
          </p>
        </div>
      </div>
    </div>
    <!--数据块-->
    <div v-show="!isMap" class="blockNavgation">
      <div v-for="(item,index) in navigatePositionBlock" :key="index" class="cardBox" :style="bgBlockColor(item.tunnelLength)" @click="goTunning(item.tunId,item.name)">
        <h3>{{ item.name }}</h3>
        <p><label>中心桩号 :</label><span>{{ item.mileage }}</span></p>
        <p><label>长度 :</label><span>{{ item.tunnelLength }}m</span></p>
        <div class="leftImg">
          <img src="../../../assets/img/topbox.png" alt="">
        </div>
        <span class="big" />
        <span class="small" />
      </div>
      <numList v-show="pagation" class="bomList" :num-lengths="numLengths" @pageChange="changeData" />
    </div>
  </div>
</template>
<script>
import headers from './header'
import { getTunList } from '@/api/dashboard'
import numList from './numList'

export default {
  name: 'Navigation',
  components: { headers, numList },
  data() {
    return {
      numLengths: 1,
      isMap: true,
      postName: {
        msg: '隧道导航',
        isRefersh: true,
        isToggle: true,
        isMore: false
      },
      pagation: false,
      navigateRoad: [{ 'color': '#2fc25b', 'name': '隧道长度0~500m' }, { 'color': '#4faaeb', 'name': '隧道长度500~1000m' },
        { 'color': '#d87a80', 'name': '隧道长度1000~2000m' }, { 'color': '#6852B2', 'name': '隧道长度2000m以上' }],
      navigatePosition: [],
      navigatePositionBlock: [],
      nowPages: 1// 当前页数
    }
  },
  computed: {
    bgBlockColor(length) {
      return function(length) {
        if (length < 500) {
          return 'background:#2fc25b'
        } else if (length >= 500 && length < 1000) {
          return 'background:#4faaeb'
        } else if (length >= 1000 && length < 2000) {
          return 'background:#d87a80'
        } else {
          return 'background:#6852B2'
        }
      }
    }
  },
  beforeMount() {
    const param = {
      pageNumber: null,
      pageSize: null,
      sortColumn: null,
      sortOrder: null
    }
    this.getTunLists(param, false)
  },
  methods: {
    goTunning(id, name) {
      const querys = {
        id: id,
        name: name
      }
      this.$router.push({ path: '/tunnelControl/tunnelTree/' + id, query: querys })
    },
    handleisMap(isMap) {
      this.navigatePositionBlock = []
      this.isMap = isMap
      // console.log(this.nowPages)
      if (isMap === false) {
        const param = {
          pageNumber: this.nowPages,
          pageSize: 12,
          sortColumn: 'create_time',
          sortOrder: 'asc'
        }
        this.getTunLists(param, true)
      } else {
        const param = {
          pageNumber: null,
          pageSize: null,
          sortColumn: null,
          sortOrder: null
        }
        this.getTunLists(param, false)
      }
    },
    changeData(val) {
      this.nowPages = val
      const param = {
        pageNumber: val,
        pageSize: 12,
        sortColumn: 'create_time',
        sortOrder: 'asc'
      }
      this.getTunLists(param, true)
    },
    getName(name) {
      const indexOne = name.indexOf('隧道')
      const indexTwo = name.indexOf('互通')
      const indexThree = name.indexOf('一号桥')
      if (indexOne >= 0) {
        return name.substring(0, indexOne)
      } else if (indexTwo >= 0) {
        return name.substring(0, indexTwo)
      } else if (indexThree >= 0) {
        return name.substring(indexThree, name.length)
      }
    },
    againTos() {
      console.log(this.nowPages)
      if (this.pagation === true) {
        this.navigatePositionBlock = []
        this.pagation = false
        const param = {
          pageNumber: this.nowPages,
          pageSize: 12,
          sortColumn: 'create_time',
          sortOrder: 'asc'
        }
        this.getTunLists(param, true)
      } else {
        this.navigatePosition = []
        const param = {
          pageNumber: null,
          pageSize: null,
          sortColumn: null,
          sortOrder: null
        }
        this.getTunLists(param, false)
      }
    },
    getTunLists(param, flag) {
      getTunList(param).then(res => {
        // this.navigatePosition = res.data
        const newList = res.data.responses
        if (!(newList.length && newList.length > 0)) {
          return
        }
        const navigationData = newList.map((item, index, newList) => {
          var arrLength = parseInt(item.tunnelLength)
          var arrLng = item.lngLat.split(',')
          item.top = parseInt(arrLng[1]) + 'px'
          item.left = parseInt(arrLng[0]) + 'px'
          if (arrLength < 500) {
            item.color = '#2fc25b'
          } else if (arrLength >= 500 && arrLength < 1000) {
            item.color = '#4faaeb'
          } else if (arrLength >= 1000 && arrLength < 2000) {
            item.color = '#d87a80'
          } else {
            item.color = '#6852B2'
          }
          return item
        })
        this.numLengths = Math.ceil(res.data.totalCount / 12) * 10
        if (flag) {
          this.navigatePositionBlock = navigationData
          this.pagation = true
        } else {
          this.navigatePosition = navigationData
          this.pagation = false
        }
      }).catch(res => {

      })
    }
  }
}
</script>
<style lang='scss' scoped>
    .navigate{
      ul,p{
          margin: 0;
          padding: 0;
      }
      .water{
        width: 100%;
        height: 359px;
        background: url(../../../assets/img/map2.png) no-repeat;
        position: relative;
        .leftBt{
          width: 168px;
          height: 100px;
          border: 1px solid #379EFC;
          background: #12506b;
          position: absolute;
          left: 0;
          bottom: 0;
          li{
            margin: 3px 0;
            span{
              vertical-align: middle;
              color: #379EFC;
            }
            &>:first-child{
              display: inline-block;
              width: 20px;
              height: 12px;
              border-radius: 2px;
              margin: 0 8px;
            }
          }
        }
        .point{
            &:hover{
              transform: scale(1.2)
            }
          width: 45px;
          position: absolute;
          text-align: center;
          .name{
            font-size: 12px;
            text-shadow: 1px 1px 1px #fff;
          }
          p{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            // background: #000;
            position: relative;
            margin: 0 auto!important;
            cursor: pointer;
            span{
              position: absolute;
              top: 3px;
              left: 0px;
              color: #fff;
            }
            &>:first-child{
            }
            &>:last-child{
              font-size: 12px;
              top: 3px;
              left: 0px;
            }
          }
        }
      }
      h3,p{
        margin: 0;
        color: #fff
      }
      .cardBox{
        width: 242px;
        background:#78c6ec;
        position: relative;
        border-radius: 20px 8px 8px 8px;
        background-image: linear-gradient(to bottom right, #0E78AE,#6CC5F2);
        color: #fff;
        padding: 36px 0px;
        margin-left: 16px;
        margin-right: 16px;
        margin-top:16px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        &:hover{
          transform: scale(1.1)
        }
      }
      p{
        font-size: 14px;
        color:#fff;
        padding-bottom:6px;
        span{
          padding-left: 4px;
        }
      }
      h3{
        // margin-bottom: 10px
        padding-bottom: 16px;
        font-size: 18px;
      }
      .leftImg{
        position: absolute;
        left: 0px;
        top: 0px;
      }
      .leftImg img{
        width: 36px;
        height: 36px;
      }
      .big{
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        background: rgba(255,255,255,.2);
      }
      .small{
        position: absolute;
        bottom: 25px;
        left: 30px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: rgba(255,255,255,.2);
      }
      .blockNavgation{
        width: 1646px;
        margin: 0 auto;
        min-height: 361px;
      }
      .bomList{
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
</style>
