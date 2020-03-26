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
            <el-form-item label="备件分类：" @click.native="handleAdd">
              <el-input v-model="types" :title="types" placeholder="请选择备件分类" />
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
    <!--备件分类界面-->
    <el-dialog v-if="sparesTypeVisible" v-model="sparesTypeVisible" title="备件分类" :close-on-click-modal="false" :visible.sync="sparesTypeVisible" class="deviceAdd addmanage">
      <sparesType ref="sparesType" :tree-id="id" @getData="getData" @handelsparesTypeVisible="handelsparesTypeVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { queryHouseList } from '@/api/house.js'
import common from '@/utils/common'
import tableManageParent from './components/tab/table.vue'
import sparesType from './components/tab/sparesType.vue'
export default {
  name: '',
  components: {
    tableManageParent,
    sparesType
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
      tableloading: true,
      // selectData: {} // 点击tree树获取整个节点对象
      // isDel: true // 最初默认标识可以删除
      sparesTypeVisible: false, // 备件分类页面是否显示
      id: '',
      typeData: [],
      types: ''
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
    },
    // 打开弹框
    handleAdd() {
      this.sparesTypeVisible = true
    },
    // 取消，关闭弹框
    handelsparesTypeVisible(sparesTypeVisible) {
      this.sparesTypeVisible = false
    },
    // 点击查询备件列表数据
    getData(msg) {
      this.typeData = msg
      this.types = this.typeData.map(item => {
        return item.name
      }).join(',')

      console.log(this.typeData)
      console.log(this.types)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

</style>
<style lang="scss" scoped>
  .deviceAdd .el-dialog {
    width: 350px!important;
  }
</style>
