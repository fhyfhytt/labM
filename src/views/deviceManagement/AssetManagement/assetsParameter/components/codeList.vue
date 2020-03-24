<template>
  <div class="page-table-content">
    <el-table v-loading="loading" :data="tableDate" empty-text="无数据" @selection-change="handleSelectionChange">
      <el-table-column prop="code" label="物资编码" />
      <el-table-column prop="name" label="操作编码" />
      <el-table-column prop="type" label="物资名称" />
      <el-table-column prop="state" label="设备名称" />
      <el-table-column prop="person" label="设备厂商" />
      <el-table-column prop="person" label="物资分类" />
      <el-table-column prop="person" label="物资价格" />
      <el-table-column label="资产代码">
        <template slot-scope="scope">
          <a style="cursor:pointer;color: #01AAED;}" @click="handleChoose(scope.row)">+</a>
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
// import { queryHouseList } from '@/api/house.js'
export default {

  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      tableDate: [{ code: '1111111111' }],
      row: {}, // 编辑初始化内容
      multipleSelection: [], // 选择的table数据的对象组成的数组
      loading: false

      // removeDioag: false // 确认删除
    }
  },

  mounted() {
    // queryHouseList(this.param).then(response => {
    //   if (response.code === 0) {
    //     this.loading = false;
    //     this.tableDate = response.data.list instanceof Array ? response.data.list : []
    //     this.total = Number(response.data.totalNum)
    //   } else {
    //     this.$message.error(response.msg)
    //   }
    // })
    // .catch(response => {
    //   this.tableloading = false
    //   this.$message.error(response.msg)
    // })
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
      this.$emit('handleGetTableData', { pageSize: this.pageSize, pageNumber: this.pageNumber })
    },
    handleJumper(currentPage) {
    },

    handleChoose(row) {
      console.log(row)
      this.$emit('resCode', row)
    }
  }
}
</script>

<style lang="scss">

</style>
