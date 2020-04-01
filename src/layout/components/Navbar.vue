<template>
  <div class="navbar ">
    <div v-if="device!=='mobile'" class="left-menu">
      <div>
        <img src="../../assets/img/favicon.png">
        <span style="line-height: 100%;">实验室管理系统</span>
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <breadcrumb v-if="device==='mobile'" id="breadcrumb-container" class="breadcrumb-container" />
      </div>

    </div>

    <div class="right-menu">
      <div class="right-menu-item">
        <el-popover v-model="visible" placement="bottom" width="400" trigger="manual">
          <el-tabs v-model="activeName" class="msgcenter" @before-leave="leavetab" @tab-click="handleClick">
            <!-- stretch 可以拉伸tab填充宽度 -->
            <el-tab-pane label="消息中心" name="first" style="max-height:300px;overflow-y:auto">
              <ul>
                <li v-for="(item,index) in messageCenter" :key="index" @click="MsgClickTo(index)">
                  <div class="minilabel">最新</div>
                  <div class="title">{{ item.topic }}</div>
                  <div>{{ item.publishTime }}</div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="消息公告" name="second" style="max-height:300px;overflow-y:auto">
              <ul>
                <li v-for="(item,index) in sysCenter" :key="index" @click="NoticeClickTo(index)">
                  <div class="minilabel">最新</div>
                  <div class="title">{{ item.topic }}</div>
                  <div>{{ item.publishTime }}</div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
          <p slot="reference" class="iconfont iconxiaoxi1 bigIcon" :class="sysCenter.length>0||messageCenter.length>0?&quot;point&quot;:&quot;&quot;" @click="show" />
        </el-popover>
      </div>
      <div class="imgContain">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="defaultAvater" class="user-avatar">
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/resetPassword">
              <el-dropdown-item>密码修改</el-dropdown-item>
            </router-link>
            <a href="javascript:void(0)">
              <el-dropdown-item>帮助中心</el-dropdown-item>
            </a>
            <el-dropdown-item @click.native="logoutR">
              <span style="display:block;">切换账号</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p class="peopleName">{{ this.$store.getters.name }}</p>
        <p v-if="device!=='mobile'" @click="logout"><span class="iconfont icontuichu exit" /></p>
      </div>
      <!-- <el-dialog title="切换账号" :visible.sync="moveShow" class="baseMove">
        <baseConfirm title="是否确认切换账号？" @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog> -->
      <base-remove ref="baseRemoved" :sure-dioag="sureDioag" :msg="'确认要退出系统么?'" :iconfont="iconfont" :svg-style="svgStyle" @confireMsg="confireMsg" @sureMsg="sureMsg" />
      <base-remove ref="baseRemoved1" :sure-dioag="sureDioag1" :msg="'确认切换账号么?'" :iconfont="iconfont" :svg-style="svgStyle" @confireMsg="confireMsg" @sureMsg="sureMsg1" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseRemove from '@/components/baseRemove/baseRemove'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import defaultAvater from '../../assets/img/header.png'
import { checkStatus, getPersonAllList } from '@/api/message'
// getShort
export default {
  components: {
    baseRemove,
    Breadcrumb,
    Hamburger },
  data() {
    return {
      checkItem: 'checkItem',
      noCheckItem: 'noCheckItem',
      msg: '确认要退出系统么?',
      msg1: '确认切换账号么?',
      iconfont: 'el-icon-warning',
      svgStyle: 'color:#FFAA00;font-size:25px;margin-right:22px;',
      visible: false,
      redshow: false,
      yelshow: false,
      greshow: false,
      moveShow: false,
      pointNum: 0,
      activeName: 'first',
      defaultAvater: defaultAvater,
      messageCenter: this.$store.state.dashord.dataListOne,
      sysCenter: [],
      sureDioag: false,
      sureDioag1: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  watch: {
    '$store.state.dashord.warnOne': function(oldval, newval) {
      if (newval) {
        this.show()
      }
    }
  },
  created() {
    this.getmessage()
  },
  mounted() {
    if (this.avatar !== '') {
      this.defaultAvater = this.avatar
    }
    // 测试自动弹出
    // setTimeout(() => {
    //   this.$store.dispatch('dashord/setWarnOne', true)
    //   console.log(this.$store.state.dashord.warnOne)
    // }, 5000)
  },
  methods: {
    async getmessage() {
      var that = this
      // const param1 = {
      //   state: [1],
      //   pageSize: 10,
      //   pageNumber: 1,
      //   sortColumn: 'publish_time',
      //   isRead: 0
      // }
      const param2 = {
        state: [1],
        pageSize: 10,
        pageNumber: 1,
        sortColumn: 'publish_time',
        isRead: 0
      }
      // await getPersonAllList(param1).then(res => {
      //   that.$nextTick(() => {
      //     that.messageCenter = res.data.list
      //   })
      // }).catch(res => {
      //   that.$message.error(res.msg)
      // })
      await getPersonAllList(param2).then(res => {
        that.$nextTick(() => {
          that.sysCenter = res.data.list
        })
      }).catch(res => {
        that.$message.error(res.msg)
      })
    },
    confireMsg(flag) {
      this.sureDioag = false
      this.sureDioag1 = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.sureDioag = true
    },
    logoutR() {
      this.sureDioag1 = true
    },
    sureMsg(flag) {
      this.sureDioag = flag
      this.$store.dispatch('tagsView/delAllViews', '')
      this.$store.dispatch('user/logout')
    },
    sureMsg1(flag) {
      this.sureDioag1 = flag
      this.$store.dispatch('tagsView/delAllViews', '')
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    handleClick(e, v) {
      // console.log(e, v)
    },
    MsgClickTo(e) {
      // const query = { id: this.sysCenter[e].msId }
      // this.changeStatus(query.id)
      // this.$router.push({ path: '/systemManagement/SystemSet/noticeMore/' + query.id, query: query })
    },
    show() {
      this.visible = !this.visible
      if (this.visible) {
        setTimeout(() => {
          if (this.visible) {
            this.visible = false
          }
        }, 5000)
      }
    },
    NoticeClickTo(e) {
      const query = { id: this.sysCenter[e].msId }
      this.changeStatus(query.id)
      this.$router.push({ path: '/systemManagement/SystemSet/noticeMore/' + query.id, query: query })
    },
    leavetab(activeName, oldActiveName) {
    }, changeStatus(id) {
      checkStatus(id).then(res => {
      }).catch(res => {
        this.$message.error(res.msg)
      })
    }
  }
}
</script>

<style lang="scss" >
@import '~@/styles/variables.scss';
.navbar {
  @media screen and(min-width: 1900px) {
    height: 64px;
  }
  @media screen and(min-width: 1600px) and(max-width: 1900px) {
    height: 60px;
  }
  @media screen and(min-width: 1400px) and(max-width: 1600px) {
    height: 55px;
  }
  @media screen and(min-width: 1100px) and(max-width: 1400px) {
    height: 50px;
  }
  overflow: hidden;
  position: relative;
  font-size: 24px;
  font-family: 'PingFangSC-Semibold, PingFang SC';
  font-weight: 600;
  color: rgba(41, 41, 41, 1);
  line-height: 100%;
  box-shadow: 0px 1px 11px 0px rgba(0, 21, 41, 0.2);
  z-index: 99;
  .hamburger-container {
    line-height: 100%;
    display: inline;
    vertical-align: middle;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    i {
      font-size: 20px;
    }
  }

  #breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu {
    float: left;
    margin-left: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      width: 76px;
      height: 36px;
      vertical-align: middle;
    }
    span {
      font-size: 24px;
      vertical-align: middle;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      width: 50px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      line-height: 100%;
      position: relative;
      text-align: center;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }

      .bigIcon {
        font-size: 24px;
        width: 25px;
        position: absolute;
        top: 50%;
        display: block;
        transform: translateY(-50%);
        font-weight: 100;
        margin: 0;
        outline: none;
      }
      .point::after {
        content: '';
        background: red;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        position: absolute;
        top: -3px;
        left: 15px;
        z-index: 99;
        border: 1px solid #fff;
      }
      .allPoints {
        display: inline-block;
        position: absolute;
        width: 6px;
        height: 28px;
        bottom: 2px;
        ul {
          display: flex;
          align-items: center;
        }
        .smallBd {
          // display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .reds {
          background: red;
        }
        .yellows {
          background: yellow;
        }
        .greens {
          background: green;
        }
      }
    }
    .avatar-container {
      .avatar-wrapper {
        width: 40px;
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .imgContain {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 20px;
    .peopleName {
      font-size: 14px;
      font-family: 'PingFangSC-Regular, PingFang SC';
      font-weight: 400;
      color: rgba(41, 41, 41, 1);
      line-height: 100%;
      margin-left: 12px;
    }

    p {
      display: inline-block;
      margin: 0;
    }
    .imgP {
      width: 100px;
      text-align: right;
      height: 36px;
      overflow: hidden;
      &:hover {
        transform: scale(1.1);
      }
      img {
        width: 36px;
        height: 36px;
        margin-right: 6px;
        vertical-align: middle;
      }
      span {
        line-height: 100%;
        vertical-align: middle;
      }
    }
    .exit {
      float: right;
      font-size: 20px;
      margin: 0 18px 0 24px;
      font-weight: 100;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.topHeader {
  margin-top: 0px !important;
  margin-left: 110px !important;
  padding: 0px !important;
  border: none;
  background: #062132;
  color: #fff;
  .warned {
    cursor: pointer;
    list-style: none;
    width: 100%;
    height: 40px;
    line-height: 100%;
    &:hover {
      background: rgba(83, 227, 253, 0.28);
    }
    & > span {
      position: relative;
      vertical-align: middle;
      & > img {
        display: inline-block;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 12px;
        overflow: hidden;
        width: 12px;
        height: 12px;
      }
    }
    & > .iconfont {
      font-size: 22px;
      margin: 0 6px 0 10px;
    }
  }
}
</style>
<style lang="scss" >
.msgcenter {
  .el-tab-pane {
    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }
    /* 滚动条中能上下移动的小块 */
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.45);
      border-radius: 5px;
    }
    /* scroll轨道背景 */
    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: transparent;
    }
  }
  ul {
    padding: 0 10px;
    li {
      display: flex;
      flex-wrap: nowrap;
      margin-bottom: 16px;
      .minilabel {
        width: 35px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #ff4b2b;
        border-radius: 4px;
        color: #fff;
        flex-shrink: 0;
        margin-right: 15px;
      }
      .title {
        flex: 1;
        color: #292929;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .time {
        margin-left: 30px;
      }
    }
  }
  .msgfooter {
    text-align: right;
    span {
      cursor: pointer;
    }
  }
}
</style>

