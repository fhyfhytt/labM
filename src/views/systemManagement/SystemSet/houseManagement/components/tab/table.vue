<template>
  <div class="page-table-content">
    <div class="button-tool">
      <div class="button-tool-left fl" />
      <div class="button-tool-right fr">
        <el-button v-permission="'houseAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
        <el-button v-permission="'houseDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">批量删除</el-button>
      </div>
    </div>
    <el-table v-loading="tableload" :data="tableDate" empty-text="无数据" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="code" label="库房编号" width="110" />
      <el-table-column prop="name" label="库房名称" width="140" />

      <el-table-column prop="type" label="库房类型" />
      <el-table-column prop="state" label="库房状态" />
      <el-table-column prop="person" label="库房管理员" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'houseEdit'" class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
          <i v-permission="'houseDelete'" class="iconfont iconxingzhuang1  scope-caozuo" title="删除" @click="handleDel(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination :page-size="pageSize" layout="total,sizes,prev, pager, next, jumper" :total="totalNum" :pager-count="5" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-loading="loading" title="删除" :visible.sync="moveShow" class="baseMove">
      <baseConfirm @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
    <!--新增界面-->
    <el-dialog v-if="addFormVisible" v-model="addFormVisible" title="新建库房" :close-on-click-modal="false" :visible.sync="addFormVisible" class="deviceAdd addmanage">
      <addMoudel @handleGetTree1="handleGetTree1" @handeladdFormVisible="handeladdFormVisible" />
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="修改库房" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleClose" class="deviceAdd addmanage">
      <editMoudel ref="childrenEdit" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
// import { conDelete } from '@/api/manage.js'
import { deleteHouse } from '@/api/house.js'
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
    currentPage: {
      type: Number,
      default: () => 1
    },
    tableLoading: Boolean
  },
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      row: {}, // 编辑初始化内容
      multipleSelection: [], // 选择的table数据的对象组成的数组
      delTableById: [], // 删除数据传参的id数组
      moveShow: false, // //确认删除弹框是否显示
      loading: false,
      tableload: true,
      sonShow: false
      // removeDioag: false // 确认删除
    }
  },
  watch: {
    tableLoading: function() {
      this.tableload = this.tableLoading
    }
  },
  mounted() {

  },
  methods: {
    // 重新刷新页面
    handleGetTree1() {
      this.$emit('handleGetTableData')
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
      this.moveShow = flag
      this.loading = true
      // if (this.delTableById.length === 0) {
      //   return this.$message.error('请至少选择一条数据')
      // }
      const param = { warehouseIds: this.delTableById.join(',') }
      deleteHouse(param).then(response => {
        this.loading = false
        if (response.code === 0) {
          if (response.data === '') {
            this.delTableById = []
            this.$message.success('删除成功')
            this.handleGetTree1()
          } else {
            this.$message.confirm('库房名称为' + response.data + '未删除成功')
          }
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
    handleSearch() {

    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNumber: this.pageNumber })
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.$emit('handleGetTableData', { pageSize: this.pageSize, currentPage: val, pageNumber: this.pageNumber })
    },
    handleJumper(currentPage) {
    }

  }
}
</script>

<style lang="scss">
</style>
