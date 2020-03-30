<template>
  <div class="all-div">
    <div class="collapse show div-top">
      <el-form ref="form1" :model="formModel" size="small" label-width="110px">
        <el-row>
          <el-col :span="6" style="margin-left:-50px;">
            <el-form-item label="所属隧道：">
              <el-select v-model="formModel.tunId" popper-class="select-option" clearable placeholder="请选择所属隧道">
                <el-option v-for="item in tunIdList" :key="item.code" :value="item.code" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="巡检类型：">
              <el-select v-model="formModel.type" placeholder="请选择巡检类型" clearable popper-class="select-option">
                <el-option label="日常巡检" value="0" />
                <el-option label="定期巡检" value="1" />
                <el-option label="专项巡检" value="2" />
                <el-option label="其他巡检" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="责任人：">
              <el-select
                v-model="formModel.principalPer"
                filterable
                remote
                clearable
                reserve-keyword
                placeholder="请选择责任人"
                popper-class="select-option"
              >
                <!-- multiple -->
                <el-option
                  v-for="(item,index) in personList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务状态：">
              <el-select v-model="formModel.state" placeholder="请选择任务状态" clearable popper-class="select-option">
                <el-option label="未完成" value="0" />
                <el-option label="已完成" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" style="margin-left:-50px;">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="formModel.startTime"
                type="date"
                placeholder="请选择开始时间"
                value-format="yyyy-MM-dd"
                prefix-icon="iconfont iconrili"
                style="width:43%;"
              /><span style="margin-left: 10px;margin-right:15px;color: #00eeee;">至</span>
              <el-date-picker
                v-model="formModel.endTime"
                type="date"
                placeholder="请选择结束时间"
                value-format="yyyy-MM-dd"
                prefix-icon="iconfont iconrili"
                style="width:43%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:35px;">
            <el-button class="button-sub" size="small" @click="queryTable">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="collapse show div-bottom">
      <div class="button-tool">
        <el-button v-if="true" disabled :title="titleShow" icon="iconfont iconxinzeng" size="small" @click="addReistion">新增</el-button>
        <el-button v-else icon="iconfont iconxinzeng" size="small" @click="addReistion">新增</el-button>
        <el-button v-if="true" disabled :title="titleShow" icon="iconfont iconshanchu" size="small" @click="delSome">批量删除</el-button>
        <el-button v-else icon="iconfont iconshanchu" size="small" @click="delSome">批量删除</el-button>
      </div>
      <div class="table-div">
        <el-table
          ref="multipleTable"
          height="512"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 97%;margin-left:1.5%;"
          class="tableShow"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" width="80" prop="id">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="code" label="任务编号" sortable="column" show-overflow-tooltip />
          <el-table-column prop="tunName" label="所属隧道" width="110" sortable="column" show-overflow-tooltip />
          <el-table-column prop="name" label="任务名称" width="110" sortable="column" show-overflow-tooltip />
          <el-table-column prop="typeName" label="巡检类型" width="100" sortable="column" show-overflow-tooltip />
          <el-table-column prop="principalPerName" label="责任人" width="100" sortable="column" show-overflow-tooltip />
          <el-table-column prop="phone" label="联系电话" width="100" sortable="column" show-overflow-tooltip />
          <el-table-column prop="startTime" label="开始时间" width="110" sortable="column" show-overflow-tooltip />
          <el-table-column prop="endTime" label="结束时间" width="110" sortable="column" show-overflow-tooltip />
          <el-table-column prop="finishTime" label="完成时间" width="110" sortable="column" show-overflow-tooltip />
          <el-table-column prop="stateName" label="任务状态" width="100" sortable="column" show-overflow-tooltip />
          <el-table-column prop="isOverdue" label="是否逾期" width="100" sortable="column" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.isOverdue==='1'">已逾期</span>
              <span v-else>未逾期</span>
            </template>
          </el-table-column>
          <el-table-column label="完成度" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-progress v-if="scope.row.process*100===0" color="#0E2937" :text-inside="true" :stroke-width="13" :percentage="scope.row.process*100" />
              <el-progress v-if="scope.row.process*100===100" color="#64EB8C" :text-inside="true" :stroke-width="13" :percentage="scope.row.process*100" />
              <el-progress v-if="scope.row.process*100>=67&&scope.row.process*100<100" color="#FFD85E" :text-inside="true" :stroke-width="13" :percentage="scope.row.process*100" />
              <el-progress v-if="scope.row.process*100>=35&&scope.row.process*100<67" color="#74D2F6" :text-inside="true" :stroke-width="13" :percentage="scope.row.process*100" />
              <el-progress v-if="scope.row.process*100>0&&scope.row.process*100<35" color="#F55E5E" :text-inside="true" :stroke-width="13" :percentage="scope.row.process*100" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130" align="left">
            <template slot-scope="scope">
              <el-button v-if="(scope.row.state==='0')&&hasPerm('s_but_xjrw_xj')" disabled :title="titleShow" type="text" size="small" @click="inspectInfo(scope.row)"><i class="iconfont icondancixunjiandemingxishuju" /></el-button>
              <el-button v-if="(scope.row.state==='0')&&!hasPerm('s_but_xjrw_xj')" type="text" title="巡检" size="small" @click="inspectInfo(scope.row)"><i class="iconfont icondancixunjiandemingxishuju" /></el-button>
              <el-button v-if="hasPerm('s_but_xjrw_qt')" disabled :title="titleShow" type="text" size="small" @click="showDetail(scope.row)"><i class="iconfont iconchakan" /></el-button>
              <el-button v-else type="text" title="查看" size="small" @click="showDetail(scope.row)"><i class="iconfont iconchakan" /></el-button>
              <el-button v-if="(scope.row.state==='0')&&hasPerm('s_but_xjrw_tx')" type="text" disabled :title="titleShow" size="small" @click="warnInfo(scope.row)"><i class="iconfont icontixing" /></el-button>
              <el-button v-if="(scope.row.state==='0')&&!hasPerm('s_but_xjrw_tx')" type="text" title="提醒" size="small" @click="warnInfo(scope.row)"><i class="iconfont icontixing" /></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="totalNum" class="numListJup margin-jump">
          <el-pagination
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            :current-page.sync="pageNumber"
            :page-sizes="[10,30,50,100]"
            popper-class="select-option"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <div class="sendAllBtn">
            <span>跳转</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="删除" :visible.sync="moveShow" class="baseMove">
      <removeDialog @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
  </div>
</template>
<script>
import removeDialog from '@/views/baseComponents/baseRemove'
import { taskSelectList, deleteTask, sendMessage } from '@/api/projectManage'
import common from '@/utils/common'
import { checkTimes } from '@/utils/time'
export default {
  name: 'InspectionWork',
  components: { removeDialog },
  data() {
    return {
      titleShow: '【权限不足，请配置权限】',
      // 隧道 下拉框
      tunIdList: [],
      formModel: {
        tunId: '',
        state: '',
        name: '',
        type: '',
        principalPer: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      totalNum: 0,
      pageNumber: 1,
      pageSize: 10,
      sortOrder: '',
      sortColumn: '',
      // 删除提示框
      moveShow: false,
      // 准备删除的id，可以为多个
      ids: [],
      // 表格勾选数据
      selectedData: [],
      unitIds: [],
      personList: [] // 责任人下拉列表
    }
  },
  // 当前页面不销毁的情况下，点击页签切换到别的路由
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('projectManage/setTaskManage', this.formModel)
    next()
  },
  mounted() {
    if (this.$store.getters.taskManage !== '') {
      this.formModel = this.$store.getters.taskManage
    }
    this.getTunIds()
    this.getUnitId()
    this.getPersonList()
    this.queryListByParam()
  },
  methods: {
    // 远程排序
    sortChange({ column, prop, order }) {
      var propName = ''
      if (prop === 'typeName') {
        propName = 'type'
      } else if (prop === 'stateName') {
        propName = 'state'
      } else {
        propName = prop
      }
      this.sortColumn = propName
      // descending  ascending
      if (order) {
        if (order === 'descending') {
          this.sortOrder = 'desc'
        }
        if (order === 'ascending') {
          this.sortOrder = 'asc'
        }
      } else {
        this.sortOrder = ''
        this.sortColumn = ''
      }

      this.queryTable()
    },
    // 获取session中的隧道，做成下拉框
    getTunIds() {
      this.tunIdList = this.$store.state.dashord.allData.tunSelect
      this.tunIds = this.$store.state.dashord.allData.tunIds
    },
    // 子组件 执行 新增、修改、删除操作时，重新加载隧道树
    reloadTree(key) {
      this.loadTunnelTree(key)
    },
    // 获取巡检单位
    getUnitId() {
      var unitSelect = this.$store.state.dashord.allData.unitSelect
      unitSelect.forEach(item => {
        if (item.other === '4') {
          this.unitIds.push(item.code)
        }
      })
    },
    // 责任人下拉列表查询
    getPersonList() {
      const param = {
        ids: this.unitIds
      }
      common.selectPrincipalPer(param).then(res => {
        if (res.success) {
          this.personList = res.data
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 查询按钮触发事件
    queryTable() {
      this.pageNumber = 1
      this.queryListByParam()
    },
    // 有参数查询列表信息
    queryListByParam() {
      if (!checkTimes(this.formModel.startTime, this.formModel.endTime)) {
        return
      }
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        tunId: this.formModel.tunId,
        principalPer: this.formModel.principalPer,
        type: this.formModel.type,
        state: this.formModel.state,
        startTime: this.formModel.startTime,
        endTime: this.formModel.endTime,
        sortOrder: this.sortOrder,
        sortColumn: this.sortColumn
      }
      taskSelectList(param).then(res => {
        if (res.success) {
          this.tableData = res.data.rows
          this.totalNum = res.data.totalCount
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch()
    },
    // 确认删除
    sureMsg(flag) {
      var param = {
        Ids: this.ids
      }
      deleteTask(param).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.queryTable()
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
      // 关闭弹框
      this.moveShow = flag
    },
    // 取消删除
    confireMsg(flag) {
      this.moveShow = flag
    },
    // 批量删除
    delSome() {
      if (this.selectedData.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择至少一条数据',
          type: 'error'
        })
        return
      } else {
        this.ids = []
        this.selectedData.forEach(item => {
          this.ids.push(item.id)
        })
      }
      this.moveShow = true
    },
    // 提醒
    warnInfo(row) {
      const param = {
        userName: row.principalPerName,
        mobile: row.phone,
        tunName: row.tunName,
        name: row.name,
        type: '未完成',
        flag: '1'
      }
      sendMessage(param).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 表格勾选数据
    handleSelectionChange(value) {
      this.selectedData = value
    },
    // 新增
    addReistion() {
      this.$router.push('/projectManage/addTask')
    },
    // 巡检
    inspectInfo(row) {
      this.$router.push({ path: '/projectManage/inspectInfo', query: { id: row.id }})
    },
    // 查看详情
    showDetail(row) {
      this.$router.push({ path: '/projectManage/showTask', query: { id: row.id }})
    },
    handleSizeChange(value) {
      this.pageSize = value
      this.queryListByParam()
    },
    handleCurrentChange(value) {
      this.pageNumber = value
      this.queryListByParam()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/inspection.scss";
.button-tool {
    margin-top: 20px;
}
.div-top {
  >>> .el-form-item .el-input__suffix {
    left: 160px !important;
  }
  >>> .el-form-item .el-select .el-input__suffix {
    left: 170px !important;
  }
}
.table-div {
    .el-progress {
      line-height: 2.5
    }
    >>> .el-progress-bar__outer {
        background-color: #0E2937;
    }
    >>> .el-progress-bar__inner {
        line-height: 0.6;
    }
    >>> td.is-left .cell{
      text-align: left;
      margin-left: 30px;
    }
}
</style>
