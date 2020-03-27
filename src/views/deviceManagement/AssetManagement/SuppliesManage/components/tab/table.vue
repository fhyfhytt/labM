<template>
  <div class="page-table-content">
    <div v-show="show" class="button-tool">
      <div class="button-tool-right fr">
        <el-button v-permission="'suppliesAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
        <el-button v-permission="'suppliesDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">批量删除</el-button>
      </div>
    </div>
    <el-table :data="tableDate" height="605" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="assetNo" label="物资编码" width="" />
      <el-table-column prop="code" label="操作编码" width="" />
      <el-table-column prop="assetName" label="物资名称" width="" />
      <el-table-column prop="unitType" label="设备型号" />
      <el-table-column prop="factory" label="设备厂商" width="" />
      <el-table-column prop="itemType" label="物资分类" width="" />
      <el-table-column prop="price" label="物资价格" width="" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'suppliesEdit'" class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
          <i v-permission="'suppliesSingleDelete'" class="iconfont iconxingzhuang1  scope-caozuo" title="删除" @click="handleDel(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total,sizes,prev, pager, next, jumper" :total="total" :pager-count="5" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </div>
    <!--确认删除-->
    <el-dialog title="删除" :loading.sync="removeLoading" :visible.sync="moveShow" class="baseMove">
      <confirmDialog title="是否确认删除？" @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
    <!--新增界面-->
    <el-dialog v-if="addFormVisible" v-model="addFormVisible" title="物资新增" :close-on-click-modal="false" :visible.sync="addFormVisible" class="deviceAdd addmanage">
      <addMoudel :tree-id="id" :supplies-type="suppliesType" @handleGetTree1="handleGetTree1" @handeladdFormVisible="handeladdFormVisible" />
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="物资修改" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleClose" class="deviceAdd addmanage">
      <editMoudel ref="childrenEdit" :supplies-type="suppliesType" :tree-id="id" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { suppliesDelete } from '@/api/deviceManage.js'
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
    tableLoading: Boolean,
    suppliesType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // saveShow: false,
      pageSize: 10,
      pageNumber: 1,
      currentPage: 1, // 直接前往第几页
      total: 0,
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
    },
    suppliesType: function() {

    }
  },
  methods: {
    // 重新刷新页面
    handleGetTree1() {
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
      this.delTableById = [row.id]
      this.moveShow = true
    },
    // 确认删除
    sureMsg(flag) {
      const param = { ids: this.delTableById.join(',') }
      var that = this
      this.removeLoading = true
      suppliesDelete(param).then(response => {
        that.removeLoading = false
        that.moveShow = flag
        if (response.success === true) {
          this.$message.success(response.msg)
          this.handleGetTree1()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },
    // 取消删除
    confireMsg(flag) {
      this.moveShow = flag
    },
    // 编辑
    handleEdit(index, row) {
      this.row = row
      this.editFormVisible = true
    },
    // 取消编辑
    handeleditFormVisible(editFormVisible) {
      this.editFormVisible = false
    },
    handleClose(done) {
      done()
      this.handleGetTree1()
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
    handleJumper(currentPage) { }
    // // 刷新
    // handleRes(val) {
    //   // this.handleSizeChange(val)
    // },
    // // 切换
    // handleQiHuan() {},
    // // 下载
    // handleDownload() {}
  }
}
</script>

<style lang="scss">
</style>
