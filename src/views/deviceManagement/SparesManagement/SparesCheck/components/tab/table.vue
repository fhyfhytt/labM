<template>
  <div class="page-table-content">
    <div class="button-tool">
      <div class="button-tool-right fr">
        <el-button v-permission="'sparesAuditMore'" icon="iconfont icontianjia1" size="small" @click="handleBatchAudit">批量审核</el-button>
      </div>
    </div>
    <el-table v-loading="tableload" :data="tableDate" empty-text="无数据" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="编号" width="55" />
      <el-table-column prop="assetInfo.assetNo" label="备件编码" width="" />
      <el-table-column prop="assetInfo.assetName" label="备件名称" width="" />
      <el-table-column prop="assetInfo.itemType" label="备件分类" />
      <el-table-column prop="dataFromS" label="来源" />
      <el-table-column prop="createTime" label="新建时间" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'spareSingleAudit'" class="iconfont iconwenjian scope-caozuo" title="审核" @click="handleEdit(scope.$index, scope.row)" />
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
    <!--批量审核界面-->
    <el-dialog v-if="batchAuditVisible" v-model="batchAuditVisible" title="批量审核" :close-on-click-modal="false" :visible.sync="batchAuditVisible" class="deviceAdd addmanage batchAduitDialog">
      <batchAuditMoudel :audit-table-by-id="auditTableById" @handleGetTree1="handleGetTree1" @handelbatchAuditVisible="handelbatchAuditVisible" />
    </el-dialog>
    <!--审核界面-->
    <el-dialog v-if="singleAuditVisible" v-model="singleAuditVisible" title="资产审核" :close-on-click-modal="false" :visible.sync="singleAuditVisible" :before-close="handleClose" class="deviceAdd addmanage singleAuditDialog">
      <singleAuditMoudel ref="childrenEdit" :row="row" @handleGetTree1="handleGetTree1" @handelsingleAuditVisible="handelsingleAuditVisible" />
    </el-dialog>
  </div>
</template>

<script>
import batchAuditMoudel from './batchAuditMoudel.vue'
import singleAuditMoudel from './singleAuditMoudel.vue'
export default {
  components: { batchAuditMoudel, singleAuditMoudel },
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
      pageNum: 1,
      total: 0,
      batchAuditVisible: false, // 批量审核界面是否显示
      singleAuditVisible: false, // 审核界面是否显示
      row: {}, // 编辑初始化内容
      multipleSelection: [], // 选择的table数据的对象组成的数组
      loading: false,
      tableload: true,
      sonShow: false,
      auditTableById: [] // 批量审核数据传参的id数组
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
    handleBatchAudit() {
      if (this.auditTableById.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.batchAuditVisible = true
      }
    },
    // 选择table数据  删除的项
    handleSelectionChange(val) {
      this.auditTableById = []
      this.multipleSelection = val
      this.multipleSelection.map(value => {
        this.auditTableById.push(value.id)
      })
    },
    // 取消批量审核
    handelbatchAuditVisible(batchAuditVisible) {
      this.batchAuditVisible = false
    },

    // 单个审核
    handleEdit(index, row) {
      this.row = row
      this.singleAuditVisible = true
    },
    // 取消单个审核
    handelsingleAuditVisible(singleAuditVisible) {
      this.singleAuditVisible = false
    },
    handleClose(done) {
      done()
      this.handleGetTree1()
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNum: this.pageNum })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.$emit('handleGetTableData', { pageSize: this.pageSize, currentPage: val, pageNum: this.pageNum })
    },
    handleJumper(currentPage) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .singleAuditDialog /deep/.el-dialog {
    width:900px;
  }
</style>
