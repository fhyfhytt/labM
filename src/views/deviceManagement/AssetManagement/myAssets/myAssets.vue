<template>
  <div class="pageRow">

    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="关键字">
              <el-input v-model="filters.no" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="资产分类">
              <el-input v-model="itemTypes" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-button v-permission="'myAssetsSearch'" size="small" class="button-sub" style="margin-left:24px;" @click="searchList">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="page-table">
      <tableManageParent :table-loading="tableloading" :table-date="tableDate" :current-page="currentPage" :total-num="totalNum" @handleGetTableData="handleGetTableData" />
    </div>

    <el-dialog :title="dialogName" :close-on-click-modal="false" :visible.sync="addFiltersVisible" :before-close="filterClose" width="300px">
      <addFilters ref="addFilters" :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>

<script>
import { getAssetsList } from '@/api/asstesManagement.js'
import tableManageParent from './components/table'
import addFilters from '../components/addFiltersType'
export default {
  name: '',
  components: {
    tableManageParent,
    addFilters
  },
  data() {
    return {
      filters: {},
      itemTypes: '',
      filtersTypeId: [],
      addFiltersVisible: false,
      dialogName: '',
      tableDate: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      pageNumber: 1,
      input: '',
      tableloading: true
    }
  },
  computed: {
    itemTypesArr: function() {
      return this.itemTypes.length > 0 ? this.itemTypes.split(',') : ''
    }
  },
  watch: {

  },
  mounted() {
    this.searchList()
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
    filterClose() {
      this.addFiltersVisible = false
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addFiltersVisible = false
        this.filtersTypeId = []
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.name)
        }
        this.itemTypes = valueArr.join(',')
      } else {
        this.addFiltersVisible = false
      }
    },
    // 查询
    searchList() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        no: this.filters.no,
        itemTypes: this.itemTypesArr,
        itsmUserid: localStorage.getItem('login-id'),
        checkStatus: '审核未通过',
        sortColumn: 'create_time',
        sortOrder: 'desc'
      }
      this.tableloading = true
      getAssetsList(param).then(response => {
        this.tableloading = false
        if (response.code === 0) {
          this.tableDate = response.data.list instanceof Array ? response.data.list : []
          this.totalNum = Number(response.data.totalNum)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.tableloading = false
        this.$message.error(response.msg)
      })
    },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.pageSize = value.pageSize
        this.pageNumber = value.pageNumber
      }
      this.searchList()
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

</style>

