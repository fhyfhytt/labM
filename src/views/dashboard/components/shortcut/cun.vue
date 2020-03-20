<template>
  <div class="shortcut">
    <ul>
      <li v-for="(item,index) in shortAll" :key="index">
        <p :style="{backgroundColor:getColor(item)}"><span class="iconfont" :class="getClass(item)" @click="changRoutr(item)" /></p>
        <span v-html="getName(item)" />
      </li>
      <li class="addMore">
        <p class="more" @click="goShortCut"><span class="iconfont iconx-tianjia" /></p>
        <span>添加更多</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Cut',
  props: {
    shortAll: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  activated() {
  },
  methods: {
    goShortCut() {
      this.$router.push({ path: '/shortCut' })
    },
    getColor(id) {
      // if (id === 'ss') {
      // }
      return '#27a9e3' // 暂时蓝色
    },
    getClass(id) {
      if (id === 'y_sy') { // 首页
        return 'iconshouye'
      } else if (id === 'y_sdkz') { // 隧道控制
        return 'icont-suidao'
      } else if (id === 's_sdsgd') { // 隧道施工单
        return 'iconsuidaoshigongdan'
      } else if (id === 's_sdfdd') { // 隧道封道单
        return 'iconsuidaofengdaodan'
      } else if (id === 's_jtgzdjd') { // 交通管制登记单
        return 'iconjiaotongguanzhidengjidan'
      } else if (id === 's_pswdjd') { // 抛洒物登记单
        return 'iconpaosawudengjidan'
      } else if (id === 's_sdsggl') { // 隧道施工管理
        return 'iconjiaoseguanlibeifen'
      } else if (id === 's_sdfdgl') { // 隧道封道管理
        return 'iconjiaoseguanlibeifen2'
      } else if (id === 's_jtgzgl') { // 交通管制管理
        return 'iconjiaoseguanlibeifen3'
      } else if (id === 's_pswgl') { // 抛洒物管理
        return 'iconjiaoseguanlibeifen1'
      } else if (id === 'y_xxgl') { // 消息管理
        return 'iconxiaoxiguanli1'
      } else if (id === 'e_sbgl') { // 设备管理
        return 'iconsheshishebeiguanli'
      } else if (id === 's_sjgz') { // 事件跟踪
        return 'iconshijiangenzong'
      } else if (id === 's_sjcx') { // 事件查询
        return 'iconshijianchaxun'
      } else if (id === 's_sjfx') { // 事件分析
        return 'iconshijianfenxi'
      } else if (id === 's_sjbb') { // 事件报表
        return 'iconshijianbaobiao'
      } else if (id === 's_cllbb') { // 车流量报表
        return 'iconcheliuliangbaobiao'
      } else if (id === 's_pjcsbb') { // 平均车速报表
        return 'iconpingjunchesubaobiao'
      } else if (id === 's_cjpz') { // 场景配置
        return 'iconchangjingpeizhi'
      } else if (id === 's_cjsz') { // 场景设置
        return 'iconchangjingshezhi'
      } else if (id === 's_cjcx') { // 场景查询
        return 'iconchangjingchaxun'
      } else if (id === 's_xtgl') { // 组织管理
        return 'iconzuzhiguanli'
      } else if (id === 's_jsgl') { // 角色管理
        return 'iconjiaoseguanli'
      } else if (id === 's_rygl') { // 人员管理
        return 'iconrenyuanguanli'
      } else if (id === 's_sjygl') { // 数据域管理
        return 'iconshujuyuguanli'
      } else if (id === 's_zdgl') { // 字典管理
        return 'iconzidianguanli'
      }
    },
    getName(id) {
      if (id === 'y_sy') { // 首页
        return '首页'
      } else if (id === 'y_sdkz') { // 隧道控制
        return '隧道控制'
      } else if (id === 's_sdsgd') { // 隧道施工单
        return '隧道施工单'
      } else if (id === 's_sdfdd') { // 隧道封道单
        return '隧道封道单'
      } else if (id === 's_jtgzdjd') { // 交通管制登记单
        return '交通管制登记单'
      } else if (id === 's_pswdjd') { // 抛洒物登记单
        return '抛洒物登记单'
      } else if (id === 's_sdsggl') { // 隧道施工管理
        return '隧道施工管理'
      } else if (id === 's_sdfdgl') { // 隧道封道管理
        return '隧道封道管理'
      } else if (id === 's_jtgzgl') { // 交通管制管理
        return '交通管制管理'
      } else if (id === 's_pswgl') { // 抛洒物管理
        return '抛洒物管理'
      } else if (id === 'y_xxgl') { // 消息管理
        return '消息管理'
      } else if (id === 'e_sbgl') { // 设备管理
        return '设备管理'
      } else if (id === 's_sjgz') { // 事件跟踪
        return '事件跟踪'
      } else if (id === 's_sjcx') { // 事件查询
        return '事件查询'
      } else if (id === 's_sjfx') { // 事件分析
        return '事件分析'
      } else if (id === 's_sjbb') { // 事件报表
        return '事件报表'
      } else if (id === 's_cllbb') { // 车流量报表
        return '车流量报表'
      } else if (id === 's_pjcsbb') { // 平均车速报表
        return '平均车速报表'
      } else if (id === 's_cjpz') { // 场景配置
        return '场景配置'
      } else if (id === 's_cjsz') { // 场景设置
        return '场景设置'
      } else if (id === 's_cjcx') { // 场景查询
        return '场景查询'
      } else if (id === 's_xtgl') { // 组织管理
        return '组织管理'
      } else if (id === 's_jsgl') { // 角色管理
        return '角色管理'
      } else if (id === 's_rygl') { // 人员管理
        return '人员管理'
      } else if (id === 's_sjygl') { // 数据域管理
        return '数据域管理'
      } else if (id === 's_zdgl') { // 字典管理
        return '字典管理'
      }
    },
    changRoutr(id) {
      if (id === 'y_sdkz') { // 隧道控制
        return
      } else if (id === 's_sdsgd') { // 隧道施工单
        this.$router.push({ path: '/projectManage/registion/construction' })
      } else if (id === 's_sdfdd') { // 隧道封道单
        this.$router.push({ path: '/projectManage/registion/divideroad' })
      } else if (id === 's_jtgzdjd') { // 交通管制登记单
        this.$router.push({ path: '/projectManage/registion/trafficManage' })
      } else if (id === 's_pswdjd') { // 抛洒物登记单
        this.$router.push({ path: '/projectManage/registion/spoil' })
      } else if (id === 's_sdsggl') { // 隧道施工管理
        this.$router.push({ path: '/projectManage/manage/construction' })
      } else if (id === 's_sdfdgl') { // 隧道封道管理
        this.$router.push({ path: '/projectManage/manage/divideroad' })
      } else if (id === 's_jtgzgl') { // 交通管制管理
        this.$router.push({ path: '/projectManage/manage/trafficManage' })
      } else if (id === 's_pswgl') { // 抛洒物管理
        this.$router.push({ path: '/projectManage/manage/spoil' })
      } else if (id === 'y_xxgl') { // 消息管理
        this.$router.push({ path: '/message/messageList' })
      } else if (id === 'e_sbgl') { // 设备管理
        this.$router.push({ path: '/event/deviceManagement' })
      } else if (id === 's_sjgz') { // 事件跟踪
        this.$router.push({ path: '/event/management/track' })
      } else if (id === 's_sjcx') { // 事件查询
        this.$router.push({ path: '/event/management/search' })
      } else if (id === 's_sjfx') { // 事件分析
        this.$router.push({ path: '/event/management/analysis' })
      } else if (id === 's_sjbb') { // 事件报表
        this.$router.push({ path: '/event/reportManagement/reportEvent' })
      } else if (id === 's_cllbb') { // 车流量报表
        this.$router.push({ path: '/event/reportManagement/flow' })
      } else if (id === 's_pjcsbb') { // 平均车速报表
        this.$router.push({ path: '/event/reportManagement/speed' })
      } else if (id === 's_cjpz') { // 场景配置
        this.$router.push({ path: '/event/sceneManagement/setUser' })
      } else if (id === 's_cjsz') { // 场景设置
        this.$router.push({ path: '/event/sceneManagement/set' })
      } else if (id === 's_cjcx') { // 场景查询
        this.$router.push({ path: '/event/sceneManagement/sceneSearch' })
      } else if (id === 's_xtgl') { // 组织管理
        this.$router.push({ path: '/systemManagement/userManagement/organManage' })
      } else if (id === 's_jsgl') { // 角色管理
        this.$router.push({ path: '/systemManagement/userManagement/roleManage' })
      } else if (id === 's_rygl') { // 人员管理
        this.$router.push({ path: '/systemManagement/userManagement/personManage' })
      } else if (id === 's_sjygl') { // 数据域管理
        this.$router.push({ path: '/systemManagement/userManagement/regionManage' })
      } else if (id === 's_zdgl') { // 字典管理
        this.$router.push({ path: '/systemManagement/SystemSet/DictionaryS' })
      }
    }
  }
}

// if (id === 'y_sy') {//首页
//   return 'icont-suidao'
// }else if(id === 'y_sdkz'){//隧道控制

// }else if(id === 's_sdsgd'){//隧道施工单

// }else if(id === 's_sdfdd'){//隧道封道单

// }else if(id === 's_jtgzdjd'){//交通管制登记单

// }else if(id === 's_pswdjd'){//抛洒物登记单

// }else if(id === 's_sdsggl'){//隧道施工管理

// }else if(id === 's_sdfdgl'){//隧道封道管理

// }else if(id === 's_jtgzgl'){//交通管制管理

// }else if(id === 's_pswgl'){//抛洒物管理

// }else if(id === 'y_xxgl'){//消息管理

// }else if(id === 'e_sbgl'){//设备管理

// }else if(id === 's_sjgz'){//事件跟踪

// }else if(id === 's_sjcx'){//事件查询

// }else if(id === 's_sjfx'){//事件分析

// }else if(id === 's_sjbb'){//事件报表

// }else if(id === 's_cllbb'){//车流量报表

// }else if(id === 's_pjcsbb'){//平均车速报表

// }else if(id === 's_cjpz'){//场景配置

// }else if(id === 's_cjsz'){//场景设置

// }else if(id === 's_cjcx'){//场景查询

// }else if(id === 's_xtgl'){//组织管理

// }else if(id === 's_jsgl'){//角色管理

// }else if(id === 's_rygl'){//人员管理

// }else if(id === 's_sjygl'){//数据域管理

// }else if(id === 's_zdgl'){//字典管理

// }
</script>
<style lang='scss' scoped>
    .shortcut{
        height: 249px;
        ul,p{
            margin: 0;
            padding: 0;
        }
        ul{
            padding: 12px 14px 14px!important;
            li{
                width: 72px;
                text-align: center;
                margin: 15px 10px 9px 10px;
                display: inline-block;
                &>span{
                    font-size: 12px;
                    display: inline-block;
                    width: 72px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 16px;
                }
                &>p{
                    position: relative;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin: auto!important;
                    cursor: pointer;
                    &>span{
                        top: 5px;
                        position: absolute;
                        left: 11px;
                        color: #fff;
                        font-size: 26px;
                    }
                    &:hover{
                      transform: scale(1.2)
                    }
                }
            }
            .more{
                border: 1px dashed #ccc;
            }
        }
        .addMore{
          width:70px;
        }
    }
</style>

