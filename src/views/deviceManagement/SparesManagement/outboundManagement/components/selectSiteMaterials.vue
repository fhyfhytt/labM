<template>
  <div class="page-table-content">
    <el-form ref="form1" size="small" label-width="110px">
      <el-row style="margin-right:10px;">
        <el-col :span="8">
          <el-form-item label="关键字">
            <el-input v-model="assetNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产分类">
            <el-input v-model="itemTypes" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="10px">
            <el-button v-permission="'attachmentSearch'" size="small" class="button-sub" @click="getList">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="houseMaterials" v-loading="loading" :data="tableDate" empty-text="无数据" max-height="360" @row-click="selectRow" @selection-change="handleSelectRow">
      <el-table-column type="selection" width="60" />
      <!-- <el-table-column type="index" label="编号" /> -->
      <el-table-column prop="no" label="资产代码" width="150" />
      <el-table-column prop="assetName" label="资产名称" />
      <el-table-column prop="itemTypes" label="资产分类" />
      <el-table-column prop="status" label="资产状态" />
      <el-table-column prop="factory" label="生产厂商" />
      <el-table-column prop="unitType" label="设备型号" />
      <el-table-column prop="area" label="所属区域" />
      <el-table-column prop="price" label="采购价(元)" />
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next, jumper"
        :total="total"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="dialog-footer">
      <el-button v-preventReClick="1000" size="small" class="button-sub" @click="handleChoose">确定</el-button>
    </div>
    <!-- 树 -->
    <el-dialog :title="dialogName" :close-on-click-modal="false" :append-to-body="true" :visible.sync="addFiltersVisible" width="300px">
      <addFilters ref="addFilters" :component-name="dialogName" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>
<script>
import { getAssetsList } from '@/api/asstesManagement'
import addFilters from '../../components/addFiltersType'
export default {

  components: { addFilters },
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 1,
      tableDate: [],
      row: {}, // 编辑初始化内容
      loading: true,
      multipleSelection: [],
      assetNo: '',
      itemTypes: '',
      dialogName: '',
      addFiltersVisible: false

    }
  },
  computed: {
    itemTypesArr: function() {
      return this.itemTypes.length > 0 ? this.itemTypes.split(',') : ''
    }
  },
  mounted() {
  },
  methods: {
    clearMultipleSelection() {
      this.$refs.houseMaterials.clearSelection()
    },
    // 选择筛选条件
    showAddFiltersType() {
      this.dialogName = '资产分类选择'
      this.addFiltersVisible = true
      this.$nextTick(() => {
        this.$refs.addFilters.getAssetsTreeData()
      })
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addFiltersVisible = false
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.name)
        }
        this.itemTypes = valueArr.join(',')
      } else {
        this.addFiltersVisible = false
      }
    },
    getList() {
      const params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        no: this.assetNo,
        itemTypes: this.itemTypesArr,
        itsmUserid: localStorage.getItem('login-id'),
        checkStatus: '审核通过'
      }
      getAssetsList(params).then(response => {
        if (response.code === 0) {
          this.loading = false
          this.tableDate = response.data.list
          this.total = Number(response.data.totalNum)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.msg)
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getList()
    },
    // 点击行选中
    selectRow(row) {
      this.$refs.houseMaterials.toggleRowSelection(row)
    },
    handleSelectRow(val) {
      this.multipleSelection = val
    },
    handleChoose() {
      this.$emit('siteMaterials', this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
