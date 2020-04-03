<template>
  <div class="page-table-content">
    <el-row>
      <el-form ref="form1" size="small">
        <el-col :xl="{span:8}" :lg="{span:6}">
          <el-form-item>
            <el-input v-model="inputDevelivery" type="text" placeholder="可根据工号、责任人进行检索" />
          </el-form-item>
        </el-col>
        <el-col :xl="{span:8}" :lg="{span:6}" style="margin-left: 24px">
          <el-button v-preventReClick="1000" class="button-sub" @click="getPeopleList()">检索</el-button>
        </el-col>
      </el-form>
      <el-col>
        <el-table ref="deliveyPeo" :data="deliveData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column label="操作">
            <template>
              <a style="cursor:pointer;color: #01AAED;"><i class="el-icon-plus" /></a>
            </template>
          </el-table-column>
          <el-table-column prop="userCode" label="工号" />
          <el-table-column prop="name" label="责任人" />
          <el-table-column prop="deptName" label="责任人组织" />
        </el-table>
      </el-col>
      <el-col>
        <el-pagination
          class="fr"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="totalCount"
          :pager-count="5"
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getUserList } from '@/api/asstesManagement.js'
export default {
  data() {
    return {
      inputDevelivery: '', // 输入的关键字
      deliveData: [], // 物资数据
      pageSize: 10,
      pageNumber: 1,
      totalCount: 0,
      currentPage: 1
    }
  },
  mounted() {
    this.getPeopleList()
  },
  methods: {
    // 查询人员列表
    getPeopleList() {
      const params = {
        page: this.pageNumber,
        rows: this.pageSize,
        active: 1,
        text: this.inputDevelivery
      }
      getUserList(params).then((response) => {
        if (response.code === 0) {
          this.deliveData = response.data
          this.totalCount = response.total
        }
      })
    },
    // 单击行数据
    selectRow(row, event, column) {
      this.$emit('closePeople', row.name)
    },
    handleSelectRow() {},
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getPeopleList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getPeopleList()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
