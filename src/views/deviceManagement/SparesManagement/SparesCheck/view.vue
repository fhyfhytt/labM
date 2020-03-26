<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="formSpare" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="备件名称：">
              <el-input v-model="formSpare.assetName" placeholder="请输入备件名称" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="备件分类：" @click.native="handleAdd">
              <el-input v-model="typeNames" :title="typeNames" placeholder="请选择备件分类" />
              <input v-model="formSpare.assetItemType" hidden>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="来源：">
              <el-select v-model="formSpare.dataFrom" value-key="dataFrom" clearable placeholder="-请选择-">
                <el-option v-for="item in dataFromAll" :key="item.dataFrom" :label="item.dataFroms" :value="item.dataFrom" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-button v-permission="'houseSearch'" size="small" class="button-sub" style="margin-left:24px;" @click="searchSpares">查询</el-button>
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
import { getSparesList } from '@/api/deviceManage.js'
// import common from '@/utils/common'
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
      formSpare: { assetName: '', assetItemType: {}, dataFrom: '' },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataFromAll: [
        {
          dataFrom: 1,
          dataFroms: '新增'
        },
        {
          dataFrom: 2,
          dataFroms: '编辑'
        },
        {
          dataFrom: 0,
          dataFroms: '删除'
        }

      ], // 备件来源
      tableDate: [],
      totalNum: 0,
      currentPage: 1,
      param: {
        pageSize: 10,
        pageNum: 1
        // sortColumn: 'create_time',
        // sortOrder: 'desc'
      },
      input: '',
      tableloading: true,
      // selectData: {} // 点击tree树获取整个节点对象
      // isDel: true // 最初默认标识可以删除
      sparesTypeVisible: false, // 备件分类页面是否显示
      id: '',
      typeData: [], // 备件分类数据
      typeNames: '', // 备件分类名称
      typeIds: '',
      dataFrom: [] // 来源
    }
  },

  created() {
    // common.getDictNameList({ dictName: '库房类型', dictNameIsLike: 0 }).then(res => {
    //   if (res.success === true) {
    //     this.$nextTick(() => {
    //       this.houseClass = res.data
    //     })
    //   } else {
    //     if (res.data !== '') {
    //       this.$message.error(res.data)
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   }
    // }).catch(res => {
    //   this.$message.error(res.message)
    // })
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 查询备件数据
    getTableData() {
      this.tableloading = true
      getSparesList(this.param)
        .then(response => {
          this.tableloading = false
          if (response.code === 0) {
            this.tableDate = response.data.assetList
            this.totalNum = Number(response.data.count)
          } else {
            this.$message.error(response.msg)
          }
        })
        .catch(response => {
          this.tableloading = false
          this.$message.error(response.msg)
        })
    },
    searchSpares() {
      this.param.pageNumber = 1
      this.param.pageSize = 10
      this.currentPage = 1
      this.param = Object.assign(this.param, this.formSpare)
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
    // 点击查询备件分类数据
    getData(msg) {
      this.typeData = msg
      this.typeNames = this.typeData.map(item => {
        return item.name
      }).join(',')
      this.typeIds = this.typeData.map(item => {
        return item.id
      }).join(',')
      console.log('this.typeIds:', this.typeIds)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

</style>
<style lang="scss" scoped>
  .deviceAdd /deep/.el-dialog {
    width: 350px!important;
  }
</style>
