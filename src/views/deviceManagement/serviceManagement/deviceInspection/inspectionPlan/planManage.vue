<template>
  <div class="all-div">
    <div class="collapse show div-left tree-div">
      <div class="inline-div">
        <el-tree
          ref="tree"
          node-key="id"
          :data="treeData"
          default-expand-all
          :expand-on-click-node="false"
          :props="defaultProps"
          :render-content="renderContent"
          :highlight-current="true"
          @node-click="handleNodeClick"
        />
      </div>
    </div>
    <div class="collapse show right-top">
      <el-form ref="form1" :model="formModel" size="small" label-width="110px">
        <el-row>
          <el-col :span="4" style="margin-left:-50px;">
            <el-form-item label="计划名称：">
              <el-select v-model="formModel.name" filterable clearable="" placeholder="请选择计划名称" remote popper-class="select-option">
                <el-option v-for="(item,index) in restaurants" :key="index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="3">
            <el-form-item label="巡检类型：">
              <el-select v-model="formModel.type" placeholder="请选择巡检类型" clearable popper-class="select-option">
                <el-option label="日常巡检" value="0" />
                <el-option label="定期巡检" value="1" />
                <el-option label="专项巡检" value="2" />
                <el-option label="其他巡检" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="formModel.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始时间"
                prefix-icon="iconfont iconrili"
                style="width:43%;"
              /><span style="margin-left: 25px;margin-right:20px;color: #00eeee;">至</span>
              <el-date-picker
                v-model="formModel.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束时间"
                prefix-icon="iconfont iconrili"
                style="width:43%;"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1" offset="1">
            <el-button class="button-sub" size="small" @click="queryTable">查询</el-button>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="4" style="margin-left:-50px;">
            <el-form-item label="巡检类型：">
              <el-select v-model="formModel.type" placeholder="请选择巡检类型" clearable popper-class="select-option">
                <el-option label="日常巡检" value="0" />
                <el-option label="定期巡检" value="1" />
                <el-option label="专项巡检" value="2" />
                <el-option label="其他巡检" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="10" style="margin-left:-50px;">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="formModel.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择开始时间"
                prefix-icon="iconfont iconrili"
                style="width:43%;"
              /><span style="margin-left: 25px;margin-right:20px;color: #00eeee;">至</span>
              <el-date-picker
                v-model="formModel.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择结束时间"
                prefix-icon="iconfont iconrili"
                style="width:43%;"
              />
            </el-form-item>
          </el-col> -->
          <el-col :span="4" :offset="2">
            <el-button class="button-sub" size="small" @click="queryTable">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="collapse show right-bottom">
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
          <el-table-column prop="code" label="计划编号" sortable="column" show-overflow-tooltip />
          <el-table-column prop="name" label="计划名称" width="150" sortable="column" show-overflow-tooltip />
          <el-table-column prop="typeName" label="巡检类型" width="120" sortable="column" show-overflow-tooltip />
          <el-table-column prop="principalPerName" label="责任人" width="110" sortable="column" show-overflow-tooltip />
          <el-table-column prop="phone" label="联系电话" width="120" sortable="column" show-overflow-tooltip />
          <el-table-column prop="startTime" label="开始时间" width="170" sortable="column" show-overflow-tooltip />
          <el-table-column prop="endTime" label="结束时间" width="170" sortable="column" show-overflow-tooltip />
          <el-table-column prop="frequency" label="巡检频次" width="130" sortable="column" show-overflow-tooltip />
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button v-if="hasPerm('s_but_xjjh_qt')" type="text" disabled :title="titleShow" size="small" @click="showDetail(scope.row)"><i class="iconfont iconchakan" /></el-button>
              <el-button v-else type="text" title="查看" size="small" @click="showDetail(scope.row)"><i class="iconfont iconchakan" /></el-button>
              <el-button v-if="hasPerm('s_but_xjjh_sc')" type="text" disabled :title="titleShow" size="small" @click="delData(scope.row)"><i class="iconfont iconshanchu" /></el-button>
              <el-button v-else type="text" title="删除" size="small" @click="delData(scope.row)"><i class="iconfont iconshanchu" /></el-button>
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
import { getTunnelTree } from '@/api/tunnelTree'
import { checkTimes } from '@/utils/time'
import removeDialog from '@/views/baseComponents/baseRemove'
import { patrolSelectList, selectPatrolName, deletePatrol } from '@/api/projectManage'
import common from '@/utils/common'
export default {
  name: 'InspectionPlan',
  components: { removeDialog },
  data() {
    return {
      titleShow: '【权限不足，请配置权限】',
      tunId: '', // 隧道树传过来的隧道id
      formModel: {
        name: '',
        type: '',
        principalPer: '',
        startTime: '',
        endTime: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeData: [],
      // 所选择节点的id
      selectId: '',
      currentNodekey: '', // 默认高亮修改
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
      personList: [], // 责任人下拉列表
      unitIds: [],
      restaurants: [] // 计划名称下拉框
    }
  },
  // 当前页面不销毁的情况下，点击页签切换到别的路由
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('projectManage/setPlanManage', this.formModel)
    this.$store.dispatch('projectManage/setPlanTreeId', this.currentNodekey)
    next()
  },
  mounted() {
    if (this.$store.getters.planManage !== '') {
      this.formModel = this.$store.getters.planManage
    }
    if (this.$store.getters.planTreeId !== '' && this.$store.getters.planTreeId !== '-1') {
      this.tunId = this.$store.getters.planTreeId
    }
    this.loadTunnelTree()
    this.getUnitId()
    this.getPersonList()
    this.getSuperviseUnit()
  },
  methods: {
    // 远程排序
    sortChange({ column, prop, order }) {
      var propName = ''
      if (prop === 'typeName') {
        propName = 'type'
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
    // 获取计划名称
    getSuperviseUnit() {
      selectPatrolName().then(res => {
        if (res.success) {
          this.restaurants = res.data
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
    // 子组件 执行 新增、修改、删除操作时，重新加载隧道树
    reloadTree(key) {
      this.loadTunnelTree(key)
    },
    // 获取隧道树
    loadTunnelTree(key) {
      getTunnelTree().then(res => {
        if (res.success) {
          this.currentNodekey = ''
          this.treeData = res.data
          this.treeData[0].id = '-1'
          if (this.$store.getters.planTreeId !== '') {
            this.currentNodekey = this.$store.getters.planTreeId
          } else {
            this.currentNodekey = this.treeData[0].children[0].id
            this.tunId = this.treeData[0].children[0].id
          }
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.currentNodekey)
          })
          this.queryListByParam()
        } else {
          if (res.code === 10010 || res.code === 20006) {
            this.$message({
              showClose: true,
              message: res.data,
              type: 'error'
            })
          } else {
            this.$message({
              showClose: true,
              message: '查询隧道树失败',
              type: 'error'
            })
          }
        }
      }).catch()
    },
    // 树节点被点击时触发事件
    handleNodeClick(h, { level, data }) {
      if (level === 2) {
        this.tunId = data.id
        this.currentNodekey = data.id
      } else if (level === 1) {
        this.tunId = ''
        this.currentNodekey = ''
      }
      this.queryTable()
    },
    renderContent(h, { node, data, store }) {
      if (node.level === 1) {
        // el-icon-minus
        // el-icon-plus
        return (
          <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
            <span style='display:flex;'>
              <i class='iconfont iconsuidaoshu' style='margin-right:10px;color:#00eeee;'></i>
              <span>{node.label}</span>
            </span>
          </span>
        )
      } else if (node.level === 2) {
        // el-icon-minus
        // el-icon-plus
        return (
          <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
            <span style='display:flex;'>
              <i class='tunnel'></i>
              <span>{node.label}</span>
            </span>
          </span>
        )
      } else {
        return (
          <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
            <span style='margin-left:50px;'>
              <span class='childrenNode'>{node.label}</span>
            </span>
          </span>
        )
      }
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
        principalPer: this.formModel.principalPer,
        name: this.formModel.name,
        type: this.formModel.type,
        tunId: this.tunId,
        startTime: this.formModel.startTime,
        endTime: this.formModel.endTime,
        sortOrder: this.sortOrder,
        sortColumn: this.sortColumn
      }
      patrolSelectList(param).then(res => {
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
      deletePatrol(param).then(res => {
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
    // 行内删除
    delData(data) {
      this.moveShow = true
      this.ids = data.id
    },
    // 表格勾选数据
    handleSelectionChange(value) {
      this.selectedData = value
    },
    // 新增
    addReistion() {
      this.$router.push({ path: '/projectManage/addPlan', query: { tunId: this.tunId }})
    },
    // 查看详情
    showDetail(row) {
      this.$router.push({ path: '/projectManage/detailPlan', query: { id: row.id }})
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
.right-top {
  >>> .el-form-item .el-input__suffix {
    left: 170px !important;
  }
  >>> .el-form-item .el-select .el-input__suffix {
    left: 170px !important;
  }
}
</style>
