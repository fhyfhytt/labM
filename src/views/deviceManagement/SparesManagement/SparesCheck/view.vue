<template>
  <div class="pageRow">

    <div class="page-title">
      <el-form ref="form1" :model="formhouse" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="关键字：">
              <el-input v-model="formhouse.name" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="备件分类：">
              <el-select v-model="formhouse.type" value-key="code" clearable placeholder="-请选择-">
                <el-option v-for="item in houseClass" :key="item.code" :label="item.name" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="来源：">
              <el-select v-model="formhouse.type" value-key="code" clearable placeholder="-请选择-">
                <el-option v-for="item in houseClass" :key="item.code" :label="item.name" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-button v-permission="'houseSearch'" size="small" class="button-sub" style="margin-left:24px;" @click="searchHouse">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="page-table">
      <tableManageParent :table-loading="tableloading" :table-date="tableDate" :current-page="currentPage" :total-num="totalNum" @handleGetTableData="handleGetTableData" />
    </div>

  </div>
</template>

<script>
import { queryHouseList } from '@/api/house.js'
import common from '@/utils/common'
import tableManageParent from './components/tab/table.vue'
export default {
  name: '',
  components: {
    tableManageParent
  },
  data() {
    return {
      formhouse: { name: '', type: '' },

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      houseClass: [],
      tableDate: [],
      totalNum: 0,
      currentPage: 1,
      param: {
        pageSize: 10,
        pageNumber: 1,
        sortColumn: 'create_time',
        sortOrder: 'desc'
      },
      input: '',
      tableloading: true
      // selectData: {} // 点击tree树获取整个节点对象
      // isDel: true // 最初默认标识可以删除
    }
  },

  created() {
    common.getDictNameList({ dictName: '库房类型', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.houseClass = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.message)
    })
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    //
    // 点击tree树获取table表格的数据
    getTableData() {
      this.tableloading = true
      queryHouseList(this.param)
        .then(response => {
          this.tableloading = false
          if (response.code === 0) {
            this.tableDate = response.data.list instanceof Array ? response.data.list : []
            this.totalNum = Number(response.data.totalNum)
          } else {
            this.$message.error(response.msg)
          }
        })
        .catch(response => {
          this.tableloading = false
          this.$message.error(response.msg)
        })
    },
    searchHouse() {
      this.param.pageNumber = 1
      this.param.pageSize = 10
      this.currentPage = 1
      this.param = Object.assign(this.param, this.formhouse)
      this.getTableData()
    },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.param.pageSize = value.pageSize
        this.param.pageNumber = value.pageNumber
        this.currentPage = value.currentPage
      }
      this.getTableData()
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

</style>

