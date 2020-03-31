<template>
  <div>
    <el-form ref="form1" :model="filters" size="small" label-width="110px">
      <el-row style="margin-bottom:15px;margin-right:10px;">
        <el-col :xl="{span:5}" :lg="{span:6}">
          <el-form-item label="姓名：">
            <el-input v-model="filters.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="10px">
            <el-button v-permission="'attachmentSearch'" size="small" class="button-sub" @click="getList">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="loading" :data="tableDate" empty-text="无数据">
      <el-table-column prop="userCode" label="工号" />
      <el-table-column prop="name" label="责任人" />
      <el-table-column prop="deptId" label="责任组织" />
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
import { getUserList } from '@/api/userManagement.js'
export default {
  data() {
    return {
      pageSize: 10,
      pageNumber: 1,
      total: 1,
      tableDate: [],
      row: {}, // 编辑初始化内容
      loading: true,
      filters: { name: '' }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = Object.assign({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }, this.filters)
      getUserList(params).then(response => {
        if (response.code === 0) {
          this.loading = false
          this.tableDate = response.data.rows
          this.total = Number(response.data.totalCount)
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
      this.$emit('resPerson', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
