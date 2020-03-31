<template>
  <div>
    <el-row style="margin-bottom:10px">
      关键字 :
      <el-input v-model="primaryKey" placeholder="请输入用户名或工号" style="width:200px;margin:0px 10px" />
      <el-button class="button-sub btn btn2" @click="searchNewUsers">查询</el-button>
    </el-row>
    <el-table ref="userInfoTable" v-loading="loading" :data="tableData" tooltip-effect="dark" height="435" style="width: 100%;height:400px" @row-click="selectUserInfoRow">
      <!-- @handleGetTableData="handleGetTableData" -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i v-permission="'regionEdit'" class="icon" style="cursor:pointer" title="" @click.stop="getCheckedUser(scope.$index, scope.row)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxinzeng" />
            </svg>
          </i>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="userCode" label="工号" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="mobile" label="手机" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>
    <div class="numListJup " style="padding-right:70px">
      <el-pagination
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total,sizes,prev, pager, next, jumper"
        :total="totalCount"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getUserList } from '@/api/userManagement'
export default {
  data() {
    return {
      tableData: [],
      userSearchVisible: false,
      loading: false,
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0, // 总页数
      currentPage: 1, // 当前页数
      selectUserPage: 1, // 选择人员页数
      primaryKey: '' // 关键字
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取人员列表
    getTableData() {
      const param = {}
      param.pageNumber = this.pageNumber
      param.pageSize = this.pageSize
      param.name = this.primaryKey
      getUserList(param).then(res => {
        if (res.success === true) {
          this.tableData = res.data.rows
          this.totalCount = res.data.totalCount
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },
    // 查询人员
    searchNewUsers() {
      this.getTableData()
    },
    // 赋值接收人
    getCheckedUser(index, row) {
      this.$emit('setReciver', row.name)
    },
    // 行点击事件
    selectUserInfoRow(data) {
      this.$emit('setReciver', data.name)
    },
    // 分页掉接口
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getTableData()
    },
    // 分页  点击哪一页跳到哪一页
    handleCurrentChange(val) {
      this.pageSize = 10
      this.pageNumber = val
      this.getTableData()
    }
  }
}
</script>
