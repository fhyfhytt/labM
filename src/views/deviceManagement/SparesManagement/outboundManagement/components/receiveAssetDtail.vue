<template>
  <div>
    <el-table v-loading="loading" :data="tableDate" empty-text="无数据">
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column label="资产代号">
        <template slot-scope="scope">
          <a style="cursor:pointer;color: #01AAED;text-decoration: underline;}" @click.stop="goAssetPage(scope.row)">{{ scope.row.no }}CKCWWWWW</a>
        </template>
      </el-table-column>
      <el-table-column prop="assetName" label="资产名称" />
      <el-table-column prop="type" label="资产分类" />
      <el-table-column prop="status" label="资产状态" />
      <el-table-column prop="area" label="生产厂商" />
      <el-table-column prop="unitType" label="设备型号" />
      <el-table-column prop="area" label="所属区域" />
      <el-table-column prop="price" label="采购价(元)" />
      <el-table-column prop="dataFrom" label="审核状态" />
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
  </div>
</template>
<script>
import { selectByWarehouseAssetId } from '@/api/asstesManagement.js'
export default {
  props: {
    no: {
      type: String,
      default: ''
    },
    warehouseAssetId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      tableDate: [],
      row: {}, // 编辑初始化内容
      loading: true
    }
  },
  mounted() {

  },
  methods: {
    getList() {
      const params = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize,
        no: this.no,
        warehouseAssetId: this.warehouseAssetId,
        itsmUserid: localStorage.getItem('login-id')
      }
      selectByWarehouseAssetId(params).then(response => {
        if (response.code === 0) {
          this.loading = false
          this.tableDate = response.data.list
          this.total = Number(response.data.totalCount)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.msg)
      })
    },
    goAssetPage(row) {
      this.$router.push('/deviceManagement/assetManagement/myAssets')
      this.$store.commit('changeAssetId', row.id)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
