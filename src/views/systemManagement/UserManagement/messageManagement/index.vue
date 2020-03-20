
<template>
  <div class="pageRow">
    <div class="page-title">
      <el-row class="msgTp">
        <el-radio-group v-model="factype" class="radio-style" @change="changeClick">
          <el-radio-button v-for="(item,index,) in btns" :key="index" :label="item.code">{{ item.name }}</el-radio-button>
          <!-- <el-radio-button label="2">企业信息</el-radio-button>
          <el-radio-button label="3">数据公示</el-radio-button> -->
        </el-radio-group>
      </el-row>
      <el-row>
        <div class="inb">
          <el-date-picker
            v-model="startMsgTime"
            type="date"
            placeholder="选择开始日期时间"
            prefix-icon="iconfont iconrili"
          />
        </div>
        <span class="toGo">至</span>
        <div class="inb" style="margin-right:24px;">
          <el-date-picker
            v-model="endMsgTime"
            type="date"
            placeholder="选择结束日期时间"
            prefix-icon="iconfont iconrili"
          />
        </div>
        <el-button size="small" class="button-sub searchs" @click="searchMsg">查询</el-button>
      </el-row>
    </div>
    <div class="page-table">
      <div class="page-table-content">
        <div class="button-tool">
          <div class="button-tool-left fl" />
          <div class="button-tool-right fr">
            <el-button size="small" icon="iconfont iconqingchuduilie" @click="removeMsg">删除</el-button>
            <el-button size="small" @click="oneRead">标为已读</el-button>
            <el-button size="small" @click="allRead">全部标为已读</el-button>
          </div>

        </div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          class="tableShow"
          @selection-change="handleSelectionChange"
          @cell-click="clickOneTable"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="序号"
            width="120"
            prop="id"
          >
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="memo"
            label="内容"
          >
            <!-- show-overflow-tooltip -->
            <template slot-scope="scope">
              <div v-if="scope.row.ifRead==='0'?true:false" class="tableContent">
                <span class="board" :title="scope.row.topic+memoReplace(scope.row.memo)">{{ scope.row.topic }}<span class="momoLeft" v-html="memoReplace(scope.row.memo)" /></span><span class="redBoard" />
              </div>
              <div v-else class="tableContent"><span class="board" :title="scope.row.topic+memoReplace(scope.row.memo)">{{ scope.row.topic }}<span class="momoLeft" v-html="memoReplace(scope.row.memo)" /></span></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="isRead"
            label="状态"
            width="120"
            :formatter="stateFormatter"
          />
          <el-table-column
            prop="publishTime"
            label="时间"
            width="150"
            sort-by="publishTime"
            :sortable="true"
          />
        </el-table>
        <div v-if="totalNum" class="numListJup">
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total,sizes,prev, pager, next, jumper"
            :total="totalNum"
            :pager-count="5"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        <!-- <div class="sendAllBtn">
          <span>跳转</span>
        </div> -->
        </div>

      </div>

      <el-dialog title="删除" :visible.sync="moveShow" class="baseMove">
        <baseConfirm @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getTime } from '@/utils/time'
import { getAllList, checkStatus, remove, allReads, sendCg } from '@/api/message'
import baseConfirm from '@/views/baseComponents/baseConfirm'
import common from '@/utils/common'
export default {
  name: 'MessageList',
  components: { baseConfirm },
  data() {
    return {
      startMsgTime: '',
      endMsgTime: '',
      tableData: [],
      pageSizeGo: 1,
      moveShow: false,
      removeRd: [], // 勾选数据
      totalNum: 1,
      factype: '',
      loading: false,
      pageSize: 10,
      pageNumber: 1,
      currentPage: 1,
      btns: []
    }
  },
  watch: {
    $route: { // 监听路由变化
      handler: function(to, from) {
        if (to.name === 'MessageList') {
          const param = {
            'state': [0, 1, 2]
          }
          this.getListData(param)
        }
      },
      deep: true
    }
  },
  created() {
    common.getDictNameList({ dictName: '消息类型', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.btns = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
  },
  mounted() {
    const param = {
      'state': [0, 1, 2]
    }
    this.getListData(param)
  },
  methods: {
    changeClick(e) {
      const param = {
        'state': [0, 1, 2]
      }
      this.getListData(param)
    },
    searchMsg() {
      if (this.startMsgTime === '' || this.startMsgTime === null) {
        this.$message({
          type: 'error',
          message: '请输入开始时间'
        })
        return
      }
      if (this.endMsgTime === '' || this.endMsgTime === null) {
        this.$message({
          type: 'error',
          message: '请输入结束时间'
        })
        return
      }
      const param = {
        'state': [0, 1, 2],
        'startDate': getTime(this.startMsgTime),
        'endDate': getTime(this.endMsgTime)
      }
      this.getListData(param)
    },
    sendMsg() {
      var flag = false
      if (this.removeRd.length === 0) {
        return this.$message({
          type: 'error',
          message: '请选择至少一条数据'
        })
      }
      this.removeRd.forEach(element => {
        if (element.state === '1') {
          this.$message.error('消息已发布，请重新选择！')
          flag = true
          return
        }
      })
      if (flag) {
        return
      }
      const ids = this.removeRd.map(res => {
        return res.ms_id
      })
      sendCg(ids.join(',')).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
          this.getListData('', true)
        }
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    handleSelectionChange(val) {
      this.removeRd = val
    },

    handleCurrentChange(val) {
      const param = {
        'state': [0, 1, 2]
      }
      if (this.startMsgTime !== '' && this.endMsgTime !== '') {
        param.startDate = getTime(this.startMsgTime)
        param.endDate = getTime(this.endMsgTime)
      }
      this.getListData(param)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      const param = {
        'state': [0, 1, 2]
      }
      if (this.startMsgTime !== '' && this.endMsgTime !== '') {
        param.startDate = getTime(this.startMsgTime)
        param.endDate = getTime(this.endMsgTime)
      }
      this.getListData(param)
    },
    oneRead() {
      if (this.removeRd.length === 0) {
        this.$message.error('请选择至少一条数据')
        return
      }
      var haveNow = this.removeRd.find(res => {
        return res.ifRead === '1'
      })
      if (haveNow) {
        this.$message.error('请选择未读的消息！')
        return
      }
      const ids = this.removeRd.map(res => {
        return res.ms_id
      })
      checkStatus(ids.join(',')).then(res => {
        this.getListData('', true)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    allRead() {
      allReads().then(res => {
        this.$message({
          type: 'success',
          message: '全部标为已读成功'
        })
        this.getListData('', true)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    clickOneTable(row, column, cell, event) {
      const querys = {
        id: row.ms_id
      }
      if (row.ifRead === '0') {
        this.changeStatus(row.ms_id)
      }
      if (row.state === '0') {
        this.$router.push({ path: '/systemManagement/SystemSet/changenotice', query: querys })
      } else {
        this.$router.push({ path: '/systemManagement/SystemSet/noticeMore/' + querys.id, query: querys })
      }
    },
    removeMsg() {
      if (this.removeRd.length === 0) {
        this.$message.error('请选择至少一条数据')
        return
      }
      this.moveShow = true
    },
    addMsg() {
      this.$router.push({ path: '/systemManagement/SystemSet/sendNotice' })
    },
    sureMsg(flag) {
      this.moveShow = flag
      const ids = this.removeRd.map(res => {
        return res.ms_id
      })
      remove(ids.join(',')).then(res => {
        this.getListData('', true)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    confireMsg(flag) {
      this.moveShow = flag
    },
    stateFormatter(row, column) {
      if (row.isRead === '0') {
        return '未读'
      } else if (row.isRead === '1') {
        return '已读'
      }
    },
    getListData(param, flag) {
      this.loading = true
      if (flag) {
        param = {
          'pageNumber': 1,
          'pageSize': 12,
          'state': [0, 1, 2]

        }
        if (this.startMsgTime !== '' && this.endMsgTime !== '') {
          param.startDate = getTime(this.startMsgTime)
          param.endDate = getTime(this.endMsgTime)
        }
      }
      param.pageNumber = this.pageNumber
      param.pageSize = this.pageSize
      param.typeL = this.factype
      param.isPerson = '1'
      const params = param
      getAllList(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          this.tableData = []
          return this.$message.error(res.msg)
        }
        const dataList = res.data
        this.tableData = dataList.list
        this.totalNum = Number(res.data.totalNum)
      }).catch(res => {
        this.loading = false
        this.$message.error(res.msg)
      })
    },
    changeStatus(id) {
      checkStatus(id).then(res => {

      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    memoReplace(memo) {
      var reg = /<\/?.+?\/?>/g
      var titleConten = memo.replace(reg, '')
      titleConten = titleConten.replace(/&nbsp;/ig, '')
      return titleConten
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import "~@/styles/btn.scss";

  .pageRow{
    >>>  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    box-shadow: none;
  }
    .page-title{
      flex-direction: column ;
      justify-content: center;
      .el-row{
        width:100%;
        padding: 10px 30px;
      }
    }
    .page-table{
      .button-tool{
        overflow: hidden;

      }
    }
  }
</style>

