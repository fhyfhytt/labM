<template>
  <div class="pageRow">
    <el-row>
      <!--树结构-->
      <el-col :xl="{span:3}" :lg="{span:5}">
        <div class="tree-div">
          <div class="inline-div">
            <el-tree ref="tree" v-loading="treeloading" :current-node-key="currentNodekey" :data="treedata" node-key="id" default-expand-all :props="defaultProps" :highlight-current="true" :expand-on-click-node="false" @node-click="handleNodeClick">
              <span slot-scope="{ node, data }" class="custom-tree-node span-ellipsis">
                <span v-if="data.children" :title="data.name">
                  <i class="iconfont iconzuzhi" />{{ data.name }}
                </span>
                <span v-else style="paddingLeft:16px;" :title="data.name">
                  <i class="iconfont iconbumen" />{{ data.name }}
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :xl="{span:21}" :lg="{span:19}" class="right-page">
        <el-row>
          <el-col>
            <div class="right-page-title">
              <el-form ref="form1" :model="formRegion" size="small" label-width="110px" :inline="true">
                <el-row>
                  <el-form-item label="数据域名称：">
                    <el-input v-model="formRegion.name" style="background:transparent;width:150px;" placeholder="请输入数据域名称" />
                  </el-form-item>
                  <el-form-item>
                    <el-button v-permission="'regionSearch'" size="small" class="button-sub" @click="searchData">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="right-page-table">
            <div class="page-table-content">
              <div class="button-tool">
                <div class="button-tool-left fl" />
                <div class="button-tool-right fr">
                  <el-button v-permission="'regionAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
                  <el-button v-permission="'regionDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleDelAll">批量删除</el-button>
                </div>

              </div>

              <el-table ref="roleInfo" v-loading="loading" :data="tableData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
                <el-table-column type="selection" width="60" />
                <el-table-column type="index" label="序号" />
                <el-table-column prop="name" label="数据域名称" />
                <el-table-column prop="description" label="描述" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <i v-permission="'regionEdit'" class="iconfont iconbianji1 scope-caozuo" style="cursor:pointer" title="编辑" @click.stop="handleEdit(scope.$index, scope.row)" />
                    <i v-permission="'regionSingleDelete'" class="iconfont iconxingzhuang1  scope-caozuo" style="cursor:pointer" title="删除" @click.stop="handleDel(scope.$index, scope.row)" />
                  </template>
                </el-table-column>
              </el-table>
              <div class="numListJup margin-jump">
                <el-pagination
                  :page-size="pageSize"
                  :page-sizes="[10, 20, 50, 100]"
                  layout="total,sizes,prev, pager, next, jumper"
                  :total="totalCount"
                  :pager-count="5"
                  :current-page.sync="currentPage"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>

    <!-- 弹框 -->
    <div class="childrenlog">
      <!--新增/编辑界面 :tree-id="id" -->
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleClose" class="addRoleDialog" width="45%">
        <addMoudel ref="addEditRole" :tree-id="id" @refresh="getTreeData" @reset-save-flag="resetSaveFlag" @closeAddRole="closeAddRole" />
      </el-dialog>
      <!-- 弹出框 -->
      <el-dialog title="提示" :visible.sync="saveShow" class="baseMove">
        <confirmDialog title="关闭后所填写的数据将不会保存，是否关闭?" @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog>
      <el-dialog title="删除" :visible.sync="confirmVisible" class="baseMove">
        <confirmDialog title="将同时删除该数据域与组织的关系，是否删除？" @sureMsg="confirmBtn" @confireMsg="cancelBtn" />
      </el-dialog>
      <el-dialog title="批量删除" :visible.sync="confirmAllVisible" class="baseMove">
        <confirmDialog title="将同时删除该数据域与组织的关系，是否删除？" @sureMsg="confirmAllBtn" @confireMsg="cancelAllBtn" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRegionList, delRegion, getRegionTree, getRegionChildren } from '@/api/userManagement.js'
import { setTreeData } from '@/utils/utils.js' // tree深度遍历方法引入 -0312
import confirmDialog from '@/views/baseComponents/baseConfirm'
import addMoudel from './addMoudel.vue'
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
      formRegion: {
        name: '' // 数据域名称
      },
      flag: true,
      dialogName: '新建',
      confirmVisible: false,
      confirmAllVisible: false,
      // alertText: '是否删除 ?',
      deleteParam: {},
      roleData: {},
      addFlag: false, // 新增完成标识
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      CloseAddFormVisible: false, // 取消新增界面
      multipleSelection: [], // 选择的table数据的对象组成的数组
      delTableById: [], // 删除数据传参的id数组
      loading: true,
      treedata: [], // 数据域tree树
      currentNodekey: '', // 默认高亮修改
      expandedkeys: [], // 默认高亮修改
      id: '', // 获取tree树的id
      selectTree: {}, // 获取点击tree树的的整个对象数据
      type: '', // 点击tree传参type
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeloading: true,
      treeName: '', // 上级管理中心名称
      treeId: '', // 上级管理中心id
      param: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    treeId: function() {
      this.id = this.treeId
    }
  },
  created() {
    // this.getList()
  },
  mounted() {
    this.getTreeData() // 获取tree树 -0312
  },
  methods: {
    // 获取tree树数据 -0312
    getTreeData(value) {
      if (value) {
        this.treeloading = value.loading
      }
      getRegionTree().then(response => {
        this.treeloading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data)
          if (response.data.length > 0) {
            if (this.treeId === '') {
              this.treeId = this.treedata[0].id
            }
            this.currentNodekey = this.treeId
            this.expandedkeys.push(this.treeId)
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.currentNodekey)
            })
            this.param.regionId = this.treeId || 0
            this.getTableData()
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.message)
      })
    },

    // 点击tree,获取子数据域，渲染列表 -0312
    getTableData() {
      getRegionChildren(this.param)
        .then(response => {
          this.loading = false
          if (response.code === 0) {
            // .filter(item => item.parentId === this.treeId)
            this.tableData = response.data.filter(item => item.parentId === this.treeId)
            this.totalCount = Number(response.data.length)
          } else {
            this.tableData = []
            this.totalCount = 0
            this.$message.error(response.msg)
          }
        })
        .catch(response => {
          this.tableData = []
          this.totalCount = 0
          this.$message.error(response.msg)
        })
    },
    // 点击tree树,重新渲染列表
    handleNodeClick(data) {
      this.param.regionId = data.id
      // this.currentNodekey = data.id
      this.treeId = data.id
      this.getTableData()
    },

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
    // 点击查询，重新渲染数据域列表
    searchData() {
      this.pageNumber = 1
      this.getList()
    },
    // 重新刷新页面
    // handleGetTree1() {
    // },
    // 查询列表数据
    getList() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        name: this.formRegion.name
      }
      getRegionList(param).then(response => {
        this.loading = false
        if (response.success === true) {
          // .filter(item => item.parentId === this.currentNodekey)
          this.tableData = response.data.rows || []
          this.totalCount = Number(response.data.totalCount)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.msg)
      })
    },

    // 点击新增弹出新增页面moudel框
    handleAdd() {
      this.dialogName = '新建数据域'
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
        // this.getList()
        this.getTableData()
      }
    },
    closeAddRole() {
      this.addFormVisible = false
      // this.getList()
      this.getTableData()
      // this.handleGetTree1()
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
      var regionIdList = []
      this.multipleSelection.map(item => {
        regionIdList.push(item.id)
      })
      delRegion({ regionIdList }).then(res => {
        if (res.success === true) {
          this.$message.success('删除成功')
          // this.getList()
          this.getTableData()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {})
    },
    confirmBtn() {
      this.confirmVisible = false
      delRegion(this.deleteParam).then(response => {
        if (response.success === true) {
          this.$message.success('删除成功')
          // this.getList()
          this.getTableData()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response)
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
      this.dialogName = '修改数据域'
      this.addFormVisible = true
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
      this.deleteParam = { regionIdList: [row.id] }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      // this.getList()
      this.getTableData()
    },
    // 分页  点击哪一页跳到哪一页
    handleCurrentChange(val) {
      this.pageNumber = val
      // this.getList()
      this.getTableData()
    }
  }
}
</script>
<style scoped>
  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
<style lang="scss" scoped>
.RegionManage{
    .addRoleDialog >>> .el-dialog{
      border-radius: 10px;
      color: #01E6E9;
      background:transparent;
      border:1px solid #379EFC;
      background-image: url(/static/img/bgTwo.a178d248.png)!important;
      background-size: 100% 100%;
      overflow: hidden;
      .el-table__body {
        width:100%
      }
      .el-tree::-webkit-scrollbar{
        width: 0 !important
      }
      .el-tree{
        background: transparent;
        overflow-y: auto;
        .el-tree__empty-block{
          background: transparent
        }
        .el-tree__empty-text{
          color: #ffffff
        }
        .el-checkbox__inner{
          top: 3px;
          border:1px solid #379EFC;
          background:transparent
        }
        .el-tree-node__label{
          color: #ffffff
        }
        .el-tree-node__content{
          background: none;
          &:hover{
            opacity: 0.5;
          }
        }
        .el-tree-node__children .el-tree-node__content::before {
          content: "";
          border-left: 1px dashed #006a78;
          height: 100vh;
          overflow-y: auto;
          width: 1px;
          position: absolute;
          left: 15px;
          top: -12px;
        }
        .el-tree-node__children .el-tree-node__content::after {
          content: "";
          border-top: 1px dashed #006a78;
          height: 1px;
          width: 10px;
          position: absolute;
          left:16px
        }
        .el-tree-node__expand-icon.expanded {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        .el-icon-caret-right:before {
          background: url("../../../../../public/img/jia.png") no-repeat center center;
          content: "";
          display: block;
          width: 18px;
          height: 18px;
          font-size: 18px;
          background-size: 18px;
        }
        .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
          background: url("../../../../../public/img/jian.png") no-repeat center center;
          content: "";
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
      .bkb{
        height: 1px;
      width: 90%;
      margin: -1px auto 0;
      background: radial-gradient(#53e3fd 20%, transparent 80%);
      }
      .el-table::-webkit-scrollbar{
    width: 0 !important
  }
      .el-table{
        border: 1px solid #379EFC;
        border-radius: 4px;
        overflow-y: auto;
        .cell{
          border-bottom: 1px solid rgba(80,220,245,0.39)
        }
        th>.cell{
          border: none
        }
        .el-table__empty-text{
          color: #ffffff
        }
        // .el-table__row.hover-row{
        //   background: #50dcf5
        // }
        .el-table__row.current-row{
          background: #0099ff
        }
      }
      .el-dialog__header{
        text-align: left;
        margin:0 auto;
        font-size: 14px;
        padding:0 0 0 16px;
        background: linear-gradient(to bottom, rgba(83,227,253,1) 0%, rgba(83,227,253,0.0) 100%);
        color:#379EFC;
        width: 100%;
        height: 34px;
        line-height: 34px;
        .el-dialog__title{
          color: #379EFC;
          font-size: 14px;
          font-weight: bold;
          line-height: 34px;
        }
      }
      .el-dialog__body{
        // padding:0 20px;
        font-size: 14px;
        color:#379EFC
      }
      .el-tabs__item{
        color: #ffffff;
        &.is-active{
         color: #379EFC
        }
      }
      .el-tabs__nav-wrap::after{
        background: rgba(83,227,253,0.4) !important
      }
      .el-tabs__active-bar{
        background: #379EFC
      }
      .el-tabs__item:hover{
        color: #379EFC
      }
      .el-dialog__headerbtn{
        outline: none;

        i{
          color: #379EFC;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .RegionManage-title{
        margin: 1%;
        // padding-left:20px;
        background-size: 100% 100%;
        border-radius: 5px;
        border: 1px solid #50DCF5;
        padding-top:1.5%;
        .el-table .cell{
          height: 43px;
          line-height: 43px;
          border-bottom:1px solid #379EFC
        }
        .el-table th>.cell{
          border: none
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
          color: #379EFC;
          opacity: 0.9;
        }
        .el-textarea__inner {
          background-color: transparent;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color:rgba(255,255,255,1);
          border:1px solid rgba(80,220,245,0.7);
          &:focus {
            border:1px solid rgba(80,220,245,1);
          }
        }
        >>> .el-form-item__label{
          color: #379EFC
        }
      >>> .el-input--small .el-input__inner {
          background-color: transparent;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          border:1px solid rgba(80,220,245,0.7);
          &:focus {
            border:1px solid rgba(80,220,245,1);
          }
        }
        .el-input--small.is-focus .el-input__inner {
          background-color: transparent;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
          border:1px solid rgba(80,220,245,1);
        }
        .el-form-item__label {
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #379EFC;
          opacity: 0.9;
        }
        input::-webkit-input-placeholder {
          opacity: 0.5;
        }
        textarea::-webkit-input-placeholder {
          opacity: 0.5;
        }
    }
    .RegionManage-table{
       margin: 0 1%;
       background-size: 100% 100%;
       border-radius: 5px;
      //  padding:0 20px;
       border: 1px solid #50DCF5;
       >>>.button-tool{
         padding-top:1%;
       }
       .scope-caozuo{
          margin-left: 12px;
          margin-right:8px;
          color:#00FFFF;
          font-size: 16px;
       }
       >>> .el-table .cell{
          height: 43px;
          line-height: 43px;
          border-bottom:1px solid rgba(80,220,245,0.39)
        }
        >>> .el-table th>.cell{
          border: none
        }
    }
    .childrenlog{
      .dialog-content{
        color: #379EFC;
        font-size: 16px;
        // margin-top: 60px;
        padding-top: 20px;
        margin-bottom: 40px;
      }
      .dialog-footer{
        text-align: center;
      }
    }
}
</style>

