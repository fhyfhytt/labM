<template>
  <div class="page-table-content">
    <el-form ref="form1" size="small" label-width="110px">
      <el-row style="margin-right:10px;">
        <el-col :span="8">
          <el-form-item label="关键字">
            <el-input v-model="assetNo" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产分类">
            <el-input v-model="itemTypes" placeholder="-请选择-" @focus="showAddFiltersType"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
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
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="编号" />
      <el-table-column prop="assetNo" label="物资编码" />
      <el-table-column prop="assetName" label="物资名称" />
      <el-table-column prop="itemType" label="物资分类" />
      <el-table-column prop="unitType" label="物资型号" />
      <el-table-column prop="factory" label="厂商" />
      <el-table-column prop="num" label="数量" />
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
import { queryByAsset } from '@/api/asstesManagement'
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
    this.getList()
  },
  methods: {
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
        pageNum: this.pageNumber,
        assetNo: this.assetNo,
        itemTypes: this.itemTypes
      }
      queryByAsset(params).then(response => {
        if (response.code === 0) {
          this.loading = false
          this.tableDate = response.data.assetList
          this.total = Number(response.data.count)
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
      this.$emit('houseMaterial', this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
