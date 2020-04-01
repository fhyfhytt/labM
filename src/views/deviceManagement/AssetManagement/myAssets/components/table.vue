<template>
  <div class="page-table-content">
    <div class="button-tool">
      <div class="button-tool-left fl" />
      <div class="button-tool-right fr">
        <el-button v-permission="'myAssetsDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">删除草稿</el-button>
      </div>
    </div>
    <el-table ref="myAssets" v-loading="tableload" :data="tableDate" empty-text="无数据" @row-click="selectRow" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="no" label="资产编号" />
      <el-table-column prop="assetName" label="资产名称" />
      <el-table-column prop="itemType" label="资产分类" />
      <el-table-column prop="dataFrom" label="来源" />
      <el-table-column prop="factory" label="生产商" />
      <el-table-column prop="price" label="价格（元）" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'myAssetsEdit'" class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next, jumper"
        :total="totalNum"
        :pager-count="5"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-loading="loading" title="删除" :visible.sync="moveShow" class="baseMove">
      <removeDialog @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="修改我的资产" :close-on-click-modal="false" :visible.sync="editFormVisible" width="800px">
      <editMoudel ref="childrenEdit" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { deleteMoreAssets } from '@/api/asstesManagement.js'
import editMoudel from './editMoudel.vue'
import removeDialog from '@/views/baseComponents/baseRemove'
export default {
  components: { editMoudel, removeDialog },
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
      this.editFormVisible = false
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
      if (this.delTableById.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.moveShow = true
      }
    },
    // 确认删除
    sureMsg(flag) {
      this.moveShow = flag
      this.loading = true
      if (this.delTableById.length === 0) {
        return this.$message.error('请至少选择一条数据')
      }
      const param = { ids: this.delTableById }
      deleteMoreAssets(param).then(response => {
        this.loading = false
        if (response.success === true) {
          this.$message.success('删除成功')
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
    },
    // 点击行选中
    selectRow(row) {
      this.$refs.myAssets.toggleRowSelection(row)
    }

  }
}
</script>

<style lang="scss">

</style>
