<template>
  <div class="page-table-content">
    <div v-show="show" class="button-tool">
      <div class="button-tool-left fl" />
      <div class="button-tool-right fr">
        <el-button v-permission="'classFactionAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
        <el-button v-permission="'classifactionDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">批量删除</el-button>
      </div>
      <!-- <el-button-group style="float:right;margin-right:10px;">
        <el-button icon="iconfont iconshuaxin" size="small" style="margin-right:0px" title="刷新" @click="handleRes(val)" />
        <el-button icon="iconfont iconmoban" size="small" title="切换" @click="handleQiHuan" />
        <el-button icon="iconfont iconxiazai" size="small" title="Export data" @click="handleDownload" />
      </el-button-group> -->
    </div>
    <el-table v-loading="loading" :data="tableDate" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="编号" />
      <el-table-column prop="code" label="区域编号" />
      <el-table-column prop="name" label="区域名称" />

      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'classFactionEdit'" class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
          <i v-permission="'classSingleDelete'" class="iconfont iconxingzhuang1  scope-caozuo" title="删除" @click="handleDel(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="height:605px;color:#fff">
      <el-row>
        <el-col :span="12">
          <div>管理中心编号:</div><div>管理中心名称:</div>
        </el-col>
        <el-col :span="12">
          <div>{{ tableDate.code }}</div>
        </el-col>
      </el-row>
    </div> -->
    <div class="numListJup margin-jump">
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
    </div>
    <el-dialog title="删除" :loading.sync="removeLoading" :visible.sync="moveShow" class="baseMove">
      <baseConfirm @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
    <!--新增界面-->
    <el-dialog v-if="addFormVisible" v-model="addFormVisible" title="新建分类" :close-on-click-modal="false" :visible.sync="addFormVisible" class="deviceAdd addmanage">
      <addMoudel :tree-id="id" @handleGetTree1="handleGetTree1" @handeladdFormVisible="handeladdFormVisible" />
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="修改分类" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleClose" class="deviceAdd addmanage">
      <editMoudel ref="childrenEdit" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { delArea } from '@/api/area.js'
import addMoudel from './addMoudel.vue'
import editMoudel from './editMoudel.vue'
import baseConfirm from '@/views/baseComponents/baseConfirm'
export default {
  components: { addMoudel, editMoudel, baseConfirm },
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
      pageSize: 10,
      pageNumber: 1,
      currentPage: 1, // 直接前往第几页
      hide: !this.total,
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      row: {}, // 编辑初始化内容
      multipleSelection: [], // 选择的table数据的对象组成的数组
      delTableById: [], // 删除数据传参的id数组
      moveShow: false,
      id: '', // //确认删除弹框是否显示
      loading: true,
      removeLoading: false// removeDioag: false // 确认删除
    }
  },
  watch: {
    treeId: function() {
      this.id = this.treeId
    },
    tableLoading: function() {
      this.loading = this.tableLoading
    }
  },
  mounted() {

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
      // console.log('delTableById', this.delTableById)
    },
    // 新增
    handleAdd() {
      console.log(this.treeId)
      this.addFormVisible = true
    },
    // 取消新增
    handeladdFormVisible(addFormVisible) {
      this.addFormVisible = false
    },

    // 批量删除
    handleSelectDel() {
      if (this.multipleSelection.length === 0) {
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
      delArea(param).then(response => {
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
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNumber: this.pageNumber, loading: true })
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNumber: this.pageNumber, loading: true })
    },
    handleJumper(currentPage) {},
    // // 刷新
    // handleRes(val) {
    //   // this.handleSizeChange(val)
    // },
    // // 切换
    // handleQiHuan() {},
    // // 下载
    // handleDownload() {}
    formatter(row, column, cellValue, index) {
      return row.status === '1' ? '启用' : '未启用'
    }
  }
}
</script>

<style lang="scss">

</style>
