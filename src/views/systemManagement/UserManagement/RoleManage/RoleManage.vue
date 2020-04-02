<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="formRole" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:5}">
            <el-form-item label="角色名称：">
              <el-input v-model="formRole.name" style="background:transparent" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:5}">
            <el-form-item label="状态：">
              <el-select v-model="formRole.status" popper-class="select-option" clearable placeholder="-请选择-">
                <el-option label="启用" value="1" />
                <el-option label="未启用" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:5}">
            <el-button v-permission="'roleSearch'" size="small" class="button-sub" style="margin-left:24px" @click="searchData">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="page-table">
      <div class="page-table-content">
        <div class="button-tool">
          <div class="button-tool-right fr">
            <el-button v-permission="'roleAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
            <el-button v-permission="'roleDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleDelAll">批量删除</el-button>
          </div>
        </div>
        <el-table ref="roleInfo" v-loading="loading" :data="tableData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" />
          <el-table-column prop="name" label="角色名" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="status" label="状态" :formatter="formStatus" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i v-permission="'roleEdit'" class="iconfont iconbianji1 scope-caozuo" style="cursor:pointer" title="编辑" @click.stop="handleEdit(scope.$index, scope.row)" />
              <i v-permission="'roleDeleteSingle'" class="iconfont iconxingzhuang1  scope-caozuo" style="cursor:pointer" title="删除" @click.stop="handleDel(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <div class="numListJup margin-jump">
          <el-pagination :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total,sizes,prev, pager, next, jumper" :total="totalCount" :pager-count="5" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          <!-- <div class="sendAllBtn">
            <span>跳转</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="childrenlog">
      <!--新增界面-->
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleClose" class="addRoleDialog" width="45%">
        <addMoudel ref="addEditRole" @reset-save-flag="resetSaveFlag" @closeAddRole="closeAddRole" />
      </el-dialog>
      <!-- 确定弹出框 -->
      <!-- <el-dialog title="提示信息" :visible.sync="confirmVisible" append-to-body class="typeInfoAdd outGoing">
        <div class="sureRemove" style="font-size:16px;">{{ alertText }}</div>
        <div class="goOut">
          <el-button size="small" class="button-sub" @click="confirmBtn">确认</el-button>
          <el-button size="small" class="button-cancel" @click="cancelBtn">取消</el-button>
        </div>
      </el-dialog> -->
      <!-- 弹出框 -->
      <el-dialog title="提示" :visible.sync="saveShow" class="baseMove">
        <confirmDialog title="关闭后所填写的数据将不会保存，是否关闭" @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog>
      <el-dialog title="删除" :visible.sync="confirmVisible" class="baseMove">
        <confirmDialog title="将同时删除该角色与权限的关系，是否删除？" @sureMsg="confirmBtn" @confireMsg="cancelBtn" />
      </el-dialog>
      <el-dialog title="批量删除" :visible.sync="confirmAllVisible" class="baseMove">
        <confirmDialog title="将同时删除该角色与权限的关系，是否删除？" @sureMsg="confirmAllBtn" @confireMsg="cancelAllBtn" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, deleteRole } from '@/api/roleManage'
import confirmDialog from '@/views/baseComponents/baseConfirm'
import addMoudel from './addMoudel.vue'
// import baseRemove from '@/views/baseComponents/baseRemove'
export default {
  components: { addMoudel, confirmDialog },
  data() {
    return {
      saveShow: false, // 未保存提示
      saveShowFlag: true, // 子组件标识
      tableData: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 直接前往第几页
      formRole: {
        name: '', // 角色名称
        status: ''
      },
      flag: true,
      dialogName: '新建角色',
      confirmVisible: false,
      confirmAllVisible: false,
      alertText: '是否删除 ?',
      deleteParam: {},
      roleData: {},
      addFlag: false, // 新增完成标识
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      CloseAddFormVisible: false, // 取消新增界面
      multipleSelection: [], // 选择的table数据的对象组成的数组
      delTableById: [], // 删除数据传参的id数组
      loading: true
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // 查询--进入页面显示table表格
    // this.getList()
  },
  methods: {
    // 未保存弹出框
    sureMsg() {
      this.saveShow = false
      this.addFormVisible = false
    },
    confireMsg(flag) {
      this.saveShow = false
    },
    resetSaveFlag(flag) {
      if (flag === true) {
        this.saveShowFlag = true
      } else {
        this.saveShowFlag = false
      }
    },
    // 点击行选中
    selectRow(row) {
      this.$refs.roleInfo.toggleRowSelection(row)
    },
    handleSelectRow(val) {
      this.multipleSelection = val
    },
    searchData() {
      this.pageNumber = 1
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    // 查询
    getList() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        name: this.formRole.name,
        status: this.formRole.status
      }
      getRoleList(param).then(response => {
        this.loading = false
        if (response.code === 0) {
          this.tableData = response.data.rows || []
          this.totalCount = Number(response.data.totalCount)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.msg)
      })
    },
    // table表格内容替换
    formStatus(row, column) {
      if (row.status) {
        if (row.status === '1') {
          return '启用'
        } else {
          return '未启用'
        }
      }
    },
    // 点击新增弹出新增页面moudel框
    handleAdd() {
      this.dialogName = '新建角色'
      this.addFormVisible = true
      this.addFlag = false
      this.$nextTick(() => {
        this.$refs.addEditRole.addEditRoleDialog()
        this.$refs.addEditRole.clearContent()
      })
    },
    // 取消新增
    handleClose(done) {
      if (this.saveShowFlag) {
        this.saveShow = true
      } else {
        this.saveShow = false
        this.saveShowFlag = false
        done()
        this.getList()
      }
    },
    closeAddRole() {
      this.addFormVisible = false
      this.getList()
    },
    // 关闭新增页面  是 否
    addClose() {
      this.$refs.addEditRole.clearContent()
      this.CloseAddFormVisible = false
      this.addFormVisible = false
    },
    addNoClose() {
      this.CloseAddFormVisible = false
    },
    // 批量删除确认
    confirmAllBtn() {
      this.confirmAllVisible = false
      var roleIdList = []
      this.multipleSelection.map(item => {
        roleIdList.push(item.id)
      })
      deleteRole({ roleIdList }).then(res => {
        if (res.success === true) {
          this.deleteParam = []
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => { })
    },
    confirmBtn() {
      this.confirmVisible = false
      deleteRole(this.deleteParam).then(response => {
        if (response.success === true) {
          this.deleteParam = []
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.msg)
      })
    },
    cancelAllBtn() {
      this.confirmAllVisible = false
    },
    cancelBtn() {
      this.confirmVisible = false
    },
    // 编辑弹出编辑页面moudel框
    handleEdit(index, row) {
      var data = JSON.parse(JSON.stringify(row))
      this.dialogName = '修改角色'
      this.addFormVisible = true
      this.addFlag = true
      this.$nextTick(() => {
        this.$refs.addEditRole.addEditRoleDialog(data)
      })
    },
    // 批量删除
    handleDelAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.confirmAllVisible = true
      }
    },
    // 删除
    handleDel(index, row) {
      this.confirmVisible = true
      this.deleteParam = { roleIdList: [row.id] }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getList()
    },
    // 分页  点击哪一页跳到哪一页
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.RoleManage {
  .addRoleDialog >>> .el-dialog {
    border-radius: 10px;
    color: #01e6e9;
    background: transparent;
    border: 1px solid #379efc;
    background-image: url(/static/img/bgTwo.a178d248.png) !important;
    background-size: 100% 100%;
    overflow: hidden;
    .el-table__body {
      width: 100%;
    }
    .el-tree::-webkit-scrollbar {
      width: 0 !important;
    }
    .el-tree {
      background: transparent;
      overflow-y: auto;
      .el-tree__empty-block {
        background: transparent;
      }
      .el-tree__empty-text {
        color: #ffffff;
      }
      .el-checkbox__inner {
        top: 3px;
        border: 1px solid #379efc;
        background: transparent;
      }
      .el-tree-node__label {
        color: #ffffff;
      }
      .el-tree-node__content {
        background: none;
        &:hover {
          opacity: 0.5;
        }
      }
      .el-tree-node__children .el-tree-node__content::before {
        content: '';
        border-left: 1px dashed #006a78;
        height: 100vh;
        overflow-y: auto;
        width: 1px;
        position: absolute;
        left: 15px;
        top: -12px;
      }
      .el-tree-node__children .el-tree-node__content::after {
        content: '';
        border-top: 1px dashed #006a78;
        height: 1px;
        width: 10px;
        position: absolute;
        left: 16px;
      }
      .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      .el-icon-caret-right:before {
        background: url('../../../../../public/img/jia.png') no-repeat center
          center;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        font-size: 18px;
        background-size: 18px;
      }
      .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
        background: url('../../../../../public/img/jian.png') no-repeat center
          center;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        font-size: 18px;
        background-size: 18px;
      }
      .el-tree-node__expand-icon.is-leaf::before {
        // display: none;
        visibility: hidden;
      }
    }
    .bkb {
      height: 1px;
      width: 90%;
      margin: -1px auto 0;
      background: radial-gradient(#53e3fd 20%, transparent 80%);
    }
    .el-table::-webkit-scrollbar {
      width: 0 !important;
    }
    .el-table {
      border: 1px solid #379efc;
      border-radius: 4px;
      overflow-y: auto;
      .cell {
        border-bottom: 1px solid rgba(80, 220, 245, 0.39);
      }
      th > .cell {
        border: none;
      }
      .el-table__empty-text {
        color: #ffffff;
      }
      // .el-table__row.hover-row{
      //   background: #50dcf5
      // }
      .el-table__row.current-row {
        background: #0099ff;
      }
    }
    .el-dialog__header {
      text-align: left;
      margin: 0 auto;
      font-size: 14px;
      padding: 0 0 0 16px;
      background: linear-gradient(
        to bottom,
        rgba(83, 227, 253, 1) 0%,
        rgba(83, 227, 253, 0) 100%
      );
      color: #379efc;
      width: 100%;
      height: 34px;
      line-height: 34px;
      .el-dialog__title {
        color: #379efc;
        font-size: 16px;
        font-weight: bold;
        line-height: 34px;
      }
    }
    .el-dialog__body {
      // padding:0 20px;
      font-size: 14px;
      color: #379efc;
    }
    .el-tabs__item {
      color: #ffffff;
      &.is-active {
        color: #379efc;
      }
    }
    .el-tabs__nav-wrap::after {
      background: rgba(83, 227, 253, 0.4) !important;
    }
    .el-tabs__active-bar {
      background: #379efc;
    }
    .el-tabs__item:hover {
      color: #379efc;
    }
    .el-dialog__headerbtn {
      outline: none;

      i {
        color: #379efc;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .RoleManage-title {
    margin: 1%;
    // padding-left:20px;
    background-size: 100% 100%;
    border-radius: 5px;
    border: 1px solid #50dcf5;
    padding-top: 1.5%;
    .el-table .cell {
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #379efc;
    }
    .el-table th > .cell {
      border: none;
    }
    .el-card__body {
      padding: 0;
    }
    .el-collapse {
      border-bottom: 0;
      border-top: 0;
    }
    .el-collapse-item__wrap {
      background: transparent;
      border-bottom: 0;
    }
    .el-collapse-item__header {
      background: transparent;
      border-bottom: 0;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #379efc;
      opacity: 0.9;
    }
    .el-textarea__inner {
      background-color: transparent;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(80, 220, 245, 0.7);
      &:focus {
        border: 1px solid rgba(80, 220, 245, 1);
      }
    }
    >>> .el-form-item__label {
      color: #379efc;
    }
    >>> .el-input--small .el-input__inner {
      background-color: transparent;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(80, 220, 245, 0.7);
      &:focus {
        border: 1px solid rgba(80, 220, 245, 1);
      }
    }
    .el-input--small.is-focus .el-input__inner {
      background-color: transparent;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(80, 220, 245, 1);
    }
    .el-form-item__label {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #379efc;
      opacity: 0.9;
    }
    input::-webkit-input-placeholder {
      opacity: 0.5;
    }
    textarea::-webkit-input-placeholder {
      opacity: 0.5;
    }
  }
  .RoleManage-table {
    margin: 0 1%;
    background-size: 100% 100%;
    border-radius: 5px;
    //  padding:0 20px;
    border: 1px solid #50dcf5;
    .button-tool {
      padding-top: 1%;
    }
    .scope-caozuo {
      margin-left: 12px;
      margin-right: 8px;
      color: #00ffff;
      font-size: 16px;
    }
    >>> .el-table .cell {
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid rgba(80, 220, 245, 0.39);
    }
    >>> .el-table th > .cell {
      border: none;
    }
  }
  .childrenlog {
    .dialog-content {
      color: #379efc;
      font-size: 16px;
      // margin-top: 60px;
      padding-top: 20px;
      margin-bottom: 40px;
    }
    .dialog-footer {
      text-align: center;
    }
  }
}
</style>

