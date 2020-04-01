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
    <el-table ref="houseMaterials" v-loading="loading" :data="tableDate" empty-text="无数据" max-height="360">
      <el-table-column prop="assetNo" label="物资编码" />
      <el-table-column prop="assetName" label="物资名称" />
      <el-table-column prop="itemType" label="物资分类" />
      <el-table-column prop="unitType" label="物资型号" />
      <el-table-column prop="factory" label="厂商" />
      <el-table-column prop="num" label="数量" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a style="cursor:pointer;color: #01AAED;font-size:25px;}" @click="ensureSelect(scope.row)"><i class="el-icon-plus" /></a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 树 -->
    <el-dialog :title="dialogName" :close-on-click-modal="false" :append-to-body="true" :visible.sync="addFiltersVisible" width="300px">
      <addFilters ref="addFilters" :component-name="dialogName" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>
<script>
import { queryByWarehouseAsset } from '@/api/asstesManagement'
import addFilters from '../../components/addFiltersType'
export default {
  components: { addFilters },
  props: {
    assetId: {
      type: String,
      default: ''
    },
    houseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 1,
      tableDate: [],
      row: {}, // 编辑初始化内容
      loading: true,
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
      console.log('assetId:', this.assetId, 'houseId:', this.houseId)
      const params = {
        pageSize: this.pageSize,
        pageNum: this.pageNumber,
        assetId: this.assetId,
        houseId: this.houseId
      }
      queryByWarehouseAsset(params).then(response => {
        if (response.code === 0) {
          this.loading = false
          if (response.data === '') {
            this.tableDate = []
          } else {
            this.tableDate = response.data.assetList.map(item => {
              item.assetNo = item.assetInfo.assetNo || ''
              item.assetName = item.assetInfo.assetName || ''
              item.itemType = item.assetInfo.itemType || ''
              item.unitType = item.assetInfo.unitType || ''
              item.factory = item.assetInfo.factory || ''
              return item
            }) || []
            this.total = Number(response.data.count)
          }
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
    ensureSelect(row) {
      this.$emit('replaceMaterials', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
