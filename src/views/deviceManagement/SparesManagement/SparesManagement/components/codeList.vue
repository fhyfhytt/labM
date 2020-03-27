<template>
  <div class="page-table-content">
    <el-table v-loading="loading" :data="tableDate" empty-text="无数据">
      <el-table-column prop="assetNo" label="物资编码" />
      <el-table-column prop="code" label="操作编码" />
      <el-table-column prop="assetName" label="物资名称" />
      <el-table-column prop="unitType" label="设备名称" />
      <el-table-column prop="factory" label="设备厂商" />
      <el-table-column prop="itemType" label="物资分类" />
      <el-table-column prop="price" label="物资价格" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a style="cursor:pointer;color: #01AAED;font-size:25px;}" @click="handleChoose(scope.row)"><i class="el-icon-plus" /></a>
        </template>
      </el-table-column>
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
import { queryByAsset } from '@/api/asstesManagement'
export default {

  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 1,
      tableDate: [],
      row: {}, // 编辑初始化内容
      loading: true

    }
  },

  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.pageNumber
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
    handleChoose(row) {
      this.$emit('resCode', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
