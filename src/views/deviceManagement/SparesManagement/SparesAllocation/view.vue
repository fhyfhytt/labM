<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <!-- type="flex" justify="space-around" -->
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:5}">
            <el-form-item label="关键字:">
              <el-input v-model="filters.no" style="background:transparent" placeholder="请输入入库单编号" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:5}">
            <el-form-item label="调出仓库:">
              <el-input v-model="itemTypes" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:5}">
            <el-form-item label="调入仓库:">
              <el-input v-model="areas" placeholder="-请选择-" clearable @focus="showAddFiltersArea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :xl="{span:8}" :lg="{span:10}">
            <el-form-item label="调出时间:">
              <el-col :span="11">
                <el-date-picker v-model="dateForm.date1" type="date" placeholder="选择日期" style="width: 100%;" />
              </el-col>
              <el-col class="line" :span="2" style="padding-left:15px;">至</el-col>
              <el-col :span="11">
                <el-date-picker v-model="dateForm.date2" placeholder="选择日期" style="width: 100%;" />
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:4}">
            <el-form-item label-width="30px">
              <el-button v-permission="'assetsParameterSearch'" size="small" class="button-sub" @click="searchData">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="page-table">
      <div class="page-table-content">
        <div class="button-tool">
          <span class="fr">
            <el-button v-permission="'assetsParameterAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
            <el-button v-permission="'assetsParameterDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleDelAll">批量删除</el-button>
          </span>
        </div>
        <el-table ref="assetsParameter" v-loading="loading" :data="tableData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="编号" />
          <el-table-column label="调拨单编号">
            <template slot-scope="scope">
              <a style="cursor:pointer;color: #01AAED;text-decoration: underline;}" @click.stop="handleEdit(scope.$index, scope.row)">{{ scope.row.no }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="itemType" label="调出仓库" />
          <el-table-column prop="assetName" label="调入仓库" />
          <el-table-column prop="num" label="设备总数" />
          <el-table-column prop="factory" label="操作人" />
          <el-table-column prop="area" label="接收人" />
          <el-table-column prop="unitType" label="调拨状态" />
        </el-table>
        <div class="numListJup margin-jump">
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total,sizes,prev, pager, next, jumper"
            :total="totalCount"
            :pager-count="5"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="childrenlog">
      <!--新增/编辑界面-->
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleClose" class="addRoleDialog" width="800px">
        <addMoudel ref="addEditRole" :statues-list="statuesList" @reset-save-flag="resetSaveFlag" @closeAddRole="closeAddRole" @addSuccess="addSuccess" />
      </el-dialog>
      <!-- 弹出框 -->
      <el-dialog title="提示" :visible.sync="saveShow" class="baseMove">
        <confirmDialog title="关闭后所填写的数据将不会保存，是否关闭" @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog>
      <el-dialog title="批量删除" :visible.sync="confirmAllVisible" class="baseMove">
        <confirmDialog title="将同时删除该角色与权限的关系，是否删除？" @sureMsg="confirmAllBtn" @confireMsg="cancelAllBtn" />
      </el-dialog>
    </div>
    <!-- 树 -->
    <el-dialog :title="dialogName" :close-on-click-modal="false" :visible.sync="addFiltersVisible" :before-close="filterClose" width="300px">
      <addFilters ref="addFilters" :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>
<script>
import { getAssetsList, deleteAssets } from '@/api/asstesManagement'
import common from '@/utils/common'
import confirmDialog from '@/views/baseComponents/baseConfirm'
import addMoudel from './components/addMoudel'
import addFilters from '../../AssetManagement/components/addFiltersType'

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// import QRCode from 'qrcodejs2'
export default {
  components: { confirmDialog, addMoudel, addFilters },
  data() {
    return {
      addFiltersVisible: false,
      filters: {},
      filtersTypeId: [],
      componentName: '所属区域',
      statuesList: [], // 状态列表
      itemTypes: '',
      areas: '',
      tableData: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 直接前往第几页
      addFormVisible: false, // 新增界面是否显示
      loading: true,

      saveShow: false, // 未保存提示
      saveShowFlag: true, // 子组件标识
      flag: true,
      dialogName: '新建角色',
      confirmVisible: false,
      confirmAllVisible: false,
      alertText: '是否删除 ?',
      addFlag: false, // 新增完成标识
      CloseAddFormVisible: false, // 取消新增界面
      multipleSelection: [], // 选择的table数据的对象组成的数组
      dateForm: { // 入库时间
        date1: '',
        date2: ''
      }
    }
  },
  computed: {
    itemTypesArr: function() {
      return this.itemTypes.length > 0 ? this.itemTypes.split(',') : ''
    },
    arearArr: function() {
      return this.areas.length > 0 ? this.areas.split(',') : ''
    }
  },
  created() {
    common.getDictNameList({ dictName: '资产状态', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.statuesList = res.data
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
    this.getList()
  },
  mounted() {
    // 查询--进入页面显示table表格
    // this.getList()
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
    showAddFiltersArea() {
      this.dialogName = '所属区域选择'
      this.addFiltersVisible = true
      this.$nextTick(() => {
        this.$refs.addFilters.getAreaTreeData()
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
        if (this.dialogName === '资产分类选择') {
          this.itemTypes = valueArr.join(',')
        } else {
          this.areas = valueArr.join(',')
        }
      } else {
        this.addFiltersVisible = false
      }
    },
    // 新增成功返回
    addSuccess(res) {
      this.addFormVisible = false
      this.getList()
    },
    // 未保存弹出框
    sureMsg() {
      this.saveShow = false
      this.addFormVisible = false
    },
    confireMsg(flag) {
      this.saveShow = false
    },
    resetSaveFlag(flag) {
      if (flag === true) {
        this.saveShowFlag = true
      } else {
        this.saveShowFlag = false
      }
    },
    // 点击行选中
    selectRow(row) {
      this.$refs.assetsParameter.toggleRowSelection(row)
    },
    handleSelectRow(val) {
      this.multipleSelection = val
    },
    searchData() {
      this.pageNumber = 1
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    // 查询
    getList() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        no: this.filters.no,
        itemTypes: this.itemTypesArr,
        status: this.filters.name,
        areas: this.arearArr,
        itsmUserid: localStorage.getItem('login-id'),
        checkStatus: '审核通过'
      }
      getAssetsList(param).then(response => {
        this.loading = false
        if (response.success === true) {
          this.tableData = response.data.list || []
          this.totalCount = Number(response.data.totalNum)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.msg)
      })
    },
    // 点击新增弹出新增页面moudel框
    handleAdd() {
      this.dialogName = '调拨单新增'
      this.addFormVisible = true
      this.addFlag = false
      this.$nextTick(() => {
        this.$refs.addEditRole.addEditRoleDialog()
      })
    },
    // 取消新增
    handleClose(done) {
      if (this.saveShowFlag) {
        this.saveShow = true
      } else {
        this.saveShow = false
        this.saveShowFlag = false
        done()
        this.getList()
      }
    },
    closeAddRole() {
      this.addFormVisible = false
      this.getList()
    },
    // 关闭新增页面  是 否
    addClose() {
      this.$refs.addEditRole.clearContent()
      this.CloseAddFormVisible = false
      this.addFormVisible = false
    },
    addNoClose() {
      this.CloseAddFormVisible = false
    },
    // 批量删除确认
    confirmAllBtn() {
      this.confirmAllVisible = false
      var roleIdList = []
      this.multipleSelection.map(item => {
        roleIdList.push(item.id)
      })
      const params = {
        ids: roleIdList,
        dataFrom: '删除',
        checkStatus: '未审核'
      }
      deleteAssets(params).then(res => {
        if (res.success === true) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {})
    },
    cancelAllBtn() {
      this.confirmAllVisible = false
    },
    // 编辑弹出编辑页面moudel框
    handleEdit(index, row) {
      var data = JSON.parse(JSON.stringify(row))
      this.dialogName = '资产详情'
      this.addFormVisible = true
      this.addFlag = true
      this.$nextTick(() => {
        this.$refs.addEditRole.addEditRoleDialog(data)
      })
    },
    // 批量删除
    handleDelAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.confirmAllVisible = true
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getList()
    },
    // 分页  点击哪一页跳到哪一页
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .fl {float: left;}
  .fr {float: right;}
  .qrcodeBox {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 0 10px;list-style: none;
      p {text-align: center;color: #38a4ed;font-size: 16px;margin-top: 5px;}
    }
  }
</style>

