<template>
  <div class="page-table-content">
    <div class="button-tool">
      <div class="button-tool-left fl" />
      <div class="button-tool-right fr">
        <el-button v-permission="'assetsAuditDeleteMore'" class="iconfont iconshenpi" @click="handleSelectCheck"> 批量审核</el-button>
      </div>
    </div>
    <el-table ref="assetsAudit" v-loading="tableload" :data="tableDate" empty-text="无数据" @row-click="selectRow" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="no" label="资产编号" />
      <el-table-column prop="assetName" label="资产名称" />
      <el-table-column prop="status" label="资产状态" />
      <el-table-column prop="area" label="所属区域" />
      <el-table-column prop="location" label="分布位置" />
      <el-table-column prop="dataFrom" label="来源" />
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="createTime" label="新建时间" />
      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <i v-permission="'assetsAuditEdit'" class="iconfont iconwenjian scope-caozuo" title="审核" @click="handleEdit(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next, jumper"
        :total="totalNum"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-loading="loading" title="批量审核" :visible.sync="showCheckAll">
      <el-form :model="checkAll" label-width="110px">
        <div class="minTitle">审核备注</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="审核状态：" style="width:500px">
              <el-select v-model="checkAll.checkStatus" placeholder="-请选择审核状态-">
                <el-option label="审核通过" value="审核通过" />
                <el-option label="审核未通过" value="审核未通过" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input v-model="checkAll.checkNote" type="textarea" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button size="medium " class="button-sub" @click="submitCheckAll()">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="审核" :close-on-click-modal="false" :visible.sync="editFormVisible" width="800px">
      <editMoudel ref="childrenEdit" :row="row" @handleGetTree1="handleGetTree1" @handeleditFormVisible="handeleditFormVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { updateCheckMore } from '@/api/asstesManagement'
import editMoudel from './editMoudel.vue'
export default {
  components: { editMoudel },
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
      delTableById: [], // 审核数据传参的id数组
      showCheckAll: false, // //确认审核弹框是否显示
      loading: false,
      tableload: false,
      sonShow: false,
      checkAll: { checkStatus: '审核通过' }
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
    // 选择table数据  需要审核的项
    handleSelectionChange(val) {
      this.delTableById = []
      this.multipleSelection = val
      this.multipleSelection.map(value => {
        this.delTableById.push(value.id)
      })
    },
    // 批量审核
    handleSelectCheck() {
      if (this.delTableById.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.showCheckAll = true
      }
    },
    submitCheckAll() {
      const param = {
        ids: this.delTableById,
        checkNote: this.checkAll.checkNote,
        checkStatus: this.checkAll.checkStatus
      }
      updateCheckMore(param).then(response => {
        this.loading = false
        if (response.success === true) {
          this.$message.success('提交成功')
          this.showCheckAll = false
          this.handleGetTree1()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.msg)
      })
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
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.$emit('handleGetTableData', { newPageSize: val, newPageNumber: 1 })
    },
    handleCurrentChange(val) {
      this.$emit('handleGetTableData', { newPageSize: this.pageSize, newPageNumber: val })
    },
    // 点击行选中
    selectRow(row) {
      this.$refs.assetsAudit.toggleRowSelection(row)
    }

  }
}
</script>

<style lang="scss" scoped>
  .minTitle {margin:0 0 10px 0;color: #38a4ed;padding-bottom: 10px;font-weight: bold;border-bottom: 2px solid #ddd;}
</style>
