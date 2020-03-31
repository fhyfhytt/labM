<template>
  <div>
    <el-row style="margin-bottom:10px">
      <el-form ref="form1" :model="formSpare">
        <input v-model="formSpare.assetItemType" hidden>
        <el-col :span="10">
          <el-form-item label="关键字 :">
            <el-input v-model="formSpare.assetName" placeholder="" style="width: 200px; margin: 0px 10px;" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="资产分类:" @click.native="handleAdd">
            <el-input v-model="typeNames" :title="typeNames" placeholder="-请选择-" clearable style="width: 200px; margin: 0px 10px;" />
          </el-form-item>
        </el-col>
        <el-button class="button-sub btn btn2" @click.native="searchSpares">查询</el-button>
      </el-form>
    </el-row>

    <el-table v-loading="tableloading" :data="tableDate" empty-text="无数据" height="435" style="width: 100%;height:400px" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="编号" width="55" />
      <el-table-column prop="assetInfo.assetNo" label="资产编码" width="" />
      <el-table-column prop="assetInfo.assetName" label="资产名称" width="" />
      <el-table-column prop="assetInfo.itemType" label="资产分类" />
      <el-table-column prop="assetInfo.itemType" label="资产型号" />
      <el-table-column prop="assetInfo.itemType" label="厂商" />
      <el-table-column prop="assetInfo.itemType" label="所属状态" />
      <el-table-column prop="dataFromS" label="来源" />
      <el-table-column prop="createTime" label="数量" />
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination
        :page-size="pageSize"
        layout="total,sizes,prev, pager, next, jumper"
        :total="totalNum"
        :pager-count="5"
        :current-page.sync="currentPage"
        @size-change="handleGetTableData"
      />
    </div>

    <!--备件分类界面-->
    <el-dialog v-if="sparesTypeVisible" v-model="sparesTypeVisible" append-to-body title="备件分类" :close-on-click-modal="false" :visible.sync="sparesTypeVisible" class="deviceAdd addmanage sparesTypeDialog">
      <sparesType ref="sparesType" :tree-id="id" @getData="getData" @handelsparesTypeVisible="handelsparesTypeVisible" />
    </el-dialog>
  </div>
</template>
<script>
import { getSparesList } from '@/api/deviceManage.js'
// import addFilters from '../../../AssetManagement/components/addFiltersType'
import sparesType from '../../SparesCheck/components/tab/sparesType'
export default {
  components: { sparesType },
  data() {
    return {
      sparesTypeVisible: false, // 备件分类页面是否显示
      formSpare: { assetName: '', assetItemType: '' },
      tableDate: [],
      loading: false,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 当前页数
      totalNum: 0, // 总页数
      param: {
        checkStatus: 0,
        pageNum: 1,
        pageSize: 10
      },
      input: '',
      tableloading: true,
      id: '',
      typeData: [], // 备件分类数据
      typeNames: '' // 备件分类名称
    }
  },
  computed: {
    itemTypesArr: function() {
      return this.itemTypes.length > 0 ? this.itemTypes.split(',') : ''
    }
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
      this.param.pageNum = 1
      this.param.pageSize = 10
      this.currentPage = 1
      this.param = Object.assign(this.param, this.formSpare)
      this.getTableData()
    },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.param.pageSize = value.pageSize
        this.param.pageNum = value.pageNum
        this.currentPage = value.currentPage
      }
      this.getTableData()
    },
    // 选中数据操作
    handleSelectionChange() {

    },
    // 打开分类弹框
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
      this.formSpare.assetItemType = this.typeData.map(item => {
        return item.id
      }).join(',')
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

</style>
<style lang="scss" scoped>
  .sparesTypeDialog /deep/.el-dialog {
    width: 350px!important;
  }
</style>
