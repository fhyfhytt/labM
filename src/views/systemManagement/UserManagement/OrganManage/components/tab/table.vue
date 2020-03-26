<template>
  <div class="page-table-content">
    <div v-show="show" class="button-tool">
      <div class="button-tool-left fl" />
      <div class="button-tool-right fr">
        <el-button v-permission="'orgAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
        <el-button v-permission="'orgDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">批量删除</el-button>
      </div>

    </div>
    <el-table :data="tableDate" height="605" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="code" label="组织编号" width="" />
      <el-table-column prop="name" label="组织名称" width="" />
      <el-table-column prop="type" :formatter="typeformatter" label="组织类型" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'orgEdit'" class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
          <i v-permission="'orgSingleDelete'" class="iconfont iconxingzhuang1  scope-caozuo" title="删除" @click="handleDel(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total,sizes,prev, pager, next, jumper" :total="totalNum" :pager-count="5" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </div>
    <!--确认删除-->
    <el-dialog title="删除" :loading.sync="removeLoading" :visible.sync="moveShow" class="baseMove">
      <confirmDialog title="是否确认删除？" @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
    <!--新增界面-->
    <el-dialog v-if="addFormVisible" v-model="addFormVisible" title="新建组织" :close-on-click-modal="false" :visible.sync="addFormVisible" class="deviceAdd addmanage">
      <addMoudel :tree-id="id" @handleGetTree1="handleGetTree1" @handeladdFormVisible="handeladdFormVisible" />
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="修改组织" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleClose" class="deviceAdd addmanage">
      <editMoudel ref="childrenEdit" :tree-id="id" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { conDeleteNew } from '@/api/userManagement.js'
import addMoudel from './addMoudel.vue'
import editMoudel from './editMoudel.vue'
import confirmDialog from '@/views/baseComponents/baseConfirm'
export default {
  components: { addMoudel, editMoudel, confirmDialog },
  props: {
    tableDate: {
      type: Array,
      default: () => []
    },
    totalNum: {
      type: Number,
      default: () => 0
    },
    show: Boolean,
    treeId: {
      type: String,
      default: ''
    },
    tableLoading: Boolean
  },
  data() {
    return {
      // saveShow: false,
      pageSize: 10,
      pageNumber: 1,
      currentPage: 1, // 直接前往第几页
      // total: 0,
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      row: {}, // 编辑初始化内容
      multipleSelection: [], // 选择的table数据的对象组成的数组
      delTableById: [], // 删除数据传参的id数组
      moveShow: false, // //确认删除弹框是否显示
      // removeDioag: false // 确认删除
      id: '', // //确认删除弹框是否显示
      loading: true,
      removeLoading: false
    }
  },
  watch: {
    treeId: function() {
      this.id = this.treeId
    },
    tableLoading: function() {
      this.loading = this.tableLoading
    }
    // total: function() {
    //   this.total = this.totalNum
    // }
  },
  mounted() {
  },
  methods: {
    // 新建数据域未保存提示
    // saveShowConfirm() {
    //   this.saveShow = false
    //   this.addFormVisible = false
    // },
    // saveShowCancel() {
    //   this.saveShow = false
    // },
    // 重新刷新页面
    handleGetTree1() {
      // this.$emit('handleGetTree')
      this.$emit('refresh', { loading: true })
    },
    // 选择table数据  删除的项
    handleSelectionChange(val) {
      this.delTableById = []
      this.multipleSelection = val
      this.multipleSelection.map(value => {
        this.delTableById.push(value.id)
      })
    },
    // 新增
    handleAdd() {
      this.addFormVisible = true
    },
    // 取消新增
    handeladdFormVisible(addFormVisible) {
      this.addFormVisible = false
    },

    // 批量删除
    handleSelectDel() {
      if (this.delTableById.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.moveShow = true
      }
    },
    // 删除
    handleDel(index, row) {
      // this.delTableById.push(row.id)
      this.delTableById = [row.id]
      this.moveShow = true
    },
    // 确认删除
    sureMsg(flag) {
      // const param = { tableName: 'sys_manage_center', columnName: 'id', values: this.delTableById }
      const param = { ids: this.delTableById.join(',') }
      var that = this
      this.removeLoading = true
      conDeleteNew(param).then(response => {
        that.removeLoading = false
        that.moveShow = flag
        if (response.success === true) {
          this.$message.success(response.msg)
          this.handleGetTree1()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.msg)
      })
    },
    // 取消删除
    confireMsg(flag) {
      this.moveShow = flag
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row)
      this.row = row
      // console.log('this', row)
      this.editFormVisible = true
    },
    // 取消编辑
    handeleditFormVisible(editFormVisible) {
      this.editFormVisible = false
    },
    handleClose(done) {
      // if (this.$refs.childrenEdit) {
      //   this.$refs.childrenEdit.handeleditFormVisible()
      // }
      done()
      this.handleGetTree1()
      // this.$refs.childrenEdit.clearDate()
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNumber: this.pageNumber })
    },
    handleCurrentChange(val) {
      this.pageSize = 10
      this.pageNumber = val
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNumber: this.pageNumber })
    },
    handleJumper(currentPage) { },
    // // 刷新
    // handleRes(val) {
    //   // this.handleSizeChange(val)
    // },
    // // 切换
    // handleQiHuan() {},
    // // 下载
    // handleDownload() {}
    // // 组织类型数据转换
    typeformatter(row, column) {
      const type = row.type
      if (type === '9cbf144f21044b1e8510f9e607addcbc') {
        return '业务'
      } else if (type === '8baa547b59504e8cb25424446222ab8d') { return '管理' }
    }
  }
}
</script>

<style lang="scss">
</style>
