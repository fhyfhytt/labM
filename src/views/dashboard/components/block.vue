<template>
  <div class="blockDataList">
    <li v-for="(item,index) in blockData" :key="index">
      <div :style="{borderColor:item.color}">
        <span :style="{backgroundColor:item.color}" class="name">{{ item.name }}</span>
        <span :style="{color:item.color}" class="num">{{ item.length }}</span>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  name: 'EnviroDataList',
  props: {
    blockData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  activated() {
  }
}
</script>
<style lang='scss' scoped>
    .blockDataList{
        padding: 0 10px;
        li{
            display: inline-block;
            margin: 10px 10px;
            cursor: pointer;
            &:hover{
              transform: scale(1.2)
            }
            div{
                border:1px solid;
                width: 96px;
                text-align: center;
                border-radius: 4px;
                span{
                    display: block;
                }
                .name{
                    color: #fff;
                    height: 28px;
                    line-height: 28px;
                }
                .num{
                    height: 32px;
                    line-height: 32px;
                    font: {
                        size:24px;
                        family: Digiface;
                    }
                }
            }
        }
    }
</style>
