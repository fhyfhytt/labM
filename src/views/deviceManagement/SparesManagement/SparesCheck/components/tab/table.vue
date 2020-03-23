<template>
  <div class="page-table-content">
    <div class="button-tool">
      <div class="button-tool-right fr">
        <el-button v-permission="'houseAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">批量审核</el-button>
        <!-- <el-button v-permission="'houseAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
      <el-button v-permission="'houseDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">批量删除</el-button> -->
      </div>
    </div>
    <!-- @selection-change="handleSelectionChange" -->
    <el-table v-loading="tableload" :data="tableDate" empty-text="无数据">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="编号" width="55" />
      <el-table-column prop="code" label="备件编码" width="110" />
      <el-table-column prop="name" label="备件名称" width="140" />
      <el-table-column prop="type" label="备件分类" />
      <el-table-column prop="state" label="来源" />
      <el-table-column prop="person" label="新建时间" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'houseEdit'" class="iconfont iconbianji1 scope-caozuo" title="审核" @click="handleEdit(scope.$index, scope.row)" />
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
    <!--新增界面-->
    <el-dialog v-if="addFormVisible" v-model="addFormVisible" title="新建库房" :close-on-click-modal="false" :visible.sync="addFormVisible" class="deviceAdd addmanage">
      <addMoudel @handleGetTree1="handleGetTree1" @handeladdFormVisible="handeladdFormVisible" />
    </el-dialog>
    <!--审核界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="修改库房" :close-on-click-modal="false" :visible.sync="editFormVisible" :before-close="handleClose" class="deviceAdd addmanage">
      <editMoudel ref="childrenEdit" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
// import { deleteHouse } from '@/api/house.js'
import addMoudel from './addMoudel.vue'
import editMoudel from './editMoudel.vue'
export default {
  components: { addMoudel, editMoudel },
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
      addFormVisible: false, // 批量审核界面是否显示
      editFormVisible: false, // 审核界面是否显示
      row: {}, // 编辑初始化内容
      multipleSelection: [], // 选择的table数据的对象组成的数组
      // delTableById: [], // 删除数据传参的id数组
      // moveShow: false, // //确认删除弹框是否显示
      loading: false,
      tableload: true,
      sonShow: false
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
    // 批量审核
    // handleSelectEdit() {
    //   this.addFormVisible = true
    // },
    // 新增
    handleAdd() {
      this.addFormVisible = true
    },
    // 取消新增
    handeladdFormVisible(addFormVisible) {
      this.addFormVisible = false
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
