<template>
  <div class="dataList">
    <li v-for="(item,index) in dataList" :key="index">
      <span class="iconfont icontixing yeColor" />
      <span class="memo"><span class="yeColor">{{ item.topic }}</span><span :title="item.memo">{{ item.memo }}</span>
        <!-- <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">{{ item.memo }}</div>
          <span>{{ item.memo }}</span>
        </el-tooltip> -->
      </span>
      <span class="time">{{ item.acquisitionTime }}</span>
    </li>
  </div>
</template>
<script>
export default {
  name: 'EnviroDataList',
  props: {
    dataList: {
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
    .dataList{
        height: 130px;
        margin-top: -4px;
        li{
            height: 18px;
            line-height: 18px;
            margin: 8px 0 8px  16px;
            .yeColor{
                color: #ffd04b;
            }
            .time{
                width: 126px;
                // margin-right: 16px;
                display: inline-block;
                float: right;
                line-height: 22px;
            }
            .memo{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-all;
                display: inline-block;
                width: 74%;
                .yeColor{
                  margin-right: 6px;
                }
            }
            &>span{
                vertical-align: middle;
            }
        }
    }
</style>
