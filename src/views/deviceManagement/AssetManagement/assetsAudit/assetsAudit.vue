<template>
  <div class="pageRow">

    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="关键字">
              <el-input v-model="filters.name" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="资产分类">
              <el-input v-model="filters.type" placeholder="-请选择-" @focus="showAddFilters"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="来源">
              <el-select v-model="filters.name" value-key="code" clearable placeholder="-请选择-">
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

    <el-dialog :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="filterClose" width="300px">
      <addFilters :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>

  </div>
</template>

<script>
import { queryHouseList } from '@/api/house.js'
import common from '@/utils/common'
import tableManageParent from './components/table.vue'
import addFilters from '../components/addFiltersType'
export default {
  name: '',
  components: {
    tableManageParent,
    addFilters
  },
  data() {
    return {
      filters: { name: '', type: '' },
      addFormVisible: false,
      dialogName: '',
      filtersTypeId: [],
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
    // 选择筛选条件
    showAddFilters() {
      this.dialogName = '资产分类选择'
      this.addFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs.addEditRole.addEditRoleDialog()
      //   this.$refs.addEditRole.clearContent()
      // })
    },
    filterClose() {
      this.addFormVisible = false
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addFormVisible = false
        this.filtersTypeId = []
        console.log('res:', res)
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.label)
          this.filtersTypeId = value.id
        }
        this.filters.type = valueArr.join(',')
      }
    },
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
      this.param = Object.assign(this.param, this.filters)
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

